import React, {useState} from 'react';
import styles from 'styles/scss/Signup.module.scss'
// import checkId from 'api'

const signupForm = () => {
  const [state, setState] = useState({
    userId: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    email: "",
  })

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  // error State
  const [errorState, setErrorState] = useState({
    userIdRegex: false,
    userIdUnique: false,
    passwordRegex: false,
    passwordConfirm: false,
    nicknameRegex: false,
    emailRegex: false,
    emailUnique: false,
  });

  // error Message
  const errorMsg = {
    userIdRegex: '4자 이상의 영문 혹은 영문과 숫자를 조합',
    userIdUnique: '아이디 중복확인',
    passwordRegex: '8자 이상의 영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합',
    passwordConfirm: '동일한 비밀번호를 입력해주세요.',
    nicknameRegex: '3자 이상의 한글/영문/숫자 조합',
    emailRegex: '잘못된 이메일 형식입니다.',
    emailUnique: '중복되는 이메일이 있습니다. ',
  };
  
  // 아이디 유효성 검사
  const checkIdValid = (e) => {
    console.log(e.target.value);
    var checkId = /^[A-Za-z]{1}[a-z|A-Z|0-9+|]{3,15}$/g.test(state.userId);
    if (!checkId) {
      setErrorState({
        ...errorState,
        userIdRegex: false,
      });

    } else {
      setErrorState({
        ...errorState,
        userIdRegex: true,
      })
    }
    console.log(errorState.userIdRegex);
  };
  
  // 아이디 중복 확인
  const checkIdUnique = (e) => {
    console.log("아이디 중복 확인");
    // 중복 체크시 true / false 반환
    const result = true; // checkId(state.userId);
    if (result) {
      setErrorState({
        ...errorState,
        userIdUnique: true,
      });
    } else {
      setErrorState({
        ...errorState,
        userIdUnique: false,
      });
    }
  };
  
  // 비밀번호 유효성 검사
  const checkPasswordValid = (e) => {
    if (state.password.length < 8) {
      errorState.passwordRegex = false;
    } else {
      errorState.passwordRegex = true;
    }
    var chkNum = state.password.search(/[0-9]/g); // 숫자
    
  }

  // 이메일 유효성 검사
  const checkEmailValid = (e) => {
    var checkEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/g.test(state.email);

    
  }

  // 이메일 중복 확인 + 이메일 인증 HOW?
  const emailCheck = (e) => {
    console.log("이메일 중복 확인")
  }
  

  // 가입하기 버튼 클릭
  const signupFormSubmit = (e) => {
    e.preventDefault();
    // 1. 입력 조건 확인
    // 2. 필수 입력란 확인
    // 3. 중복체크 여부 확인
    
  }

  return (
    <div className={styles.signupForm}>
      <div className={styles.title}>
        <h2>회원가입</h2>
      </div>
      {/* <p className={styles.sub}>
        <span className={styles.ico}>*</span>필수입력사항
      </p> */}
      <div className={styles.content}>
        <table className={styles.tblComm}>
          <tbody>
            <tr>
              <th>아이디</th>
              <td>
                <input type="text" name='userId' value={state.userId} onChange={handleChangeState} onKeyUp={checkIdValid} maxLength={16} placeholder="4자 이상의 영문 혹은 영문과 숫자를 조합" required />
                <p className={ state.userId.length==0 ? styles.txt_guide_none : errorState.userIdRegex ? styles.txt_guide_none : styles.txt_guide_block}>
                  <span>{errorMsg.userIdRegex}</span>
                </p>
              </td>
              <td><button type='button' onClick={checkIdUnique} >중복확인</button></td>
            </tr>
            <tr>
              <th>비밀번호</th>
              <td><input type="password" name='password' value={state.password} onChange={handleChangeState} onKeyUp={checkPasswordValid} maxLength={16} placeholder="비밀번호를 입력해주세요." required /></td>
            </tr>
            <tr>
              <th>비밀번호확인</th>
              <td><input type="password" name='confirmPassword' value={state.confirmPassword} onChange={handleChangeState} maxLength={16} placeholder="비밀번호를 한번 더 입력해주세요." required /></td>
            </tr>
            <tr>
              <th>닉네임</th>
              <td><input type="text" name='nickname' value={state.nickname} onChange={handleChangeState} placeholder="닉네임을 입력해주세요" required /></td>
            </tr>
            <tr>
              <th>이메일</th>
              <td><input type="text" name='email' value={state.email} onChange={handleChangeState} placeholder="예:ondiary@onda.com" required /></td>
              <td><button type='button' onClick={emailCheck} >중복확인</button></td>
            </tr>
          </tbody>
        </table>
        <div>
          <button type='button' onClick={signupFormSubmit}>가입하기</button>
        </div>
      </div>
    </div>
  );
};

export default signupForm;