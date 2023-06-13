<script>
import rules from "./rules"
import post from "./post"

const updateAPI = "http://127.0.0.1:8000/api/update_password"

export default {
  data: () => ({
    viewFlag: false,
    rules,
    updateData: {
        current_password: "",
        new_password: "",
        username: sessionStorage.getItem("username")
    },
    validFlag: false
  }),

  watch: {
    'updateData': {
      async handler(newVal, oldVal) {
        if (typeof this.$refs.form !== 'undefined') {
          const { valid } = await this.$refs.form.validate()
          if (valid) {
              this.validFlag = true
            } else {
              this.validFlag = false
          }
        }
      },
    deep: true,
    immediate: true
    },
  },
  methods: {
    clear () {
      this.$refs.form.reset()
      this.validFlag = false
    },
    async update () {

      await post(updateAPI, this.updateData, this.$router, this.$route.currentRoute, 'createAccount')

      this.$router.go(this.$route.currentRoute)
      this.passwordViewFlag = false
    },
    close () {
        const flag = false
        this.$emit('closed', flag)
    }
  },
}
</script>


<template>
  <v-row justify="center">
    <v-card max-width="5000">
      <v-card-title>パスワード更新</v-card-title>
        <v-form ref="form">
          <v-col cols="30">
            <v-text-field
              v-model="updateData.current_password"
              :counter="20"
              :rules="rules.password"
              label="古いパスワード"
              type="password"
              maxlength="20"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="updateData.new_password"
              :counter="20"
              :rules="rules.password"
              label="新しいパスワード"
              type="password"
              maxlength="20"
            ></v-text-field>
          </v-col>
            <v-card-actions>
              <v-spacer></v-spacer>
                <v-btn
                  color="green"
                  variant="text"
                  @click="close"
                >
                キャンセル
                </v-btn>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="update"
                  :disabled="!validFlag"
                >
                更新
                </v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
  </v-row>
</template>