
<script setup>

import { useRouter } from 'vue-router'
import { ref, watch, reactive, computed } from "vue"
import infoAccount from '../infoAccount.vue';
import updatePassword from '../updatePassword.vue';

// vueライブラリー定義
const router = useRouter()
// const currentRoute = router.currentRoute.value.fullPath


const logoutDialog = ref(false)
const accountViewFlag = ref(false)
const passwordViewFlag = ref(false)

const items = [
        { title: 'ログアウト', key: 'logout' },
        { title: 'アカウント', key: 'account' },
        { title: 'パスワード変更', key: 'password' },
      ]

const logout = () => {
  console.log("ログアウト")
  logoutDialog.value = false
  sessionStorage.clear()
  router.push('/auth')
}

const iconClick = (val) => {
  if (val === 'logout') {
    logoutDialog.value = true
  } else if (val === 'account') {
    accountViewFlag.value = true
  } else if (val === 'password') {
    passwordViewFlag.value = true
  }
  console.log(val)
}

// emitハンドラー
const handlePassword = (flag) => {
  passwordViewFlag.value = flag
  console.log('handle', passwordViewFlag.value)
}

const handleAccount = (flag) => {
  accountViewFlag.value = flag
  console.log('handle', accountViewFlag.value)
}

</script>

<template>
  <v-app-bar color="primary">
    <v-row justify="end">
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
        >
          <v-icon>
          mdi-home
          </v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :value="index"
          @click="iconClick(item.key)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-row>
  <!-- ログアウト処理 -->
  <template v-slot:append>
      <v-row justify="center">
    <v-dialog
      v-model="logoutDialog"
      persistent
      width="auto"
    >
      <v-card>
        <v-card-text>ログアウトしてもよろしいでしょうか？</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green-darken-1"
            variant="text"
            @click="logoutDialog = false"
          >
            いいえ
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="logout"
          >
            はい
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<!-- ログアウト処理ここまで -->

<!-- アカウント処理 -->
<template>
  <v-row justify="center">
    <v-dialog
      v-model="accountViewFlag"
      max-width="250"
      >
        <infoAccount
          title='アカウント情報'
          @closed="handleAccount"/>
    </v-dialog>
  </v-row>
</template>
<!-- アカウント処理ここまで -->

<!-- パスワード処理 -->
<template>
  <v-row justify="center">
    <v-dialog
      v-model="passwordViewFlag"
      >
      <updatePassword
      @closed="handlePassword"/>
    </v-dialog>
  </v-row>
</template>
<!-- パスワード処理ここまで -->

  </v-app-bar>
</template>