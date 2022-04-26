package com.ssafy.onda.api.member.service;

import com.ssafy.onda.api.member.dto.request.ReqMemberDto;

public interface MemberService {

    boolean hasMemberId(String memberId);

    boolean hasEmail(String email);

    boolean hasNickname(String nickname);

    void register(ReqMemberDto reqMemberDto);

}
