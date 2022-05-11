import DatePicker from 'react-datepicker'
import React, { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './DatePickerModule.module.scss'

const DatePickerModule = ({ startDate, setStartDate }) => {
  return (
    <>
      <DatePicker
        selected={startDate}
        dateFormat="yyyy-MM-dd"
        onChange={(date) => setStartDate(date)}
        className={styles.datePicker}
      />
    </>
  )
}

export default DatePickerModule
