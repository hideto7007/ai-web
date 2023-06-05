<script setup>

import { ref, watch, reactive, computed } from "vue";
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import axios from 'axios';
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
const hasSaved = ref(false)
const isEditing = ref(false)
const model = ref(false)
const project_name = ref("")

const queryPrames = router.currentRoute.value.query

// クラスインスタンス化
let query = new Query("username", "token", "user_id", "model_name", "id").queryList(username, token, id, queryPrames["model_name"], queryPrames["id"])

// API定義
const requestAPI = "http://127.0.0.1:8000/api/project/project_list/" + query


let resData
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

if (sessionStorage.getItem('token') !== null) {
    resData = await request(requestAPI, sessionStorage)

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

    save = () => {
        console.log("crate botton")
    }

    close = () => {
        createDialog.value = false
    }

    create = () => {
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
                "object_detection_model_name_id": ""
            }
        ]
    }

    const allGetId = resData.map(x => {
        for (const [key, value] of Object.entries(x)) {
            if (key === 'object_detection_model_name_id') {
                return value
            }
        }
    })

    if (allGetId.every(v => v === allGetId[0])) {
        request["data"][0]["object_detection_model_name_id"] = allGetId[0]
    }
    console.log(request)
    isEditing.value = !isEditing.value
    hasSaved.value = true
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
                            <v-spacer></v-spacer>
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
    <v-btn
      color="success"
      @click="returnScreen">
        前の画面に戻る
    </v-btn>
    <v-row justify="center">
    <div class="text-center">
      <v-dialog
        v-model="createDialog"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            color="primary"
            v-bind="props"
          >
          新規追加及び更新
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
    
        <v-divider></v-divider>
    
        <v-card-actions>
            <v-spacer></v-spacer>
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
    
          <v-snackbar
            v-model="hasSaved"
            :timeout="2000"
            attach
            position="absolute"
            location="bottom left"
          >
            新規追加
          </v-snackbar>
        </v-card>
      </v-dialog>
    </div>
  </v-row>
</template>


<style lang="scss" scoped>

.v-table__wrapper {
    overflow: hidden;
}
</style>