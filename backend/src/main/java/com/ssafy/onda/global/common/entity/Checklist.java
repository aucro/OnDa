package com.ssafy.onda.global.common.entity;

import com.ssafy.onda.api.diary.entity.Diary;
import com.ssafy.onda.global.common.entity.embedded.Memo;
import lombok.*;

import javax.persistence.*;

@Getter
@ToString(of = {"checklistSeq", "checklistHeader", "memo" })
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "tb_checklist")
@Entity
public class Checklist {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long checklistSeq;

    @Column(nullable = false)
    private String checklistHeader;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "x", column = @Column(name = "x", nullable = false)),
            @AttributeOverride(name = "y", column = @Column(name = "y", nullable = false)),
            @AttributeOverride(name = "width", column = @Column(name = "width", nullable = false)),
            @AttributeOverride(name = "height", column = @Column(name = "height", nullable = false))
    })
    private Memo memo;

    @JoinColumn(name = "diary_seq", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
//    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Diary diary;

    @Builder
    public Checklist(Long checklistSeq, String checklistHeader, Memo memo, Diary diary) {
        this.checklistSeq = checklistSeq;
        this.checklistHeader = checklistHeader;
        this.memo = memo;
        this.diary = diary;
    }
}
