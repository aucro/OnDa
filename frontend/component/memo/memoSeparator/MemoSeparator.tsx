import { NextPage } from 'next/types'
import React, { useEffect } from 'react'
import MemoText from '../memoText/MemoText'
import MemoFinancialLedger from '../memoFinancialLedger/MemoFinancialLedger'
import MemoImage from '../memoImage/MemoImage'
import MemoChecklist from '../memoCheckList/MemoChecklist'
import MemoSticker from '../memoSticker/MemoSticker'
/**
 * MemoTypeSeq index
 * 1번 : memoText 텍스트 떡메
 * 2번 : memoFinancialLedger 가계부 떡메
 */

interface Props {
  width: number
  height: number
  // content: any,
  // header: any,
  memoInfo: any
  memoTypeSeq: number
  drag: any
}
const MemoSeparator: NextPage<Props> = ({
  width,
  height,
  memoInfo, //memoInfo = memoList의 한 요소 전체 정보(width, height, x, y, info(content, header))
  memoTypeSeq,
  drag,
}) => {
  console.log(memoInfo)
  if (memoTypeSeq === 1) {
    return <MemoText memoInfo={memoInfo} drag={drag} />
  } else if (memoTypeSeq === 2) {
    return <MemoFinancialLedger drag={drag} />
  } else if (memoTypeSeq === 3) {
    return <MemoChecklist memoInfo={memoInfo} drag={drag} />
  } else if (memoTypeSeq === 4) {
    return <MemoImage drag={drag} />
  } else if (memoTypeSeq === 5) {
    return <MemoSticker width={width} height={height} drag={drag} />
  }
}

export default MemoSeparator
