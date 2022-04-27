import { createSlice } from '@reduxjs/toolkit'

const initialMemo = [
  {
    width: '',
    height: '',
    x: 10,
    y: 10,
    memoTypeSeq: 1,
  },
  {
    width: '',
    height: '',
    x: 10,
    y: 10,
    memoTypeSeq: 2,
  },
]

const diarySlice = createSlice({
  name: 'memoList',
  initialState: initialMemo,
  reducers: {
    addMemo: (state, action) => {
      state.push(action.payload)
    },
  },
})

export const { addMemo } = diarySlice.actions
export default diarySlice.reducer
