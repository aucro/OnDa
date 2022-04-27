import { createSlice } from '@reduxjs/toolkit'
import { getMemoAction } from '../actions/memo'

// interface Memo {
//   width: number
//   height: number
//   x: number
//   y: number
// }

let initialMemo = [
  //   {
  //     width: 200,
  //     height: 200,
  //     x: 10,
  //     y: 10,
  //     memoTypeSeq: 1,
  //   },
  //   {
  //     width: 200,
  //     height: 200,
  //     x: 10,
  //     y: 10,
  //     memoTypeSeq: 2,
  //   },
]

const diarySlice = createSlice({
  name: 'memoList',
  initialState: initialMemo,
  reducers: {
    addMemo: (state, action) => {
      state.push(action.payload)
    },
  },
  extraReducers: (builder) =>
    builder.addCase(getMemoAction.fulfilled, (state, action) => {
      // console.log('success')
      // console.log(action.payload)
      state.push(action.payload)
    }),
})

export const { addMemo } = diarySlice.actions
export default diarySlice.reducer
