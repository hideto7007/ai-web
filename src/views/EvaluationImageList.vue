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
const requestAPI = "http://127.0.0.1:8000/api/evals/learning_model_list/" + query

console.log(requestAPI)


// 変数定義
let items = ['best_model.pth', 'max_model.pth']
const imageURL = ref(null)
const imageFileData = ref(null)
const imageList  = ref([])
const selectedImageItem = ref(null)
const selectedModelItem = ref(null)
let modelList
let inputList 
let resData
let analysis
let handleFileInputChange
// let getImageListFromLocalStorage
let returnScreen
let localStorageList
let existCheck

let test = []

let sample_git


const random = () => {
  const min = 0
  const max = 999
  const randomNum = Math.floor(Math.random() * (max - min + 1)) + min

  return randomNum.toString()
}


for (let i = 0; i < 10; i++) {
  test.push(random())
}

const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    var r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16)
  })
}


if (sessionStorage.getItem('token') !== null) {
  resData = await request(requestAPI, sessionStorage, router)
  modelList = Object.values(resData[0])
  inputList = Object.values(resData[1])


  // // 画像の取得
  // getImageListFromLocalStorage = () => {
  //     const imageListString = localStorage.getItem('imageList')
  //     if (imageListString) {
  //         imageList.value = JSON.parse(imageListString)
  //     }
  // }

  returnScreen = () => {
    router.push('/projectlist/' + `?model_name=${queryPrames["object_detection_model_name"]}&id=${queryPrames["model_id"]}`)
  }

  analysis = () => {
    if (selectedModelItem.value !== null && selectedImageItem.value !== null) {
      console.log(selectedModelItem.value, selectedImageItem.value);
    }
  }

  handleFileInputChange = (event) => {
      const file = event
      console.log(file)
  }
  
  onMounted(() => {
    // ページ読み込み時にlocalStorageから画像データを復元

    const keys = Object.keys(localStorage)

    localStorageList = keys.map((key) => localStorage.getItem(key))

    existCheck = localStorageList.length

    console.log(existCheck)

    const storedImageURL = localStorage.getItem('imageURL')
    if (storedImageURL) {
      imageURL.value = storedImageURL;
    }
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
      v-model="selectedModelItem"
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
    <v-select
      v-model="selectedImageItem"
      label="Select"
      :items="inputList"
    ></v-select>

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
   <!-- <div v-if="existCheck !== 0">
    <img v-for="imageURL in localStorageList" :key="imageURL" :src="imageURL" alt="Uploaded Image" class="uploaded-image">
  </div> -->
</template>


<style lang="scss" scoped>
.select-small-width {
    max-width: 650px;
    padding: 50px 0px 0 50px;
  }

  .file-small-width {
    max-width: 1000px;
    padding: 10px 0px 0 50px;
  }

.uploaded-image {
  width: 250px;
  height: 200px;
}


</style>