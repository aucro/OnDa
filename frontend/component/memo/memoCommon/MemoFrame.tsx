import React, { useEffect, useState } from 'react'
import { Resizable } from 're-resizable'
import type { NextPage } from 'next'

interface Props {
  width: number
  height: number
  header?: string
  content?: any
}
const style = {
  position: 'relative',
  border: 'solid 1px #ddd',
  background: '#f0f0f0',
  borderRadius: '15px',
} as const
const headerStyle = {
  verticalAlign: 'top',
  alignItems: 'left',
} as const
const contentStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
} as const
const MemoFrame: NextPage<Props> = ({ width, height, content, header }) => {
  const [size, setSize] = useState({
    width: width,
    height: height,
  })
  useEffect(() => {
    console.log(size)
  }, [size])
  return (
    <Resizable
      style={style}
      size={{
        width: size.width,
        height: size.height,
      }}
      onResizeStop={(e, direction, ref, d) => {
        setSize({ width: size.width + d.width, height: size.height + d.height })
      }}
    >
      <div style={headerStyle}>{header}</div>
      <div style={contentStyle}> {content}</div>
    </Resizable>
  )
}

export default MemoFrame
