package com.ssafy.onda.global.common.entity;

import com.ssafy.onda.global.common.entity.base.BaseMemoEntity;
import lombok.*;

import javax.persistence.*;

@Getter
@ToString(of = {"checklistSeq", "checklistTitle"})
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "tb_checklist")
@Entity
public class Checklist extends BaseMemoEntity {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long checklistSeq;

    private String checklistTitle;

    @Builder
    public Checklist(Long x, Long y, Long width, Long height, Long checklistSeq, String checklistHeader) {
        super(x, y, width, height);
        this.checklistSeq = checklistSeq;
        this.checklistTitle = checklistTitle;
    }
}
