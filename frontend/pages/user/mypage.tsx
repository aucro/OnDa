import MypageForm from "component/user/mypageForm";
import { useEffect, useState } from "react";
import cookies from 'next-cookies';
import styles from 'styles/scss/User.module.scss'
import { deleteMember, getMemberInfo, modifyMemberInfo, modifyPassword } from "core/api/memberApi";
import { useRouter } from "next/router";

const mypage = ({ token }) => {
  const [memberId, setMember] = useState("")
  const [email, setEmail] = useState("")
  const [nickname, setNickname] = useState("")
  const [password, setPassword] = useState("")

  const [curPassword, setCurPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [checkPassword, setCheckPassword] = useState("")
  const [errorState, setErrorState] = useState({
    nicknameRegex: true,
    passwordRegex: false,
    passwordConfirm: false,
  });
  // error Message
  const errorMsg = {
    passwordRegex: '8자 이상의 영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합',
    passwordConfirm: '동일한 비밀번호를 입력해주세요.',
    nicknameRegex: '3자 이상의 한글/영문/숫자 조합',
  };
  
  useEffect(() => {
    const promise = getMemberInfo(token)
    const getData = () => {
      promise.then((appData) => {
        const memberInfo = appData.data.memberInfo;
        setMember(memberInfo.memberId)
        setEmail(memberInfo.email)
        setNickname(memberInfo.nickname)
      })
    }
    getData()
    return () => {
    };
  }, []);

  // 닉네임 유효성 검사
  const checkNicknameValid = (e) => {
    const checkNick = /^[a-zA-Zㄱ-힣0-9]{3,12}$/g.test(e.target.value);
    if (!checkNick) {
      setErrorState({
        ...errorState,
        nicknameRegex: false,
      })
    } else {
      setErrorState({
        ...errorState,
        nicknameRegex: true,
      })
    }
  }  

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

  const router = useRouter();

  // 회원 탈퇴
  const onWithdraw = async () => {
    if (password == '') {
      alert("비밀번호를 입력해주세요.")
    } else {
      confirm("정말로 탈퇴하시겠습니까?");
      const result = await deleteMember(token, memberId, password)
      if (result.status == 200) {
        alert("탈퇴처리가 완료되었습니다.")
        document.cookie = `member = ; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
        router.push('/user/login')
      } else {
        alert(result.msg)
      }
    }
  }

  // 비밀번호 유효성 검사
  const checkPasswordValid = (e) => {
    const pw = e.target.value;
    const num = pw.search(/[0-9]/g);
    const eng = pw.search(/[A-Za-z]/ig);
    const spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if (pw.length < 8) {
      setErrorState({
        ...errorState,
        passwordRegex: false,
      })
    } else if ((num<0 && eng<0) || (eng<0 && spe<0) || (spe<0 && num<0)) {
      setErrorState({
        ...errorState,
        passwordRegex: false,
      })
    } else {
      setErrorState({
        ...errorState,
        passwordRegex: true,
      })
    }
  }
  
  // 비밀번호 재입력 확인
  const checkPasswordConfirm = (e) => {
    const pwc = e.target.value;
    if (pwc != newPassword) {
      setErrorState({
        ...errorState,
        passwordConfirm: false,
      })
    } else {
      setErrorState({
        ...errorState,
        passwordConfirm: true,
      })
    }
  }

  // 비밀번호 변경
  const changePassword = async () => {
    if (!curPassword || !newPassword || !checkPassword) {
      alert("비밀번호를 입력해주세요.")
    } else if (!errorState.passwordRegex) {
      alert("비밀번호 형식에 맞지 않습니다.")
    } else if (!errorState.passwordConfirm) {
      alert("새로운 비밀번호 확인이 일치하지 않습니다.")
    } else {
      const result = await modifyPassword(token, curPassword, newPassword)
      if (result.status == 200) {
        alert(result.msg)
      } else {
        alert(result.msg)
      }
      setCurPassword('')
      setCheckPassword('') // 지워지지 않음
      setNewPassword('')
    }
  }  
  
  return (
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
                </td>
              </tr>
            <tr>
              <th>닉네임</th>
              <td>
                <input type="text" name='nickname' value={nickname} onChange={(e) => setNickname(e.currentTarget.value)} onKeyUp={checkNicknameValid} maxLength={12} placeholder="닉네임을 입력해주세요" required />
                <button type='button' className={styles.btn_modify} onClick={onModify} >정보수정</button>
                <p className={ nickname.length==0 ? styles.txt_guide_none : errorState.nicknameRegex ? styles.txt_guide_none : styles.txt_guide_block}>
                  <span>{errorMsg.nicknameRegex}</span>
                </p>
              </td>
              </tr>
              <tr>
                <th>비밀번호</th>
                <td>
                <input type="password" name='password' value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
                <button type='button' className={styles.btn_withdraw} onClick={onWithdraw} >탈퇴하기</button>
                </td>
            </tr>
            <tr className={styles.password_title}>
              <th></th>
              <td><h3>비밀번호 변경</h3></td>
            </tr>
            <tr className={styles.top}>
              <th>현재 비밀번호</th>
              <td>
                <input type="password" name='curPassword' value={curPassword} onChange={(e) => setCurPassword(e.currentTarget.value)} onKeyUp={checkPasswordValid} maxLength={16} required />
              </td>
            </tr>
            <tr>
              <th>새로운 비밀번호</th>
              <td>
                <input type="password" name='newPassword' defaultValue={newPassword} onChange={(e) => setNewPassword(e.currentTarget.value)} onKeyUp={checkPasswordValid} maxLength={16} required />
                <p className={ newPassword.length==0 ? styles.txt_guide_none : errorState.passwordRegex ? styles.txt_guide_none : styles.txt_guide_block}>
                  <span>{errorMsg.passwordRegex}</span>
                </p>
              </td>
            </tr>
            <tr>
              <th>비밀번호 확인</th>
              <td>
                <input type="password" name='checkPassword' value={checkPassword} onChange={(e) => setCheckPassword(e.currentTarget.value)} onKeyUp={checkPasswordConfirm} maxLength={16} required />
                <button type='button' className={styles.btn_password} onClick={changePassword} >비밀번호 변경</button>
                <p className={ checkPassword.length==0 ? styles.txt_guide_none : newPassword == checkPassword ? styles.txt_guide_none : styles.txt_guide_block}>
                  <span>{errorMsg.passwordConfirm}</span>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
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