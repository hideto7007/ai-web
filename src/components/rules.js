const rules = 
    {
        username: [
            v => !!v || "ユーザー名は必須です",
            v => (v && v.length > 4) || "ユーザー名は5文字以上でなければなりません",
            v => /^[a-z0-9_]+$/.test(v) || "許可されていない文字が入力されています"
        ],
        password: [
            v => !!v || "パスワードは必須です",
            v => /^(?=.*[A-Z])(?=.*[.?/-])[a-zA-Z0-9.?/-]{4,24}$/.test(v) || "大文字や記号が少なくとも一文字含まれること"
        ],
        required :[
            v => !!v || '必須項目です。'
        ],
        email :[
            v => !!v || "メールは必須です",
            v => /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/.test(v) || "許可されていない文字が入力されています"
        ],
        imageFile: [
            value => !value || !value.length || value[0].size < 2000000 || 'Avatar size should be less than 2 MB!'
        ]
    }

export default rules
