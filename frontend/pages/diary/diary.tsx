import React, { Component, useState, useEffect } from 'react'
import MemoSeparator from 'component/memo/memoSeparator/MemoSeparator'
import RND from 'component/diary/RND'
import Pannel from 'component/diary/pannel'
import { useSelector, useDispatch } from 'react-redux'
import { changeMemoState, addMemo, deleteMemo } from 'core/store/modules/diary'
import { getMemoAction, setMemoAction } from 'core/store/actions/memo'
import { AppDispatch } from 'core/store'

const diary = () => {
  const value = useSelector(({ diary }) => diary)
  console.log(value)
  const len = value.memoList.length
  const lastId = value.lastId

  const dispatch = useDispatch()
  const appDispatch: AppDispatch = useDispatch()

  const [draggableState, setDraggableState] = useState(Array(len).fill(true))

  const enableDragging = (index) => {
    draggableState[index] = true
    setDraggableState([...draggableState])
    console.log('enable dragging')
  }
  const disableDragging = (index) => {
    draggableState[index] = false
    setDraggableState([...draggableState])
    console.log('disable dragging')
  }

  const onClickPannel = (params, e) => {
    dispatch(addMemo({ ...params, id: lastId + 1 }))
    // alert('추가되었습니다.')
  }

  useEffect(() => {
    setDraggableState(Array(len).fill(true))
  }, [len])

  const onClickSave = () => {
    appDispatch(setMemoAction(value))
  }

  const onDeleteMemo = (id) => {
    appDispatch(deleteMemo(id))
  }

  const [viewSize, setViewSize] = useState({
    width: 0,
    height: 0,
  })
  const [pannelIsOpen, setPannelIsOpen] = useState(true)
  const memberSeq = 3
  useEffect(() => {
    appDispatch(getMemoAction(memberSeq))
    setViewSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }, [])

  return (
    <>
      <button onClick={onClickSave}>저장하기</button>
      {value.memoList.map((c, index) => (
        <RND
          style={{
            background: `${c.memoTypeSeq === 5 ? 'transparent' : '#ffc'}`,
            borderRadius: '10px',
            boxShadow: '0 5px 5px `rgba(0,0,0,0.4)`',
            borderStyle: `${c.isEditing ? 'dashed' : 'none'}`,
          }}
          content={c}
          key={index}
          onDragStop={(e, d) => {
            if (d.x > 0 && d.y > 0 && d.x < viewSize.width) {
              dispatch(
                changeMemoState({
                  ...c,
                  x: d.x,
                  y: d.y,
                }),
              )
            }
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            dispatch(
              changeMemoState({
                ...c,
                width: Number(
                  ref.style.width.substring(0, ref.style.width.length - 2),
                ),
                height: Number(
                  ref.style.height.substring(0, ref.style.height.length - 2),
                ),
              }),
            )
          }}
          disableDragging={!draggableState[index]}
        >
          <MemoSeparator
            memoInfo={c} // memoInfo = memoList의 한 요소 전체 정보(width, height, x, y, info(content, header))
            memoTypeSeq={c.memoTypeSeq}
            drag={{
              enableDragging: () => enableDragging(index),
              disableDragging: () => disableDragging(index),
            }}
            onDeleteMemo={onDeleteMemo}
          />
        </RND>
      ))}
      {pannelIsOpen ? (
        <button
          onClick={(e) => {
            setPannelIsOpen(false)
          }}
        >
          X
        </button>
      ) : (
        <button
          onClick={(e) => {
            setPannelIsOpen(true)
          }}
        >
          open
        </button>
      )}
      <Pannel open={pannelIsOpen} onClick={onClickPannel} />
    </>
  )
}

export default diary
