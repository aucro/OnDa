import DatePicker from 'react-datepicker'
import React, { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './DatePickerModule.module.scss'

const DatePickerModule = ({ startDate, setStartDate, days }) => {
  return (
    <>
      <DatePicker
        selected={startDate}
        dateFormat="yyyy-MM-dd"
        onChange={(date) => setStartDate(date)}
        className={styles.datePicker}
        dayClassName={(d) => {
          const date = d.getDate()
          let isMatched = false
          days.map((m) => {
            if (date == m) {
              isMatched = true
            }
          })
          return isMatched ? styles.diaryDate : ''
        }}
      />
    </>
  )
}

export default DatePickerModule
