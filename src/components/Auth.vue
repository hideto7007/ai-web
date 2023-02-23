<script setup>
import axios from 'axios';
import Swal from 'sweetalert2';
// import router from '../router';
// import App from '../App.vue'
// import numberRuleRequired from '../numberRuleRequired'
// const sexItem = ['男性', '女性']
// const rule = [v => !!v || '必須項目です。']
// const infoItem = ['会社員', '学生', 'フリーター', 'フリーランス']

import NewAccount from "./NewAccount.vue"
import { ref, watch, reactive, computed } from "vue"

// 変数定義

const username = ref("")
const password = ref("")
const loading = ref(false)
const valid = ref(false)
const newAccountFlag = ref(false)
const rules = reactive(
  {
    username: [
      v => !!v || "ユーザー名は必須です",
      v => (v && v.length > 4) || "ユーザー名は5文字以上でなければなりません",
      v => /^[a-z0-9_]+$/.test(v) || "許可されていない文字が入力されています"
    ],
    password: [
      v => !!v || "パスワードは必須です",
      v => (v && v.length > 4) || "ユーザー名は5文字以上でなければなりません"
    ],
  }
)

// 監視処理
// watch([username, password], ([afterUsername, afterPassword], [beforeUsername, beforePassword]) => {
//         console.log("afterUsername次:", afterUsername, "beforeUsername前:", beforeUsername)
//         console.log("afterPassword次:", afterPassword, "beforePassword前:", beforePassword)
//     }
// )


// 関数定義
const login = async () => {
    console.log("クリック")
    // axios.post('http://127.0.0.1:8000/api/login')
  }

const newMakeAccount = () => {
  console.log("新規アカウント作成")
  newAccountFlag.value = true
  console.log(newAccountFlag.value)
}


  // axios.post('http://127.0.0.1:8000/api/login', [username, password]).then(
  //     res => {
  //       this.$session.start();
  //       this.$session.set('token', res.data.token);
  //       this.$session.set('data', res.data.detail);
  //       router.push('/japanannualincome/' + `?user_id=${res.data.detail.params_id}`)
  //       this.$router.go({path: this.$router.currentRoute.path, force: true})
  //     }
  //   )

// export default {
//     // name: 'Auth',
//     // components: {
//     //     App
//     // },
//     data: () => ({
//         login_data: {
//         },
//         defalutData: {
//             'first_name': '',
//             'last_name': '',
//             'sex': '',
//             'age': '',
//             'info': ''
//         },
//         activeFlag: false,
//         credentials: {},
//         id: 'b1639e6e-afe1-4b4f-aaf2-09966c663b0e',
//         valid:true,
//         loading:false,
//         dialog: false,
//         rules: {
//         username: [
//             v => !!v || "ユーザー名は必須です",
//             v => (v && v.length > 4) || "ユーザー名は5文字以上でなければなりません",
//             v => /^[a-z0-9_]+$/.test(v) || "許可されていない文字が入力されています"
//         ],
//         password: [
//             v => !!v || "パスワードは必須です",
//             v => (v && v.length > 4) || "ユーザー名は5文字以上でなければなりません"
//         ],
//         },
//     }),
//         watch: {
//       'login_data': {
//         handler(newVal, oldVal) {
//             console.log(newVal, oldVal)
//           if (typeof this.$refs.form !== 'undefined') {
//             if (this.$refs.form.validate()){
//                 this.activeFlag = true
//               } else {
//                 this.activeFlag = false
//             }
//           }
//         },
//         deep: true
//       }
//     },
//     methods: {
//         login() {
//             if (this.$refs.form.validate()) {
//                 console.log("kkk")
//                 this.loading = true;
//                 // axios.post('http://127.0.0.1:8000/api/login', this.login_data).then(res => {
//                 // this.$session.start();
//                 // this.$session.set('token', res.data.token);
//                 // this.$session.set('data', res.data.detail);
//                 // router.push('/japanannualincome/' + `?user_id=${res.data.detail.params_id}`)
//                 // this.$router.go({path: this.$router.currentRoute.path, force: true})
//             // eslint-disable-next-line
//             // }).catch(e => {
//             //     this.loading = false;
//             //     Swal.fire({
//             //     type: 'warning',
//             //     title: 'Error',
//             //     text: 'ユーザー名もしくはパスワード、または両方が間違っています',
//             //     showConfirmButton:false,
//             //     showCloseButton:false,
//             //     timer:3000
//             //     })
//             // })
//             }
//         },
//         createNew () {
//             this.dialog = false
//         },
//         close () {
//             this.login_data = Object.assign({}, this.defalutData)
//             this.$refs.form.resetValidation()
//             this.dialog = false
//         }
//     }
// }
</script>

<template>
  <v-row
    align="center"
    justify="center"
  >
    <v-hover
      v-slot="{ isHovering, props }"
      disabled
    >
      <v-card
        :elevation="isHovering ? 8 : 4"
        class="mx-auto"
        height="370"
        max-width="350"
        v-bind="props"
      >
      <!-- class="headline" -->
        <v-card-title class="my-4 text-center text-h6">
            Login to obuject detection App
        </v-card-title>
          <v-layout
            row
            fill-height
            justify-center
            align-center
            v-if="loading"
          >
          <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
          />
          </v-layout>
            <v-form v-else v-model="valid" lazy-validation>
            <v-container>
              <v-text-field
                v-model="username"
                :counter="70"
                label="ユーザー名"
                :rules="rules.username"
                maxlength="70"
                required
              />
              <v-text-field
                type="password"
                v-model="password"
                :counter="20"
                label="パスワード"
                :rules="rules.password"
                maxlength="20"
                required
              />
              <v-container>
                <NewAccount />
              </v-container>
            <v-btn class="pink white--text" :disabled="!valid" @click="login">Login</v-btn>
          </v-container>
        </v-form>
      </v-card>
    </v-hover>
  </v-row>
</template>


<style lang="scss" scoped>

.login-card {
    top: 0;
}

.v-row {
  margin: 0;
}
</style>