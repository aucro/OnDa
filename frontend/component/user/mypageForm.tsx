import { getMemberInfo } from 'core/api/memberApi';
import router from 'next/router';
import { useEffect, useState } from 'react';
import styles from 'styles/scss/User.module.scss'

const mypageForm = () => {
  const [memberId, setMemberId] = useState();
  

  return (
    <div className={styles.mypageForm}>
      <div className={styles.title}>
        <h2>마이페이지</h2>
      </div>
      <div className={styles.content}>
        <table className={styles.info_tbl}>
          <tbody>
            <tr className={styles.top}>
              <th>아이디</th>
              <td>
                <input type="text" name='memberId' disabled></input>
                
              </td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>
                <input type="text" name='email' disabled />
              </td>
            </tr>
            <tr>
              <th>닉네임</th>
              <td>
                <input type="text" name='nickname' />
                {/* <input type="hidden" name='chk_nickname' required aria-label='중복체크' /> */}
                {/* <button type='button' className={styles.} >중복체크</button> */}
              </td>
            </tr>
          </tbody>
        </table>
        <div className={styles.btn}>
        <button type='button' className={styles.btn_withdraw} >탈퇴하기</button>
        <button type='button' className={styles.btn_modify}  >정보수정</button>
        </div>
      </div>
    </div>
  )
}

export default mypageForm;