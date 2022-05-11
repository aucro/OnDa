import React, { useRef, useState  } from 'react';
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import styles from '../../styles/scss/Collection.module.scss'
import CollectionPannel from 'component/collection/collectionPannel';
const month = () => {
    const [collectionPannelIsOpen, setCollectionPannelIsOpen] = useState(false);
    const [searchInput, setSearchInput] = useState();
    const [extendedProps, setExtendedProps] = useState();
    const events = [{ title: "텍스트 +4", date: '2022-05-09', memoTypeSeq : 1, memoSeqList: ['3','4'] }];
    const onCalenderEventClick=(e)=>{
        console.log(e.event._def);
        console.log(e.event._def.extendedProps.memoTypeSeq);
        setExtendedProps(e.event._def.extendedProps);
        setCollectionPannelIsOpen(true);
    }
    const searchInputChange = (e) => {
        console.log(e.target.value);
        setSearchInput(e.target.value);
    }
    const onEnterInput = (e) => {
        if(e.key === 'Enter')   searchByKeyword();
    }
    const searchByKeyword = () => {
        console.log(searchInput);
    }
    return (
        <div>
            <div className={styles.month}>
                <input className={styles.searchInput} onChange={(e)=>searchInputChange(e)} onKeyDown={(e)=>onEnterInput(e)}/>
                <button className={styles.searchBtn} onClick={searchByKeyword}>검색</button>
            </div>
            <div className={styles.dropdownBar} style={{width: "70%"}}>
                <select className={styles.selectBox}>
                    <option>전체보기</option>
                    <option>텍스트</option>
                    <option>가계부</option>
                    <option>체크리스트</option>
                </select>
            </div>
            {collectionPannelIsOpen && (
                <CollectionPannel
                onCloseBtn={() => {
                    setCollectionPannelIsOpen(false)
                }}
                info={extendedProps}
                />
            )}
            <div className={styles.calender} style={{width: "75%" }}>
                <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                editable
                selectable
                events={events}
                eventClick={(e)=>{onCalenderEventClick(e)}}
                />
            </div>
        </div>
    );
};

export default month;
