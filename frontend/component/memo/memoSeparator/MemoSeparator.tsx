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
  info: any
  memoTypeSeq: number
  drag: any
}
const MemoSeparator: NextPage<Props> = ({
  width,
  height,
  info,
  memoTypeSeq,
  drag,
}) => {
  if (memoTypeSeq === 1) {
    return (
      <MemoText
        width={width}
        height={height}
        content={info.content}
        header={info.header}
        drag={drag}
      />
    )
  } else if (memoTypeSeq === 2) {
    return <MemoFinancialLedger drag={drag} />
  } else if (memoTypeSeq === 3) {
    return <MemoChecklist drag={drag} />
  } else if(memoTypeSeq===4){
    return <MemoImage drag={drag}/>
  } else if(memoTypeSeq===5){
    return <MemoSticker width={width} height={height} drag={drag}/>
}
}

export default MemoSeparator
