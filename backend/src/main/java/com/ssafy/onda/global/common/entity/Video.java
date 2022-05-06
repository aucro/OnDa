package com.ssafy.onda.global.common.entity;

import com.ssafy.onda.global.common.entity.base.Media;
import com.ssafy.onda.global.common.entity.base.Memo;
import lombok.*;

import javax.persistence.*;

@Getter
@ToString(of = {"videoSeq"})
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "tb_video")
@Entity
public class Video {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long videoSeq;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "originName", column = @Column(name = "origin_name", nullable = false)),
            @AttributeOverride(name = "encodingName", column = @Column(name = "encoding_name", nullable = false)),
            @AttributeOverride(name = "savedPath", column = @Column(name = "saved_path", nullable = false))
    })
    private Media media;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "x", column = @Column(name = "x", nullable = false)),
            @AttributeOverride(name = "y", column = @Column(name = "y", nullable = false)),
            @AttributeOverride(name = "width", column = @Column(name = "width", nullable = false)),
            @AttributeOverride(name = "height", column = @Column(name = "height", nullable = false))
    })
    private Memo memo;

    @Builder
    public Video(Long videoSeq, Media media, Memo memo) {
        this.videoSeq = videoSeq;
        this.media = media;
        this.memo = memo;
    }
}
