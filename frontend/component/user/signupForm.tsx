import React, {useState} from 'react';
import styles from 'styles/scss/Signup.module.scss'

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
    emailConfirm: false,
  });

  // error Message
  const errorMsg = {
    userIdRegex: '4자 이상의 영문 혹은 영문과 숫자를 조합, 영문으로 시작',
    userIdUnique: '아이디 중복확인',
    passwordRegex: '8자 이상의 영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합',
    passwordConfirm: '동일한 비밀번호를 입력해주세요.',
    nicknameRegex: '3자 이상의 한글/영문/숫자 조합',
    emailRegex: '잘못된 이메일 형식입니다.',
    emailUnique: '중복되는 이메일이 있습니다. ',
  };

  const signUpBtnMsg = {
    idInput: "아이디를 입력해주세요.",
    idUnique: "아이디 중복확인을 해주세요.",
    pwInput: "비밀번호를 입력해주세요.",
    nickInput: "닉네임을 입력해주세요.",
    emailInput: "이메일 형식을 확인해주세요.",
    emailUnique: "이메일 중복 확인을 해주세요.",
    emailConfirm: "이메일 인증을 해주세요.",
    signUp: "가입이 완료되었습니다.",
  }
  
  // 아이디 유효성 검사
  const checkIdValid = (e) => {
    const checkId = /^[A-Za-z]{1}[a-z|A-Z|0-9+|]{3,15}$/g.test(e.target.value);
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
  };
  
  // 아이디 중복 확인
  const checkIdUnique = (e) => {
    console.log("아이디 중복 확인");
    const result = true; // checkIdDuplicate(state.userId); true / false
    if (state.userId.length == 0) {
      alert("아이디를 입력해주세요.");
    } else if (!errorState.userIdRegex) {
      alert("유효한 형식의 아이디를 입력해주세요.");
    } else if (result) {
      setErrorState({
        ...errorState,
        userIdUnique: true,
      });
      alert("사용할 수 있는 아이디입니다.")
    } else {
      setErrorState({
        ...errorState,
        userIdUnique: false,
      });
      alert("중복된 아이디입니다.")
    }
  };
  
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
    if (pwc != state.password) {
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

  // 이메일 유효성 검사
  const checkEmailValid = (e) => {
    var checkEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/.test(state.email);
    if (!checkEmail) {
      setErrorState({
        ...errorState,
        emailRegex: false,
      })
    } else {
      setErrorState({
        ...errorState,
        emailRegex: true,
      })
    }
  }

  // 이메일 중복 확인
  const checkEmailUnique = (e) => {
    console.log("이메일 중복 확인")
    const result = true; // checkEmailDuplicate(state.email);
    if (state.email.length == 0) {
      alert("이메일을 입력해주세요.");
    } else if (!errorState.emailRegex) {
      alert("유효한 형식의 이메일을 입력해주세요.");
    } else if (result) {
      setErrorState({
        ...errorState,
        emailUnique: true,
      })
      alert("사용할 수 있는 이메일입니다.");
    } else {
      setErrorState({
        ...errorState,
        emailUnique: false,
      })
      alert("중복된 이메일입니다.");
    }
  }
  

  // 가입하기 버튼 클릭
  const signupFormSubmit = (e) => {
    // e.preventDefault();
    var result = "";
    console.log(errorState);
    if (!errorState.userIdRegex) {
      result = signUpBtnMsg.idInput;
    } else if (!errorState.userIdUnique) {
      result = signUpBtnMsg.idUnique;
    } else if (!errorState.passwordConfirm) {
      result = signUpBtnMsg.pwInput;
    } else if (!errorState.nicknameRegex) {
      result = signUpBtnMsg.nickInput;
    } else if (!errorState.emailRegex) {
      result = signUpBtnMsg.emailInput;
    } else if (!errorState.emailUnique) {
      result = signUpBtnMsg.emailUnique;
    // } else if (!errorState.emailConfirm) { // 이메일 인증
    //   result = signUpBtnMsg.emailConfirm;
    } else {
      result = signUpBtnMsg.signUp;
    }
    
    alert(result);
    return;
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
              <td>
                <input type="password" name='password' value={state.password} onChange={handleChangeState} onKeyUp={checkPasswordValid} maxLength={16} placeholder="비밀번호를 입력해주세요." required />
                <p className={ state.password.length==0 ? styles.txt_guide_none : errorState.passwordRegex ? styles.txt_guide_none : styles.txt_guide_block}>
                  <span>{errorMsg.passwordRegex}</span>
                </p>
              </td>
            </tr>
            <tr>
              <th>비밀번호확인</th>
              <td>
                <input type="password" name='confirmPassword' value={state.confirmPassword} onChange={handleChangeState} onKeyUp={checkPasswordConfirm} maxLength={16} placeholder="비밀번호를 한번 더 입력해주세요." required />
                <p className={ state.confirmPassword.length==0 ? styles.txt_guide_none : errorState.passwordConfirm ? styles.txt_guide_none : styles.txt_guide_block}>
                  <span>{errorMsg.passwordConfirm}</span>
                </p>
              </td>
            </tr>
            <tr>
              <th>닉네임</th>
              <td>
                <input type="text" name='nickname' value={state.nickname} onChange={handleChangeState} onKeyUp={checkNicknameValid} maxLength={12} placeholder="닉네임을 입력해주세요" required />
                <p className={ state.nickname.length==0 ? styles.txt_guide_none : errorState.nicknameRegex ? styles.txt_guide_none : styles.txt_guide_block}>
                  <span>{errorMsg.nicknameRegex}</span>
                </p>
              </td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>
                <input type="text" name='email' value={state.email} onChange={handleChangeState} onKeyUp={checkEmailValid} placeholder="예:ondiary@onda.com" required />
                <p className={ state.email.length==0 ? styles.txt_guide_none : errorState.emailRegex ? styles.txt_guide_none : styles.txt_guide_block}>
                  <span>{errorMsg.emailRegex}</span>
                </p>
              </td>
              <td>
                <button type='button' onClick={checkEmailUnique} >중복확인</button>
                {/* <button type='button' onClick={checkEmailUnique} >인증번호 받기</button> */}
              </td>
              
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