import MypageForm from "component/user/mypageForm";
import { useEffect, useState } from "react";
import cookies from 'next-cookies';
import styles from 'styles/scss/User.module.scss'
import { deleteMember, emailAuth, emailAuthCheck, getMemberInfo, modifyMemberInfo } from "core/api/memberApi";

const mypage = ({ token }) => {
  const [memberId, setMember] = useState("")
  const [email, setEmail] = useState("")
  const [nickname, setNickname] = useState("")
  const [password, setPassword] = useState("")
  const [withdrawStatus, setWithdrawStatus] = useState(false)
  const [modifyStatus, setModifyStatus] = useState(false)

  
  
  useEffect(() => {
    // console.log('컴포넌트가 화면에 나타남');
    const promise = getMemberInfo(token)
    const getData = () => {
      promise.then((appData) => {
          console.log(appData);
          const memberInfo = appData.data.memberInfo;
          setMember(memberInfo.memberId)
          setEmail(memberInfo.email)
          setNickname(memberInfo.nickname)
      })
    }
    getData()

    return () => {
      // console.log('컴포넌트가 화면에서 사라짐');
    };
  }, []);

  // 회원 정보 수정
  const onModify = async () => {
    const result = await modifyMemberInfo(token, nickname)
    if (result.status == 200) {
      alert(result.msg)
      setNickname(nickname)
    } else {
      alert(result.msg)
    }
  }


  // 회원 탈퇴
  const onWithdraw = async () => {
    setWithdrawStatus(true)
    if (password == '') {
      alert("비밀번호를 입력해주세요.")
    } else {
      confirm("정말로 탈퇴하시겠습니까?");
      const result = await deleteMember({ token }, memberId, password)
      console.log(result)
    }

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
                <input type="text" name='memberId' defaultValue={memberId} disabled></input>
                
              </td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>
                <input type="text" name='email' defaultValue={email} disabled />
                {/* <button type='button' onClick={emailSendCode} >인증번호 받기</button> */}
                </td>
              </tr>
            {/* <tr>
              <th>이메일 인증</th>
              <td>
                <input type="text" name='authCode' value={authCode} onChange={(e) => {setAuthCode(e.currentTarget.value)}} placeholder='인증번호 입력' />
                <button type='button' onClick={emailSendCheck} >인증번호 확인</button>
              </td>
            </tr> */}
            <tr>
              <th>닉네임</th>
              <td>
                <input type="text" name='nickname' value={nickname} onChange={(e) => setNickname(e.currentTarget.value)} />
              </td>
              </tr>
              <tr>
                <th>비밀번호</th>
                <td>
                  <input type="password" name='password' value={password} onChange={(e) => setPassword(e.currentTarget.value)}  />
                </td>
              </tr>
          </tbody>
        </table>
        <div className={styles.btn}>
        <button type='button' className={styles.btn_withdraw} onClick={onWithdraw} >탈퇴하기</button>
        <button type='button' className={styles.btn_modify} onClick={onModify} >정보수정</button>
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