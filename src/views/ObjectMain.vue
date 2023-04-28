<script setup>

import { ref, watch, reactive, computed } from "vue"
import { useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2';
import axios from 'axios';
import post from '../components/post'

// vueライブラリー定義
const router = useRouter()
const currentRoute = router.currentRoute.value.fullPath

// 変数定義
let imageList = []
let numList = []

const name = ref("")
const createName = ref("")
const dialogm1 = ref('')
const dialog = ref(false)
const createDialog = ref(false)
const validFlag = ref(false)

// 監視処理
watch(dialogm1, (afterDialogm1, beforeDialogm1) => {
        if (afterDialogm1 !== '') {
          validFlag.value = true
        }
    }
)

const updateCreateAPI = "http://127.0.0.1:8000/api/object_detection_model/object_detection_model_update"
const deleteAPI = "http://127.0.0.1:8000/api/object_detection_model/object_detection_model_delete"

const load = async () => {
  let modelList = ref([])
  if (typeof localStorage.token !== "undefined") {
    console.log(localStorage.token)
    return await axios
          .get('http://127.0.0.1:8000/api/object_detection_model/object_detection_model_list/')
          .then((res) => {
            if (res.data.result_code === 0) {
              // 入力値取得
              modelList = res.data.detail.result
              } else {
                Swal.fire({
                type: 'warning',
                title: 'Error',
                text: ErrorMessage,
                showConfirmButton:false,
                showCloseButton:false,
                })
              }
              return modelList
            }).catch((err) => {
              Swal.fire({
              type: 'warning',
              title: 'Error',
              text: 'サーバーエラー: ' + err,
              showConfirmButton:false,
              showCloseButton:false,
              })
            }).finally(() => {})
  } else {
    await Swal.fire({
      type: 'warning',
      title: 'Error',
      text: 'セッションが切れてます。再ログインして下さい。',
      showConfirmButton:false,
      showCloseButton:false,
      timer:3000
      })
      router.push('/auth')
    }
  }

const reqestList = await load()

for (const i of reqestList) {
  imageList.push(i["object_detection_model_name"])
  numList.push(i["id"])
}


const modelClick = (val) => {
  console.log(numList[val])
}

const save = async () => {
  dialog.value = false
  let request = {
    "data": [
      {
        "id": "",
        "name": ""
      }
    ]
  }
  for (const val of reqestList) {
    if (val["object_detection_model_name"] === dialogm1.value) {
      request["data"][0]["id"] = val["id"]
    }
  }
  request["data"][0]["name"] = name.value

  await post(updateCreateAPI, request, router, currentRoute, 'update')
}

const create = async () => {
  // ここで一番大きい値のidを受け取っても既にDBの方で登録した履歴があれば
  // DBの方でid値を更新してくれる
  // 一旦、このままで実装進める
  dialog.value = false

  if (!numList.length) {
    numList.push(1) 
  }
  
  let request = {
    "data": [
      {
        "id": String(Math.max(...numList) + 1),
        "name": createName.value
      }
    ]
  }
  await post(updateCreateAPI, request, router, currentRoute, 'create')

  createDialog.value = false
}

const deleted = async () => {
  dialog.value = false
  let request = {
    "id": '',
  }
  for (const val of reqestList) {
    if (val["object_detection_model_name"] === dialogm1.value) {
      request["id"] = val["id"]
    }
  }
  await post(deleteAPI, request, router, currentRoute, 'delete')
}


</script>


<template>
  <Suspense>
    <v-item-group selected-class="bg-primary">
      <v-container>
        <v-row>
          <v-col
            v-for="(value, keys) in imageList"
            :key="keys"
            cols="12"
            md="4"
          >
            <v-item v-slot="{ selectedClass }">
              <v-card
                :class="['d-flex align-center', selectedClass]"
                dark
                height="200"
                @click="modelClick(keys)"
              >
                <div
                  class="text-h3 flex-grow-1 text-center"
                >
                  {{ value }}
                </div>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
  </Suspense>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      scrollable
      width="auto"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          v-bind="props"
        >
          新規追加及び更新、削除
        </v-btn>
      </template>
      <v-card>
        <v-card-title>物体検知モデル名一覧</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          更新したいモデル名を選択
          <v-radio-group
            v-model="dialogm1"
            column
          >
            <v-radio
              v-for="(value, keys) in imageList"
              :key="keys"
              :label="value"
              :value="value"
            ></v-radio>
            <v-col></v-col>
            以下のフォームに更新したいモデル名入力
            <v-text-field
              v-model="name"
              label="*更新するモデル名"
              required
            />
            <small>*必須項目です</small>
          </v-radio-group>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="save"
            :disabled="!validFlag"
          >
            Save
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="deleted"
            :disabled="!validFlag"
          >
            Delete
          </v-btn>
          <v-row justify="center">
            <v-dialog
              v-model="createDialog"
              persistent
              width="400"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  color="primary"
                  v-bind="props"
                >
                create
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">物体検知モデル名新規追加</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        sm="30"
                        md="50"
                      >
                        <v-text-field
                          v-model="createName"
                          label="*新規モデル名"
                          required
                        />
                        <small>*必須項目です</small>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="createDialog = false"
                  >
                    Close
                  </v-btn>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="create"
                  >
                    save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>