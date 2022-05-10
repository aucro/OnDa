import LoginForm from "component/user/loginForm";
import { removeCookie, setCookie } from "pages/api/cookie";
import { onLogin } from "pages/api/memberApi";
import { useState } from "react";



const login = () => {
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");

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
      // alert(result.msg);
      setCookie("member", result.data, {
        path: "/",
        secure: true,
        sameSite: "none",
      })
      window.location.href = '/collection/month';
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

  const props = {
    memberId,
    password,
    memberIdHandler,
    passwordHandler,
    loginFormSubmit,
    logout,
  }

  return (
    <div className="login-page">
      <LoginForm {...props}/>
    </div>
  );
};

export default login;