import React, { useEffect, useRef, useState  } from 'react';
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import styles from '../../styles/scss/Collection.module.scss'
import CollectionPannel from 'component/collection/collectionPannel';
import { useRouter } from 'next/router'
import { AppDispatch } from 'core/store'
import { useDispatch, useSelector } from 'react-redux'
import { getCollectionMemoListAction } from 'core/store/actions/collection'
const token =
'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0MDMiLCJpc3MiOiJvbmRhLnNzYWZ5LmNvbSIsImV4cCI6MTY1Mzk4MTk5MiwiaWF0IjoxNjUyNjg1OTkyfQ.o-gEwnZVFOVCRL1Y0JnPrkrl_qjNZb2ssNn235x2DYsWwPEg-Kv7Ar2HVAMc7cN1x0LMRe4YS5ZvTuwHTX49MQ'


const month = () => {
    const router = useRouter();
    const appDispatch:AppDispatch = useDispatch();
    const [collectionPannelIsOpen, setCollectionPannelIsOpen] = useState(false);
    const [searchInput, setSearchInput] = useState(null);
    const [extendedProps, setExtendedProps] = useState({});
    const [selectType, setSelectType] = useState(0);
    const previewInfo = useSelector(({ collection }) => collection.collectionMemoListInfo)
    console.log(previewInfo)

    const selectChanged = (e) =>{
        console.log(typeof Number(e.target.value))
        setSelectType(Number(e.target.value))
    }
    const getBriefInfo = () =>{
        let params = {
            type: selectType,
            token: token,
            keyword: searchInput,
        }
        // if(searchInput !== undefined && searchInput !==null) params['keyword'] = searchInput;
        console.log(params)
        appDispatch(getCollectionMemoListAction(params))
    }
    useEffect(()=>{getBriefInfo()},[selectType])
    const onCalenderEventClick=(e)=>{
        console.log(e.event._def);
        console.log(typeof e.event._def.extendedProps);
        setExtendedProps(()=>e.event._def.extendedProps);
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
    const [doubleClickState, setDoubleClickState] = useState({state: false, date:''});
    let doubleClickThrottle;
    const onDateClick = (date) =>{
        if(doubleClickState.date !== date){
            setDoubleClickState({state: true, date: date});
            doubleClickThrottle = setTimeout(()=>{
                setDoubleClickState({state: false, date: date});
            }, 200)
            return;
        }
        if(doubleClickState.state){
            router.push(`/diary/${date}`)
        }
        else{
            setDoubleClickState({state: true, date: date});
            doubleClickThrottle = setTimeout(()=>{
                setDoubleClickState({state: false, date: date});
            }, 200)
        }
    }
    return (
        <div>
            <div className={styles.month}>
                <input className={styles.searchInput} onChange={(e)=>searchInputChange(e)} onKeyDown={(e)=>onEnterInput(e)}/>
                <button className={styles.searchBtn} onClick={searchByKeyword}>검색</button>
            </div>
            <div className={styles.dropdownBar} style={{width: "70%"}}>
                <select className={styles.selectBox} onChange={(e)=>selectChanged(e)}>
                    <option value={0}>전체보기</option>
                    <option value={1}>텍스트</option>
                    <option value={2}>가계부</option>
                    <option value={3}>체크리스트</option>
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
                dateClick={(e)=>onDateClick(e.dateStr)}
                events={previewInfo}
                eventClick={(e)=>{onCalenderEventClick(e)}}
                />
            </div>
        </div>
    );
};

export default month;
