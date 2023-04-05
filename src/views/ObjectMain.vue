<script setup>

import { ref, watch, reactive, computed } from "vue"
import { useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2';
import axios from 'axios';

// // vueライブラリー定義
const router = useRouter()


// // 変数定義
let imageList = []

// const password = ref("")
// const loading = ref(false)
// const valid = ref(false)

// // 監視処理
// // watch([username, password], ([afterUsername, afterPassword], [beforeUsername, beforePassword]) => {
// //         console.log("afterUsername次:", afterUsername, "beforeUsername前:", beforeUsername)
// //         console.log("afterPassword次:", afterPassword, "beforePassword前:", beforePassword)
// //     }
// // )


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

// 初期ロード

// new Promise((resolve, reject) => {
//   reject();
// })
//   .then(() => {
//     if (typeof localStorage.token !== "undefined") {
//       console.log(localStorage.token)
//     }
//   })
//   .catch(() => {
//     Swal.fire({
//     type: 'warning',
//     title: 'Error',
//     text: 'セッションが切れてます。再ログインして下さい。',
//     showConfirmButton:false,
//     showCloseButton:false,
//     timer:3000
//     })
//     router.push('/auth')
//   });

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
}


const modelClick = (val) => {
  if (imageList[val] === "EfficientDet") {
    console.log(imageList[val])
  } else if (imageList[val] === "YoloV7") {
    console.log(imageList[val])
  } else if (imageList[val] === "YoloV5") {
    console.log(imageList[val])
  }
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
</template>