import React, { useState, useRef } from 'react'
import closeBtnImg from 'public/asset/image/diaryImage/closeBtnImg.png'
import Image from 'next/image'
import styles from '../../styles/scss/Collection.module.scss'
const CollectionPannel = ({ onCloseBtn }) => {
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
      </div>
      
    </div>
  )
}

export default CollectionPannel
