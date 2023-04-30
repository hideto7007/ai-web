
<script setup>

import { useRouter } from 'vue-router'
import { ref, watch, reactive, computed } from "vue"

// vueライブラリー定義
const router = useRouter()
const currentRoute = router.currentRoute.value.fullPath

const dialog = ref(false)

const logout = () => {
  console.log("ログアウト")
  dialog.value = false
  localStorage.clear()
  router.go(currentRoute)
}

const home = () => {
  console.log("ホーム")
}

</script>

<template>
  <v-app-bar color="primary">
    <!-- <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template> -->

    <v-app-bar-title>
      obuject detection App
    </v-app-bar-title>

    <template v-slot:append>
      <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      width="auto"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
        >
          ログアウト
        </v-btn>
      </template>
      <v-card>
        <v-card-text>ログアウトしてもよろしいでしょうか？</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green-darken-1"
            variant="text"
            @click="dialog = false"
          >
            いいえ
          </v-btn>
          <v-btn
            color="green-darken-1"
            variant="text"
            @click="logout"
          >
            はい
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

      <v-btn @click="home">
        <v-icon>
          mdi-home
        </v-icon>
      </v-btn>
    </template>
  </v-app-bar>
</template>