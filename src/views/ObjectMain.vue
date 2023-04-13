<script setup>

import { ref, watch, reactive, computed } from "vue"
import { useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2';
import axios from 'axios';

// // vueライブラリー定義
const router = useRouter()


// // 変数定義
let imageList = []
let numList = []

const name = ref("")
const dialogm1 = ref('')
const dialog = ref(false)
// const valid = ref(false)


// // 関数定義
// const login = async () => {

//   let login_data = {
//     "username": username.value,
//     "password": password.value
//   }
//   loading.value = true
//   await axios.post('http://127.0.0.1:8000/api/login', login_data).then(res => {
//     // router.addRoute({ path: '/about/' + '?user_id=${res.data.detail.params_id}', component: About})
//     router.push('/objectmain/' + `?user_id=${res.data.detail.params_id}`)
//     // router.go({path: router.currentRoute.path, force: true})
//   }).catch(e => {
//     loading.value = false
//     Swal.fire({
//     type: 'warning',
//     title: 'Error',
//     text: 'ユーザー名もしくはパスワード、または両方が間違っています',
//     showConfirmButton:false,
//     showCloseButton:false,
//     timer:3000
//     })
//   })
//   loading.value = false

// }

const load = async () => {
  let modelList = ref([])
  if (typeof localStorage.token !== "undefined") {
    console.log(localStorage.token)
    // 後々APIから受け取れるようにする
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
              type: 'warning' + err,
              title: 'Error',
              text: 'サーバーエラー',
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

const save = () => {
  let request = {
    "id": "",
    "name": ""
  }
  dialog.value = false
  for (const val of reqestList) {
    if (val["object_detection_model_name"] === dialogm1.value) {
      console.log(val["id"])
      request["id"] = val["id"]

    }
  }
  request["name"] = name.value

  console.log(request)
}
const create = () => {
  let idNum = Math.max(...numList) + 1
  console.log(idNum)
}

// 監視処理
// watch(reqestList, (afterValue, beforeValue) => {
//         console.log("after:", afterValue, "before:", beforeValue)
//     }
// )


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
              label="更新するモデル名"
              required
            />
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
          >
            Save
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="create"
          >
            create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>