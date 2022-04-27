import React, { Component, useState } from 'react'
import MemoSeparator from 'component/memo/memoSeparator/MemoSeparator'
import RND from 'component/diary/RND'
import Pannel from 'component/diary/Pannel'

const diary = () => {
  // 컴포넌트(떡메)의 위치, 크기 정보
  // 추 후에 고유번호(백엔드와 협의 후 결정)값이 추가되어야 함.
  const [content, setContent] = useState([
    {
      width: '200px',
      height: '200px',
      x: 10,
      y: 10,
      memoTypeSeq: 1,
    },
    {
      width: '500px',
      height: '200px',
      x: 40,
      y: 310,
      memoTypeSeq: 2,
    },
  ])
  const [draggableState, setDraggableState] = useState(true)
  const test = {
    background: '#898989',
    overflow: 'hidden',
  } as const

  const enableDragging = () => {
    setDraggableState(true)
    console.log('enable dragging')
  }
  const disableDragging = () => {
    setDraggableState(false)
    console.log('disable dragging')
  }

  const onClickPannel = (params, e) => {
    setContent([
      ...content,
      {
        width: '',
        height: '',
        x: 10,
        y: 10,
        memoTypeSeq: params,
      },
    ])
    console.log(params)
    alert('추가되었습니다.')
  }

  console.log('reload')

  return (
    <>
      {console.log(content)}
      {content.map((c, index) => (
        <RND
          style={test}
          content={c}
          key={index}
          onDragStop={(e, d) => {
            console.log(d)
            setContent(
              content.map((con, idx) =>
                idx === index ? { ...con, x: d.x, y: d.y } : con,
              ),
            )
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            setContent(
              content.map((con, idx) =>
                idx === index
                  ? { ...con, width: ref.style.width, height: ref.style.height }
                  : con,
              ),
            )
          }}
          onResize={(e, direction, ref, delta, position) => {
            setContent(
              content.map((con, idx) =>
                idx === index
                  ? { ...con, width: ref.style.width, height: ref.style.height }
                  : con,
              ),
            )
          }}
          disableDragging={!draggableState}
        >
          {/* 여기에 이런식으로 넣고자하는 컴포넌트 넣기*/}
          <MemoSeparator
            width={Number(c.width.substring(0, c.width.length - 2))}
            height={Number(c.height.substring(0, c.height.length - 2))}
            content={'helloWorld'}
            header={'this is header'}
            memoTypeSeq={c.memoTypeSeq}
            drag={{ enableDragging, disableDragging }}
          />
        </RND>
      ))}
      <Pannel onClick={onClickPannel} />
    </>
  )
}

export default diary
