import axios from 'axios';
import Swal from 'sweetalert2';

const post = async (api, request, router, path, type) => {

  let successTitle = ''
  let errorTitle = ''

  if (type === 'update') {
    successTitle = '更新成功'
    errorTitle = '変更するモデル名が入力されてません。'
  } else if (type === 'create') {
    successTitle = '新規作成成功'
    errorTitle = '新規モデル名の値が入力されてません。'
  } else if (type === 'delete') {
    successTitle = '削除成功'
    errorTitle = 'サーバーエラーテキストを確認してください。'
  }

  await axios
    .post(api, request)
    .then(res => {        
        if (res.data.result_code === 0) {
          Swal.fire({
            type: 'success',
            title: successTitle,
            showConfirmButton: false,
            showCloseButton: false
            })
            router.go(path.fullPath)
          } else {
          Swal.fire({
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