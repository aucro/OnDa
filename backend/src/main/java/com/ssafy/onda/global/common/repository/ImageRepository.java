package com.ssafy.onda.global.common.repository;

import com.ssafy.onda.global.common.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Long> {

    Image findByImageSeq(Long imageSeq);

    List<Image> findAllByImageSeqIn(List<Long> imageSeqs);

}
