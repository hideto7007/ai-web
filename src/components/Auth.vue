<script setup>
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import router from '../router';
// import App from '../App.vue'
// import numberRuleRequired from '../numberRuleRequired'
// const sexItem = ['男性', '女性']
// const rule = [v => !!v || '必須項目です。']
// const infoItem = ['会社員', '学生', 'フリーター', 'フリーランス']

import { ref, watch, reactive } from "vue"

// 変数定義
const login_data = reactive({
    login_data: "",
    password: ""
})
const loading = ref(false)
const rules = reactive({
        username: [
            v => !!v || "ユーザー名は必須です",
            v => (v && v.length > 4) || "ユーザー名は5文字以上でなければなりません",
            v => /^[a-z0-9_]+$/.test(v) || "許可されていない文字が入力されています"
        ],
        password: [
            v => !!v || "パスワードは必須です",
            v => (v && v.length > 4) || "ユーザー名は5文字以上でなければなりません"
        ],
        })


// 監視処理
watch(
    login_data, 
    () => {
        console.log(login_data.login_data.value)
        console.log(login_data.password.value)

    }
)



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
    <v-app>
        <v-container grid-list-md>
            <v-layout row wrap align-center justify-center fill-height>
                <v-flex xs12 sm8 lg4 md5>
                    <v-card class="login-card">
                        <v-card-title>
                        <span class="headline">Login to obuject detection App</span>
                        </v-card-title>

                        <v-spacer/>

                        <v-card-text>

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


                        <v-form v-else ref="form" v-model="valid" lazy-validation>
                            <v-container>

                            <v-text-field
                                v-model="login_data.username"
                                :counter="70"
                                label="ユーザー名"
                                :rules="rules.username"
                                maxlength="70"
                                required
                            />

                            <v-text-field
                                type="password"
                                v-model="login_data.password"
                                :counter="20"
                                label="パスワード"
                                :rules="rules.password"
                                maxlength="20"
                                required
                            />

                            </v-container>
                            <v-btn class="pink white--text" :disabled="!valid" @click="login">Login</v-btn>
                            <!-- <v-row justify="end">
                                <v-dialog
                                    v-model="dialog"
                                    persistent
                                    max-width="600px"
                                >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                    color="primary"
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                    >
                                    アカウント作成
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                    <span class="text-h5">ユーザー情報</span>
                                    </v-card-title>
                                    <v-card-text>
                                    <v-container>
                                        <v-row>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                            md="4"
                                        >
                                            <v-text-field
                                            v-model="login_data.first_name"
                                            label="姓"
                                            :rules="rule"
                                            required
                                            clearable
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                            md="4"
                                        >
                                            <v-text-field
                                            v-model="login_data.last_name"
                                            label="名"
                                            :rules="rule"
                                            required
                                            clearable
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field
                                                v-model="login_data.username"
                                                :counter="70"
                                                label="ユーザー名"
                                                :rules="rules.username"
                                                maxlength="70"
                                                required
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field
                                                type="password"
                                                v-model="login_data.password"
                                                :counter="20"
                                                label="パスワード"
                                                :rules="rules.password"
                                                maxlength="20"
                                                required
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                        >
                                            <v-select
                                                v-model="login_data.sex"
                                                type="number"
                                                :items="sexItem"
                                                :rules="rule"
                                                label="性別"
                                                clearable
                                                required
                                            ></v-select>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                        >
                                            <v-text-field
                                                v-model="login_data.age"
                                                type="number"
                                                label="年齢"
                                                clearable
                                                :rules="numberRuleRequired"
                                                min="1"
                                                max="120"
                                                required
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                        >
                                            <v-select
                                                v-model="login_data.info"
                                                type="number"
                                                :items="infoItem"
                                                label="現在の情報"
                                                :rules="rule"
                                                clearable
                                                required
                                            ></v-select>
                                        </v-col>
                                        </v-row>
                                    </v-container>
                                    <small>*全必須項目</small>
                                    </v-card-text>
                                    <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="blue darken-1"
                                        text
                                        @click="close"
                                    >
                                        Close
                                    </v-btn>
                                    <v-btn
                                        color="blue darken-1"
                                        text
                                        @click="createNew"
                                        :disabled="!activeFlag"
                                    >
                                        Save
                                    </v-btn>
                                    </v-card-actions>
                                </v-card>
                                </v-dialog>
                            </v-row> -->
                        </v-form>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

<style lang="scss" scoped>

.login-card {
    top: 100px;
}

</style>