import React, { useState } from 'react';
import MemoFrame from '../memoCommon/MemoFrame';

const memoChecklist = () => {
    const [checkboxInfo, setCheckboxInfo] = useState([{
        content: 'test',
        isChecked: false
    },{
        content: 'test2',
        isChecked: true
    }])
    
    const onCheckboxClick = (index) =>{
        checkboxInfo[index].isChecked = !checkboxInfo[index].isChecked
        setCheckboxInfo([...checkboxInfo])
    }

    const addCheckboxList = () =>{
        setCheckboxInfo([...checkboxInfo, {content: "추가하기 test", isChecked: false}])
    }

    return (
        <div>
            {checkboxInfo.length > 0 && checkboxInfo.map((checkbox, index)=>{
                return(
                    <div>
                        <input type='checkbox' checked={checkbox.isChecked} onClick={()=>onCheckboxClick(index)}/>
                        {checkbox.content}
                    </div>
                )
            })}
            <button onClick={addCheckboxList} >추가하기</button>
        </div>
    );
};

export default memoChecklist;