  watch: {
    'inputForm': {
      async handler(newVal, oldVal) {
        if (typeof this.$refs.form !== 'undefined') {
          const { valid } = await this.$refs.form.validate()
          const { firstName, lastName, account, password, email, age } = newVal
          if (valid) {
              this.validFlag = true
              if (valid && firstName !== "") {
                this.validFlag = true
              } else {
                this.validFlag = false
              }
            } else {
              this.validFlag = false
              if (!valid && (firstName !== "" && lastName !== "" && account !== "" && password !== "" && email !== "" && age !== "")) {
                this.validFlag = true
              }
          }
        }
      },
    deep: true,
    immediate: true
    }
  },