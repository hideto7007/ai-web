<script setup>

// import { ref, watch, reactive, computed } from "vue"
// import { useRoute, useRouter } from 'vue-router'
// // import { useRouter } from 'vue-router'

// // vueライブラリー定義
// const router = useRouter()
// const route = useRoute()


// // 変数定義

// const username = ref("")
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

// 後々APIから受け取れるようにする
const imageList = ["EfficientDet", "YoloV7", "other_model"]
</script>


<template>
    <v-item-group selected-class="bg-primary">
      <v-container>
        <v-row>
          <v-col
            v-for="n in imageList.length"
            :key="n"
            cols="12"
            md="4"
          >
            <v-item v-slot="{ isSelected, selectedClass, toggle }">
              <v-card
                :class="['d-flex align-center', selectedClass]"
                dark
                height="200"
                @click="toggle"
              >
                <div
                  class="text-h3 flex-grow-1 text-center"
                >
                  {{ isSelected ? 'Selected' : 'Click Me!' }}
                </div>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
  </template>