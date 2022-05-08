import { useEffect, useState } from 'react';
import styles from 'styles/scss/User.module.scss'
import { onLogin } from 'pages/api/memberApi';
import { setCookie } from 'pages/api/cookie';
import { useCookies } from 'react-cookie';

const loginForm = () => {
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(['member']);

  const memberIdHandler = (e) => {
    setMemberId(e.currentTarget.value);
  }

  const passwordHandler = (e) => {
    setPassword(e.currentTarget.value);
  }

  // 로그인 버튼 클릭
  const loginFormSubmit = async () => {
    const result = await onLogin({memberId, password});
    if (result.status == 200) {
      alert(result.msg);
      setCookie("member", result.data, {
        path: "/",
        secure: true,
        sameSite: "none",
      })
      window.location.href = '/diary/diary';
    } else {
      alert(result.msg);
    }
  }

  // 로그아웃 테스트 버튼
  const logout = () => {
    console.log("logout btn")
    removeCookie("member", {
      path: "/",
      secure: true,
      sameSite: "none"
    });
    window.location.href = '/user/login';
  }

  return (
    <div className={styles.loginForm}>
      <div className={styles.title}>
        <h2>로그인</h2>
      </div>
      <div className={styles.content}>
        <input type="text" className='member_id' value={memberId} onChange={memberIdHandler} placeholder='아이디를 입력해주세요' required />
        <input type="password" className='password' value={password} onChange={passwordHandler} placeholder='비밀번호를 입력해주세요' />
        <button className={styles.btn_login} type='button' onClick={loginFormSubmit}>로그인</button>
        <a href="/user/signup" className={styles.btn_signup}>회원가입</a>
        <button className={styles.btn_login} type='button' onClick={logout}>로그아웃</button>
      </div>
    </div>
  );
};

export default loginForm;