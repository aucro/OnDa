import LoginForm from 'component/user/loginForm'
import { onLogin } from 'core/api/memberApi'
import { useState } from 'react'
import { useRouter } from 'next/router'

const login = () => {
  const [memberId, setMemberId] = useState('')
  const [password, setPassword] = useState('')

  const memberIdHandler = (e) => {
    setMemberId(e.currentTarget.value)
  }

  const passwordHandler = (e) => {
    setPassword(e.currentTarget.value)
  }

  const router = useRouter()

  // 로그인 버튼 클릭
  const loginFormSubmit = async () => {
    const result = await onLogin({ memberId, password })
    if (result.status == 200) {
      document.cookie = `member = ${result.data.jwtToken}; path=/`
      router.push(`/collection/month`)
    } else {
      alert(result.msg)
    }
  }

  // 로그아웃 테스트 버튼
  const logout = () => {
    document.cookie = `member = ; path=/`
    router.push(`/user/login`)
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
      <LoginForm {...props} />
    </div>
  )
}

export default login
