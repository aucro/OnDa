import React, { useState, useEffect } from 'react';
import styles from '../../../styles/scss/Memo.module.scss'
import InputEmoji from 'react-input-emoji'
const MemoSticker= ({width, height, drag}) => {
    const [isEditable, setIsEditable] = useState(false);
    const [text, setText] = useState('')
    const [finalEmoji, setFinalEmoji] = useState('');
    const [size, setSize] = useState(width*height/500);

    useEffect(()=>{
        setSize(width*height/500)
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
                    placeholder="이모지를 선택하기 위해서 엔터키를 눌러주세요!"
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
