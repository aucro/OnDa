import React, { Component, useEffect, useState } from 'react'
import MemoSeparator from 'component/memo/memoSeparator/MemoSeparator'
import RND from 'component/diary/RND'
import Pannel from 'component/diary/Pannel'
import { useSelector, useDispatch } from 'react-redux'
import { getMemoAction } from 'core/store/actions/memo'

const diary = () => {
  const value = useSelector((state) => state.diary)
  console.log(value)

  const dispatch = useDispatch()

  // 컴포넌트(떡메)의 위치, 크기 정보
  // 추 후에 고유번호(백엔드와 협의 후 결정)값이 추가되어야 함.
  const [content, setContent] = useState(value.diary)
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
    // setContent([
    //   ...content,
    //   {
    //     width: '',
    //     height: '',
    //     x: 10,
    //     y: 10,
    //     memoTypeSeq: params,
    //   },
    // ])

    dispatch(getMemoAction(content))

    // alert('추가되었습니다.')
  }

  console.log('reload')

  useEffect(() => {
    dispatch(getMemoAction(content))
  }, [])

  return (
    <>
      <button>저장하기</button>
      {value.map((c, index) => (
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
                  ? {
                      ...con,
                      width: Number(
                        ref.style.width.substring(
                          0,
                          ref.style.width.length - 2,
                        ),
                      ),
                      height: Number(
                        ref.style.height.substring(
                          0,
                          ref.style.height.length - 2,
                        ),
                      ),
                    }
                  : con,
              ),
            )
          }}
          onResize={(e, direction, ref, delta, position) => {
            setContent(
              content.map((con, idx) =>
                idx === index
                  ? {
                      ...con,
                      width: Number(
                        ref.style.width.substring(
                          0,
                          ref.style.width.length - 2,
                        ),
                      ),
                      height: Number(
                        ref.style.height.substring(
                          0,
                          ref.style.height.length - 2,
                        ),
                      ),
                    }
                  : con,
              ),
            )
          }}
          disableDragging={!draggableState}
        >
          {/* 여기에 이런식으로 넣고자하는 컴포넌트 넣기*/}
          <MemoSeparator
            width={c.width}
            height={c.height}
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
