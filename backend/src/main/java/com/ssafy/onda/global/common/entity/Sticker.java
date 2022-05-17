package com.ssafy.onda.global.common.entity;

import com.ssafy.onda.api.diary.entity.Diary;
import com.ssafy.onda.global.common.entity.embedded.Memo;
import lombok.*;

import javax.persistence.*;

@Getter
@ToString(of = {"stickerSeq", "emoji" })
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "tb_sticker")
@Entity
public class Sticker {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long stickerSeq;

    @Column(nullable = false)
    private String emoji;

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
    public Sticker(Long stickerSeq, String emoji, Memo memo, Diary diary) {
        this.stickerSeq = stickerSeq;
        this.emoji = emoji;
        this.memo = memo;
        this.diary = diary;
    }
}
