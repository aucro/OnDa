package com.ssafy.onda.api.member.repository;

import com.ssafy.onda.api.member.entity.MemberMemo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberMemoRepository extends JpaRepository<MemberMemo, Long> {
}
