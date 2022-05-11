import React from "react";
import styles from '../../../styles/scss/Collection.module.scss'
const FinanceView = ({memoSeq}) =>{

    return (
        <div>
            <div className={styles.checklistHeader}>{info.checklistHeader}</div>
            {info.length > 0 &&
                info.map((item, index) => {
                return (
                <div className={styles.checklistBody}>
                    {item.content}
                    {item.income}
                    {item.outcome}
                </div>
                )
            })}
        </div>
    )
} 

export default FinanceView;