package com.ssafy.onda.api.member.service;

import com.ssafy.onda.api.member.dto.MemberDto;
import com.ssafy.onda.api.member.dto.request.ReqLoginMemberDto;
import com.ssafy.onda.api.member.dto.request.ReqMemberDto;
import com.ssafy.onda.api.member.dto.response.ResMemberDto;
import com.ssafy.onda.global.common.auth.CustomUserDetails;

public interface MemberService {

    boolean hasMemberId(String memberId);

    boolean hasEmail(String email);

    void register(ReqMemberDto reqMemberDto);

    MemberDto findMemberDtoInLogin(ReqLoginMemberDto reqLoginMemberDto);

    MemberDto findMemberDtoByMemberId(String memberId);

    ResMemberDto findResMemberDto(CustomUserDetails details);

}
