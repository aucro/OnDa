import { createSlice } from '@reduxjs/toolkit'

const initialMemo = [
  {
    width: 200,
    height: 200,
    x: 10,
    y: 10,
    memoTypeSeq: 1,
  },
  {
    width: 200,
    height: 200,
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
