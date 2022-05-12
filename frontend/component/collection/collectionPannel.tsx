import React, { useState, useRef, useEffect } from 'react'
import closeBtnImg from 'public/asset/image/diaryImage/closeBtnImg.png'
import Image from 'next/image'
import styles from '../../styles/scss/Collection.module.scss'
import CheckListView from './views/checkListView'
import FinanceView from './views/financeView'
import TextView from './views/textView'
import { useDispatch, useSelector } from 'react-redux'
import { getCollectionAction,getCollectionMemoAction } from 'core/store/actions/collection'
import { AppDispatch } from 'core/store'

const token =
'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0MDEiLCJpc3MiOiJvbmRhLnNzYWZ5LmNvbSIsImV4cCI6MTY1MzM1Nzk4NywiaWF0IjoxNjUyMDYxOTg3fQ._yDfuQ4lL5tbYci6CFY-x08muvg71L5wo1uTH6FMMls_2IVep7jGlh5BMVWtqPXYoLp5Zm6UbzRY1aJYagiLrg'


const CollectionPannel = ({ onCloseBtn, info }) => {
  console.log(info)
  console.log(info.memoSeqList.toString())
  const previewInfo = useSelector(({ collection }) => collection)
  console.log(previewInfo.collectionMemoInfo.memoList);
  
  const appDispatch:AppDispatch = useDispatch();

  const getPreviewInfo = () =>{
    const params = {
      memoTypeSeq: info.memoTypeSeq,
      memoSeqList: info.memoSeqList.toString(),
      token: token,
    }
    appDispatch(getCollectionMemoAction(params))

  }

  useEffect(()=>{
    getPreviewInfo();
    console.log(previewInfo);
  },[])
  return (
    <div className={styles.pannel}>
      <div className={styles.closeBtnImgContainer}>
        <Image
          src={closeBtnImg}
          className={styles.closeBtnImg}
          width="36"
          height="36"
          onClick={onCloseBtn}
        />
        {info.memoTypeSeq === 1 && previewInfo.collectionMemoInfo.memoList !== undefined && previewInfo.collectionMemoInfo.memoList.map((memoSeq)=>{
          return (<TextView memoSeq={memoSeq}/>)
        })}
        {info.memoTypeSeq === 2 && previewInfo.collectionMemoInfo.memoList !== undefined && previewInfo.collectionMemoInfo.memoList.map((memoSeq)=>{
          return (<FinanceView memoSeq={memoSeq}/>)
        })}
        {info.memoTypeSeq === 3 && previewInfo.collectionMemoInfo.memoList !== undefined && previewInfo.collectionMemoInfo.memoList.map((memoSeq)=>{
          return (<CheckListView memoSeq={memoSeq}/>)
        })}
      </div>
      
    </div>
  )
}

export default CollectionPannel
