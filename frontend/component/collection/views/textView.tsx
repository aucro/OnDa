import React from "react";
import styles from '../../../styles/scss/Collection.module.scss'
const TextView = ({info}) =>{

    return (
        <div>
            {info.header}
            {info.content}
        </div>
    )
} 

export default TextView;