import axios from 'axios';
import Swal from 'sweetalert2';

const post = async (api, request, router, path, type) => {

  let successTitle = ''
  let errorTitle = ''

  const errorTemplate = 'サーバーエラーテキストを確認してください。'

  if (type === 'update') {
    successTitle = '更新成功'
    errorTitle = '変更するモデル名が入力されてません。'
  } else if (type === 'create') {
    successTitle = '新規作成成功'
    errorTitle = '新規モデル名の値が入力されてません。'
  } else if (type === 'delete') {
    successTitle = '削除成功'
    errorTitle = errorTemplate
  } else if (type === 'updateAccount') {
    successTitle = 'アカウントの更新成功'
    errorTitle = errorTemplate
  }  else if (type === 'createAccount') {
    successTitle = 'アカウントの新規作成成功'
    errorTitle = errorTemplate
  }

  await axios
    .post(api, request)
    .then(res => {        
        if (res.data.result_code === 0) {
          Swal.fire({
            icon: 'success',
            title: successTitle,
            showConfirmButton: false,
            showCloseButton: false
            })
            router.go(path)
          } else {
          Swal.fire({
            icon: 'error',
            text: res.data.message,
            title: 'Error',
            showConfirmButton: false,
            showCloseButton: false
          })
          }
        }).catch((res) => {
          Swal.fire({
            text: '失敗: ' + res,
            title: errorTitle,
            icon: 'error',
            showConfirmButton: true,
            showCloseButton: false
          })
        }
      ).finally(() => { 
    })
}


export default post