<script setup>
import axios from 'axios';
import Swal from 'sweetalert2';
// import router from '../router';
// import App from '../App.vue'
import rules from './rules'

import NewAccount from "./NewAccount.vue"
import { ref, watch, reactive, computed } from "vue"

// 変数定義

const account = ref("")
const password = ref("")
const loading = ref(false)
const valid = ref(false)
const login_data = {}

// 監視処理
// watch([username, password], ([afterUsername, afterPassword], [beforeUsername, beforePassword]) => {
//         console.log("afterUsername次:", afterUsername, "beforeUsername前:", beforeUsername)
//         console.log("afterPassword次:", afterPassword, "beforePassword前:", beforePassword)
//     }
// )


// 関数定義
const login = async () => {
    console.log("クリック")
  //   if (await this.$refs.form.validate()) {
  //     loading = true
  //     axios.post('http://127.0.0.1:8000/api/login', login_data).then(res => {
  //     this.$session.start();
  //     this.$session.set('token', res.data.token);
  //     this.$session.set('data', res.data.detail);
  //     // router.push('/japanannualincome/' + `?user_id=${res.data.detail.params_id}`)
  //     this.$router.go({path: this.$router.currentRoute.path, force: true})
  //   }).catch(e => {
  //     loading = false;
  //     Swal.fire({
  //     type: 'warning',
  //     title: 'Error',
  //     text: 'ユーザー名もしくはパスワード、または両方が間違っています',
  //     showConfirmButton:false,
  //     showCloseButton:false,
  //     timer:3000
  //     })
  //   })
  // }
}
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
                v-model="account"
                :counter="70"
                label="ユーザー名"
                :rules="rules.account"
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