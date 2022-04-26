package com.ssafy.onda.api.member.controller;

import com.ssafy.onda.api.member.service.MemberService;
import com.ssafy.onda.global.common.dto.BaseResponseDto;
import com.ssafy.onda.global.common.util.LogUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.*;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/members")
@RestController
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/{memberId}")
    public BaseResponseDto isExistMemberId(@PathVariable String memberId) {
        log.info("Called API: {}", LogUtil.getClassAndMethodName());

        Integer status = null;
        String msg = null;

        if (memberService.hasMemberId(memberId)) {
            status = OK.value();
            msg = "이미 존재하는 ID입니다.";
        } else {
            status = NO_CONTENT.value();
            msg = "사용할 수 있는 ID입니다.";
        }

        return BaseResponseDto.builder()
                .status(status)
                .msg(msg)
                .build();
    }
}
