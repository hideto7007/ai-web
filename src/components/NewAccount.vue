<script setup>
import { reactive, ref, watch } from "vue"
// import rules from "./rules"
import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'

const dialog = ref(false)
const valid = ref(false)


const initialState = {
  account: '',
  password: '',
  firstName: '',
  lastName: '',
  email: '',
  age: '',
}

const state = reactive({
  ...initialState,
})

const rules = {
  account: { required },
  password: { required },
  firstName: { required },
  lastName: { required },
  email: { required, email },
  age: { required },
  }

const v$ = useVuelidate(rules, state)

const clear = () => {
  v$.value.$reset()
  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value
  }
  return { state, clear, v$ }
}

// 関数定義
const save = () => {
  console.log("save")
  dialog.value = false
  v$.value.$reset()
  console.log(state.firstName, state.lastName, state.email, state.age, state.account, state.password)
}

const close = () => {
  dialog.value = false
}

// 監視処理
watch(v$, (a1, a2) => {
  if (!a1.$invalid) {
    valid.value = true
  } else {
    valid.value = false
  }
})



</script>


<template>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        persistent
        width="1024"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            color="primary"
            v-bind="props"
          >
          ※新規アカウント作成はこちら
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">新規アカウント作成</span>
          </v-card-title>
          <v-form>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    v-model="state.firstName"
                    :error-messages="v$.firstName.$errors.map(e => e.$message)"
                    label="first name*"
                    required
                    @input="v$.firstName.$touch"
                    @blur="v$.firstName.$touch"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    v-model="state.lastName"
                    :error-messages="v$.lastName.$errors.map(e => e.$message)"
                    label="last name*"
                    required
                    @input="v$.lastName.$touch"
                    @blur="v$.lastName.$touch"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    v-model="state.account"
                    :error-messages="v$.account.$errors.map(e => e.$message)"
                    label="account*"
                    required
                    @input="v$.account.$touch"
                    @blur="v$.account.$touch"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="state.email"
                    :error-messages="v$.email.$errors.map(e => e.$message)"
                    label="Email*"
                    required
                    @input="v$.email.$touch"
                    @blur="v$.email.$touch"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="state.password"
                    :error-messages="v$.password.$errors.map(e => e.$message)"
                    label="Password*"
                    type="password"
                    @input="v$.password.$touch"
                    @blur="v$.password.$touch"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-select
                    v-model="state.age"
                    :error-messages="v$.age.$errors.map(e => e.$message)"
                    :items="['0-17', '18-29', '30-54', '54+']"
                    label="Age*"
                    required
                    @input="v$.age.$touch"
                    @blur="v$.age.$touch"
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="close"
            >
              Close
            </v-btn>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="save"
              :disabled="!valid"
            >
              Save
            </v-btn>
            <v-btn @click="clear">
              clear
            </v-btn>
          </v-card-actions>
        </v-form>
        </v-card>
      </v-dialog>
    </v-row>
  </template>