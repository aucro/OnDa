import { useState } from 'react';
import styles from 'styles/scss/User.module.scss'
import { onLogin } from 'pages/api/memberApi';

const loginForm = () => {
  // const [loginInfo, setLoginInfo] = useState({
  //   memberId: "",
  //   password: "",
  // })
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");

  const memberIdHandler = (e) => {
    setMemberId(e.currentTarget.value);
  }

  const passwordHandler = (e) => {
    setPassword(e.currentTarget.value);
  }

  const loginInfo = {
    memberId,
    password
  }

  // 로그인 버튼 클릭
  const loginFormSubmit = async () => {
    const result = await onLogin(loginInfo);
    console.log(result);
    if (result.status == 200) {
      alert(result.msg);
    } else {
      alert(result.msg);
    }
  }

  return (
    <div className={styles.loginForm}>
      <div className={styles.title}>
        <h2>로그인</h2>
      </div>
      <div className={styles.content}>
        <input type="text" className='member_id' value={memberId} onChange={memberIdHandler} placeholder='아이디를 입력해주세요' required />
        <input type="password" className='password' value={password} onChange={passwordHandler} placeholder='비밀번호를 입력해주세요' />
        {/* <div className={styles.checkbox_save}>
          <label htmlFor="chk_security" className={styles.chk_label}>
            <input type="checkbox" id='chk_security' name='chk_security' />
            정보 저장
          </label>
          <div className={styles.login_search}>
            <a href="#">아이디 찾기</a>
            <span className={styles.bar}>|</span>
            <a href="#">비밀번호 찾기</a>
          </div>
        </div> */}
        <button className={styles.btn_login} type='button' onClick={loginFormSubmit}>로그인</button>
        <a href="/user/signup" className={styles.btn_signup}>회원가입</a>
      </div>
    </div>
  );
};

export default loginForm;