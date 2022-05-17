import {instance} from './axios'

const COMMON = '/members';

// 중복체크
export const checkId = async (memberId) => {
  const response = await instance.get(COMMON + '/memberId/' + memberId);
  return response.data;
};

// 이메일 인증 메일 발송
export const emailAuth = async (email) => {
  const response = await instance.post(COMMON + '/email/auth', { email });
  return response.data;
};

// 이메일 인증번호 확인
export const emailAuthCheck = async (email, emailAuth) => {
  const response = await instance.post(COMMON + '/email/auth/check', { email: email, emailAuth: emailAuth});
  return response.data;
}

// 회원가입
export const onSignup = async (memberData) => {
  const response = await instance.post(COMMON, memberData);
  return response.data;
};

// 로그인
export const onLogin = async ({ memberId, password }) => {
  const response = await instance.post(COMMON + '/login', { memberId, password });
  return response.data;
}

// 회원 정보
export const getMemberInfo = async (token) => {
  const response = await instance.get(COMMON + '/mypage', {
    headers: {
      Authorization: `Bearer ` + token,
      'Content-Type': 'application/json',
    },
  })
  // console.log("api안쪽")
  // console.log(response.data)
  return response.data;
}

// 회원 정보 수정
export const modifyMemberInfo = async (member) => {
  const response = await instance.put(COMMON)
}

// 회원 탈퇴
export const deleteMember = async (token) => {
  const response = await instance.delete(COMMON, {
    headers: {
      Authorization: `Bearer ` + token,
      'Content-Type': 'application/json',
    },
  })

  return response.data;
}