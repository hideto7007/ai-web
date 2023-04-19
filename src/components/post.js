import axios from 'axios';
import Swal from 'sweetalert2';

const post = async (api, request, router, path) => {
  await axios
    .post(api, request)
    .then(res => {        
        if (res.data.result_code === 0) {
          Swal.fire({
            type: 'success',
            title: '更新成功',
            showConfirmButton:false,
            showCloseButton:false
            })
            router.go(path.fullPath)
          } else {
          Swal.fire({
            text: res.data.message,
            title: 'Error',
            showConfirmButton:false,
            showCloseButton:false
          })
          }
        }).catch((res) => {
          Swal.fire({
            text: '失敗' + res,
            title: 'モデル名を変更する値が入力されてない',
            icon: 'error',
            showConfirmButton:true,
            showCloseButton:false
          })
        }
      ).finally(() => { 
    })
}


export default post