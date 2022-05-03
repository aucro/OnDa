import {instance} from './axios';

const COMMON = '/members';

// 회원가입
export const onSignup = async (memberData) => {

  const response = await instance.post(COMMON, memberData);
  return response.data;
};

