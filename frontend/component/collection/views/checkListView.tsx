import React, { useState } from "react";
import styles from '../../../styles/scss/Collection.module.scss'
const CheckListView = ({memoSeq}) =>{
    const [info, setInfo] = useState();
    return (
        <div>
            <div className={styles.checklistHeader}>{info.checklistHeader}</div>
            {info.checklistItems.length > 0 &&
                info.checklistItems.map((item, index) => {
                return (
                <div className={styles.checklistBody}>
                    <input value={item.isChecked} />
                    {item.content}
                </div>
            )
        })}
        </div>
    )
} 

export default CheckListView;