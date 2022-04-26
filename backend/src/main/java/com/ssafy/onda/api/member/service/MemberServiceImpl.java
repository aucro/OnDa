package com.ssafy.onda.api.member.service;

import com.ssafy.onda.api.member.dto.request.ReqMemberDto;
import com.ssafy.onda.api.member.entity.Member;
import com.ssafy.onda.api.member.repository.MemberRepository;
import com.ssafy.onda.global.common.util.LogUtil;
import com.ssafy.onda.global.error.exception.CustomException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.regex.Pattern;

import static com.ssafy.onda.global.error.dto.ErrorStatus.*;

@Transactional(readOnly = true)
@Slf4j
@RequiredArgsConstructor
@Service
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    private final PasswordEncoder passwordEncoder;

    @Override
    public boolean hasMemberId(String memberId) {

        String regx = "^[a-z]+[0-9a-z]{3,15}$";
        Pattern pattern = Pattern.compile(regx);

        System.out.println("memberId = " + memberId);

        if (!pattern.matcher(memberId).matches()) {
            throw new CustomException(LogUtil.getElement(), INVALID_ID_FORMAT);
        }

        System.out.println(memberRepository.existsByMemberId(memberId));

        return memberRepository.existsByMemberId(memberId);
    }

    @Override
    public boolean hasEmail(String email) {
        return memberRepository.existsByEmail(email);
    }

    @Override
    public boolean hasNickname(String nickname) {
        return memberRepository.existsByNickname(nickname);
    }

    @Transactional
    @Override
    public void register(ReqMemberDto reqMemberDto) {

        String memberId = reqMemberDto.getMemberId();

        // validation & duplication check
        if (hasMemberId(memberId)) {
            throw new CustomException(LogUtil.getElement(), MEMBERID_DUPLICATION);
        } else if (reqMemberDto.getPassword().contains(memberId)) {
            throw new CustomException(LogUtil.getElement(), PASSWORD_CONTAINED_MEMBERID);
        } else if (hasNickname(reqMemberDto.getNickname())) {
            throw new CustomException(LogUtil.getElement(), NICKNAME_DUPLICATION);
        } else if (hasEmail(reqMemberDto.getEmail())) {
            throw new CustomException(LogUtil.getElement(), EMAIL_DUPLICATION);
        }

        String encryptedPassword = passwordEncoder.encode(reqMemberDto.getPassword());

        memberRepository.save(Member.builder()
                .memberId(memberId)
                .memberPw(encryptedPassword)
                .email(reqMemberDto.getEmail())
                .nickname(reqMemberDto.getNickname())
                .build());
    }
}
