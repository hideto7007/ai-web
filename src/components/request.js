import axios from 'axios';
import Swal from 'sweetalert2';

const request = async (requestAPI, session) => {
    let requestList = []
    console.log(session.getItem('token'))
    return await axios
          .get(requestAPI, { withCredentials: true })
          .then((res) => {
            console.log(res)
            if (res.data.result_code === 0) {
              // 入力値取得
              requestList = res.data.detail.result
              } else {
                Swal.fire({
                icon: 'warning',
                title: 'Error',
                text: 'セッションエラー',
                showConfirmButton:false,
                showCloseButton:false,
                })
                session.clear()
                router.push('/auth')
                // router.go(currentRoute)
              }
              return requestList
            }).catch((err) => {
              Swal.fire({
              icon: 'warning',
              title: 'Error',
              text: 'サーバーエラー: ' + err,
              showConfirmButton:false,
              showCloseButton:false,
              })
            }).finally(() => {})
    } 


export default request