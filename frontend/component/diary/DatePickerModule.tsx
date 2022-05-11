import DatePicker from 'react-datepicker'
import React, { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './DatePickerModule.module.scss'
import { forwardRef } from 'react'
import { format } from 'path'
import moment from 'moment'

const DatePickerModule = ({ startDate, setStartDate }) => {
  // const [startDate, setStartDate] = useState(new Date())
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className={styles.customInput} onClick={onClick} ref={ref}>
      {value}
    </button>
  ))

  return (
    <>
      <DatePicker
        selected={startDate}
        dateFormat="yyyy-MM-dd"
        onChange={(date) => setStartDate(date)}
        className={styles.datePicker}
        // customInput={
        //   <button className={styles.customInput}>
        //     {moment(startDate).format('YYYY-MM-DD')}
        //   </button>
        // }
      />
      {/* <div>{moment(startDate).format('YYYY-MM-DD')}</div> */}
    </>
  )
}

export default DatePickerModule
