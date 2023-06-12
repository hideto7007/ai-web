<script setup>

import { ref, watch, reactive, computed, watchEffect } from "vue";
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import post from '../components/post';
import request from "../components/request";
import Query from "../components/queryList";

// vueライブラリー定義
const router = useRouter()
const currentRoute = router.currentRoute.value.fullPath

// 変数定義
const id = sessionStorage.getItem('id')
const username = sessionStorage.getItem('username')
const token = sessionStorage.getItem('token')
const dialog = ref(false)
const createDialog = ref(false)
const deleteSaveDialog = ref(false)
const isEditing = ref(false)
const project_name = ref("")
const resDataCheckedAdd = reactive([])
const deleteSaveFlag = ref(false)

const queryPrames = router.currentRoute.value.query

// クラスインスタンス化
let query = new Query("username", "token", "user_id", "model_name", "id").queryList(username, token, id, queryPrames["model_name"], queryPrames["id"])

// API定義
const requestAPI = "http://127.0.0.1:8000/api/project/project_list/" + query
const updateCreateAPI = "http://127.0.0.1:8000/api/project/project_create_or_update/"
const deleteAPI = "http://127.0.0.1:8000/api/project/project_delete/"


let resData
let requestData = []
let evaluationindexPush
let getDetails
let detailsFrom = {
    'プロジェクトid': '',
    'プロジェクト名': '',
    '物体検知モデルid': '',
    '物体検知モデル': ''
}
let returnScreen
let create
let save
let close
let deleted
let beforeData


// グローバル関数定義

// 最終に更新されたオブジェクトデータのみ返す
const removeDuplicates = (array, property) => {
    const uniqueArray = []
  
    array.forEach((item) => {
        const value = item[property]
        const index = uniqueArray.findIndex((uniqueItem) => uniqueItem[property] === value)
        
        if (index !== -1) {
            uniqueArray.splice(index, 1);
        }
        uniqueArray.push(item)
    })

    return uniqueArray
  }

// 変更前のプロジェクト名の値を返す
const before_project_name = (requestData) => {
  const data = requestData.filter(val => val.project_name)

  return data
}

if (sessionStorage.getItem('token') !== null) {
    resData = await request(requestAPI, sessionStorage, router)

    if (typeof resData !== 'undefined') {
      for (let i = 0; i < resData.length; i++) {
        let data = resData[i]
        data["checked"] = false
        resDataCheckedAdd.push(data)
      }
    }


    // 変更前のデータを格納
    beforeData = JSON.parse(JSON.stringify(resDataCheckedAdd))

    // 監視処理
    watch(resDataCheckedAdd, (newValue) => {
      const maxLength = Math.max(newValue.length)
      let checkedList = newValue.map((val) => val.checked)
      let checkedListFlag = checkedList.filter(val => val === false)
      for (let i = 0; i < maxLength; i++) {
        if (newValue[i].checked === true) {
          requestData.push(newValue[i])
          deleteSaveFlag.value = true
        } else if (checkedListFlag.length === maxLength) {
          deleteSaveFlag.value = false
        }
      }
    })


    // 評価指標画面に遷移
    evaluationindexPush = (val) => {
        console.log(val)
    }

    getDetails = (val) => {
        for (const [key, value] of Object.entries(val)) {
            if (key === 'id') {
                detailsFrom['プロジェクトid'] = value
            } else if (key === 'project_name') {
                detailsFrom['プロジェクト名'] = value
            } else if (key === 'object_detection_model_name') {
                detailsFrom['物体検知モデル'] = value
            } else if (key === 'object_detection_model_name_id') {
                detailsFrom['物体検知モデルid'] = value
            }
        }
    }

    returnScreen = () => {
        router.push('/objectmain/' + `?user_id=${id}`)
    }

    save = async () => {
      const req = removeDuplicates(requestData, "id")

      const newRequest = req.map(val => {
        return {
          id: val.id, 
          project_name: val.project_name, 
          object_detection_model_name: val.object_detection_model_name_id
        }
      })

      let request = {
        "params": [
        {
          "username": username,
          "token": token,
          "user_id": id
        }
      ],
        "data": newRequest
    }

    console.log(request)

    await post(updateCreateAPI, request, router, currentRoute, 'update')
    deleteSaveDialog.value = false

    }

    deleted = async () => {
      const req = removeDuplicates(requestData, "id")

      const newRequest = req.map(val => {
        return {
          id: val.id, 
        }
      })
      let request = {
        "params": [
          {
            "username": username,
            "token": token,
            "user_id": id
          }
        ],
        "data": newRequest,
      }
      console.log(request)
      await post(deleteAPI, request, router, currentRoute, 'delete')
      deleteSaveDialog.value = false
    }

    close = () => {
        createDialog.value = false
        if (removeDuplicates(requestData, "id").length) {
          resDataCheckedAdd.splice(0, resDataCheckedAdd.length);
          for (const val of beforeData) {
            resDataCheckedAdd.push(val)
          }
        }
        deleteSaveDialog.value= false
    }

    create = async () => {
    let request = {
        "params": [
        {
          "username": username,
          "token": token,
          "user_id": id
        }
      ],
        "data": [
            {
                "id": "0",
                "project_name": project_name.value,
                "object_detection_model_name": queryPrames["id"]
            }
        ]
    }


    await post(updateCreateAPI, request, router, currentRoute, 'create')
    isEditing.value = !isEditing.value
    createDialog.value = false
    }

} else {
    await Swal.fire({
      icon: 'warning',
      title: 'Error',
      text: 'セッションが切れてます。再ログインして下さい。',
      showConfirmButton:false,
      showCloseButton:false,
      timer:3000
      })
      router.push('/auth')
  }



