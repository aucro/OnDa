import React, { useState, useEffect } from 'react';
import styles from '../../../styles/scss/Memo.module.scss'
import InputEmoji from 'react-input-emoji'
const MemoSticker= ({memoInfo, drag}) => {
    const { width, height, info } = memoInfo
    const [isEditable, setIsEditable] = useState(false);
    const [text, setText] = useState('')
    const [finalEmoji, setFinalEmoji] = useState('');
    const [size, setSize] = useState(width*height/500);

    useEffect(()=>{
        setSize(Math.pow(Math.min(width, height),2)/500)
        console.log(width)
    },[width, height])
    const handleOnEnter = (text) => {
        console.log('enter', text)
        setFinalEmoji(text);
    }
    const onUpdateButtonClick = () =>{
        setIsEditable(true);
        drag.disableDragging();
    }
    const onApproveUpdateClick = () => {
        setIsEditable(false);
        handleOnEnter(text);
        drag.enableDragging();
    }
    const onDeleteButtonClick = () =>{

    }
    return (
        <div className={styles.checklist}>
            <div className={styles.deleteButton} onClick={onDeleteButtonClick}>
                ❌
            </div>
            {!isEditable && (<div className={styles.updateButton} onClick={onUpdateButtonClick}>✏️</div>)}
            {finalEmoji !== '' && <div style={{fontSize: size.toString()+'px'}}>{finalEmoji}</div>}
            {isEditable && (
                <div className={styles.emojiInput}>
                    <InputEmoji
                    value={text}
                    onChange={setText}
                    cleanOnEnter
                    onEnter={handleOnEnter}
                    placeholder="이모지를 선택해주세요!"
                    maxLength={1}
                    />
                </div>)}
            {isEditable && (
                <div className={styles.approveUpdateButton} onClick={onApproveUpdateClick}>
                ✔️
                </div>
            )}
        </div>
    );
};

export default MemoSticker;
