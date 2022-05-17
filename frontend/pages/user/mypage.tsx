import MypageForm from "component/user/mypageForm";
import { useEffect, useState } from "react";
import cookies from 'next-cookies';
import styles from 'styles/scss/User.module.scss'
import { deleteMember } from "core/api/memberApi";

const mypage = ({ token }) => {
  const [memberId, setMemberId] = useState("");
  const [email, setEmail] = useState("")
  const [nickname, setNickname] = useState("")
  console.log(token);

  
  const onWithdraw = async () => {
    confirm("정말로 탈퇴하시겠습니까?");
    // const result = await deleteMember({token})
  }

  return (
    <div>
      <div className={styles.mypageForm}>
      <div className={styles.title}>
        <h2>회원 정보</h2>
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
        <button type='button' className={styles.btn_withdraw} onClick={onWithdraw} >탈퇴하기</button>
        <button type='button' className={styles.btn_modify}  >정보수정</button>
        </div>
      </div>
    </div>
      {/* <MypageForm /> */}
    </div>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      token: cookies(context).member,
    },
  }
}

export default mypage;