</script>


<template>
 <v-table
    fixed-header
    density="comfortable"
    height="300px"
 >
  <thead>
    <tr>
        <th class="text-left">
            Project
        </th>
        <th class="text-left">
            ModelName
        </th>
        <th class="text-left">
            detail
        </th>
    </tr>
  </thead>
   <tbody>
    <tr
      v-for="(item, index) in resData"
      :key="index"
    >
      <v-btn
        color="green"
        @click="evaluationindexPush(item)"
      >
      {{ item.project_name }}
      </v-btn>
        <td>{{ item.object_detection_model_name }}</td>
          <!-- 詳細ボタン処理 -->
            <v-row justify="center">
              <v-dialog
                v-model="dialog"
                width="450"
              >
                <template v-slot:activator="{ props }">
                  <v-btn
                    color="primary"
                    v-bind="props"
                    @click="getDetails(item)"
                  >
                    詳細
                  </v-btn>
                </template>
                  <v-card>
                    <v-card-title>
                        <span class="text-h5">登録情報</span>
                    </v-card-title>
                       <v-list
                        v-for="(v, k) in detailsFrom"
                        :key="k">
                        ■ {{ k }} : {{ v }}
                       </v-list>
                          <v-card-actions>
                            <v-spacer/>
                            <v-btn
                                color="green"
                                variant="text"
                                @click="dialog = false"
                            >
                            閉じる
                        </v-btn>
                     </v-card-actions>
                  </v-card>
               </v-dialog>
            </v-row>
         </tr>
      </tbody>
   </v-table>
   <v-row justify="end">
    <v-col cols="2">
      <v-btn
        color="success"
        @click="returnScreen">
          前の画面に戻る
      </v-btn>
    </v-col>
    <!-- 新規追加処理 -->
    <v-col cols="1">
      <div class="text-center">
        <v-dialog
          v-model="createDialog"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              color="primary"
              v-bind="props"
            >
            新規追加
            </v-btn>
          </template>
          <v-card
            class="mx-auto"
            color="purple-lighten-1"
            max-width="800"
          >
          <v-toolbar width="500" color="purple">
            <v-toolbar-title>
              <p>プロジェクト名新規追加</p>
            </v-toolbar-title>
              <v-btn
                icon
                @click="isEditing = !isEditing"
              >
                <v-fade-transition leave-absolute>
                  <v-icon v-if="isEditing">mdi-close</v-icon>
          
                  <v-icon v-else>mdi-pencil</v-icon>
                </v-fade-transition>
              </v-btn>
          </v-toolbar>
          <v-card-text>
              <v-text-field
              v-model="project_name"
              :disabled="!isEditing"
              color="white"
              label="プロジェクト名"
              ></v-text-field>
      
          </v-card-text>
          <v-divider/>
            <v-card-actions>
              <v-spacer/>
                <v-btn
                  @click="close"
                  >
                  閉じる
                </v-btn>
          
                <v-btn
                  :disabled="!isEditing"
                  @click="create"
                  >
                  登録
                </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-col>
  <!-- 削除及び編集処理 -->
  <v-col cols="1">
    <v-dialog
      v-model="deleteSaveDialog"
      width="auto"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          v-bind="props"
        >
          編集
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          <span class="text-h8">プロジェクト名の更新及び削除</span>
        </v-card-title>
        <v-card-text
          v-for="(item, index) in resDataCheckedAdd" 
          :key="index"
          :property="item.key"
          :label="item.col">
          <v-container>
            <v-row>
              <v-checkbox-btn
                v-model="item.checked"
                ></v-checkbox-btn>
              <v-text-field
                :disabled="!item.checked"
                v-model="item.project_name"
              ></v-text-field>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary" 
            @click="close"
          >閉じる
          </v-btn>
          <v-btn 
            color="success" 
            :disabled="!deleteSaveFlag" 
            @click="save"
          >保存
          </v-btn>
          <v-spacer/>
          <v-btn 
            color="blue-darken-1" 
            variant="text" 
            :disabled="!deleteSaveFlag" 
            @click="deleted"
          >削除
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
  </v-row>
</template>


<style lang="scss" scoped>

.v-table__wrapper {
    overflow: hidden;
}

.custom-row {
  max-height: 500px;
}
</style>