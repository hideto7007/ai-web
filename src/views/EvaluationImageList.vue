<script setup>

import { ref, watch, reactive, computed, onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import axios from 'axios';
import post from '../components/post';
import request from "../components/request";
import Query from "../components/queryList";
import rules from "../components/rules";


// vueライブラリー定義
const router = useRouter()
const currentRoute = router.currentRoute.value.fullPath

const queryPrames = router.currentRoute.value.query

// 変数定義
const id = sessionStorage.getItem('id')
const username = sessionStorage.getItem('username')
const token = sessionStorage.getItem('token')

// クラスインスタンス化
let query = new Query("username", "token", "user_id", "object_detection_model_name", "project_name").queryList(username, token, id, queryPrames["object_detection_model_name"], queryPrames["project_name"])

// API定義
const requestAPI = "http://127.0.0.1:8000/api/eval/learning_model_list/" + query


// 変数定義
let items = ['best_model.pth', 'max_model.pth']
const imageURL = ref(null)
const imageFileData = ref(null)
const imageList  = ref([])
let modelList
let resData
let analysis
let handleFileInputChange
let getImageListFromLocalStorage
let returnScreen

if (sessionStorage.getItem('token') !== null) {
  resData = await request(requestAPI, sessionStorage, router)
  modelList = Object.values(resData[0])


    // 画像の取得
    getImageListFromLocalStorage = () => {
        const imageListString = localStorage.getItem('imageList')
        if (imageListString) {
            imageList.value = JSON.parse(imageListString)
        }
    }

    returnScreen = () => {
      router.push('/projectlist/' + `?model_name=${queryPrames["object_detection_model_name"]}&id=${queryPrames["model_id"]}`)
    }

    analysis = () => {
        console.log(imageFileData.value)
        const imageListString = JSON.stringify(imageFileData.value)
        console.log(imageListString)
        localStorage.setItem('imageList', imageListString)
        console.log(localStorage.getItem('imageList'))
    }

    handleFileInputChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            imageFileData.value = file
        }
    }
    
    onMounted(() => {
        // ページ読み込み時にlocalStorageから画像データを復元
        getImageListFromLocalStorage()
    })
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
  <v-row class="select-small-width">
    <v-select
      label="Select"
      :items="modelList"
    ></v-select>
    <v-btn
      class="ma-2"
      color="success"
      @click="returnScreen"
    >
    前の画面に戻る
  </v-btn>
  </v-row>
  <v-row class="file-small-width">
    <v-file-input
      :rules="rules.imageFile"
      accept="image/png, image/jpeg, image/bmp"
      placeholder="Pick an avatar"
      prepend-icon="mdi-camera"
      label="Avatar"
      @change="handleFileInputChange"
   ></v-file-input>

   <v-btn
      class="ma-2"
      color="primary"
      @click="analysis"
    >
    評価スタート
    <v-icon
      end
      icon="mdi-checkbox-marked-circle"
    ></v-icon>
  </v-btn>

  </v-row>

  <img :src="imageURL" v-if="imageURL" alt="Uploaded Image" class="uploaded-image">

</template>


<style lang="scss" scoped>
.select-small-width {
    max-width: 650px;
    padding: 50px 0px 0 90px;
  }

  .file-small-width {
    max-width: 665px;
    padding: 10px 0px 0 50px;
  }

.uploaded-image {
  width: 250px;
  height: 200px;
}


</style>