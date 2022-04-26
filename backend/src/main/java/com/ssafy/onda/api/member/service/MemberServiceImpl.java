package com.ssafy.onda.api.member.service;

import com.ssafy.onda.api.member.repository.MemberRepository;
import com.ssafy.onda.global.common.util.LogUtil;
import com.ssafy.onda.global.error.exception.CustomException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
}
