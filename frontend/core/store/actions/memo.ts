import { createAsyncThunk } from '@reduxjs/toolkit'
import { BASE_URL } from '../common/index'
import axios from 'axios'

interface MyKnownError {
  errorMessage: string
}

interface memoAttributes {
  diaryDate: string
  memoList: any
}

export const getMemoAction = createAsyncThunk<
  memoAttributes,
  number,
  { rejectValue: MyKnownError }
>('memo/getMemo', async (params, thunkAPI) => {
  console.log(params)
  // api get 요청
  const res = {
    diaryDate: '2022-04-28',
    memoList: [
      {
        id: 0,
        width: 200,
        height: 200,
        x: 10,
        y: 40,
        memoTypeSeq: 1,
        info: {
          header: 'test',
          content: 'content',
        },
        isEditing: false,
      },
      // {
      //   id: 1,
      //   width: 200,
      //   height: 200,
      //   x: 310,
      //   y: 40,
      //   memoTypeSeq: 2,
      //   info: [
      //     {
      //       content: '테스트 비용',
      //       income: '10000',
      //       outcome: '20000',
      //     },
      //   ],
      //   isEditing: false,
      // },
      {
        id: 2,
        width: 200,
        height: 200,
        x: 610,
        y: 40,
        memoTypeSeq: 3,
        info: {
          checklistHeader: 'this is checklist header',
          checklistItems: [
            {
              isChecked: true,
              content: 'this is checklist item text 1',
            },
            {
              isChecked: false,
              content: 'this is checklist item text 2',
            },
            {
              isChecked: true,
              content: 'this is checklist item text 3',
            },
          ],
        },
        isEditing: false,
      },
      // {
      //   id: 3,
      //   width: 200,
      //   height: 200,
      //   x: 10,
      //   y: 340,
      //   memoTypeSeq: 4,
      //   info: {},
      //   isEditing: false,
      // },
      // {
      //   id: 4,
      //   width: 200,
      //   height: 200,
      //   x: 310,
      //   y: 340,
      //   memoTypeSeq: 5,
      //   info: '😘',
      //   isEditing: false,
      // },
    ],
  }
  // 요청 response가지고 reducer에 return
  return res
})

export const setMemoAction = createAsyncThunk<
  any,
  any,
  { rejectValue: MyKnownError }
>('memo/setMemo', async (params, thunkAPI) => {
  // api post 요청
  try {
    const res = await axios.post(BASE_URL + '/diary', params.param, {
      headers: {
        Authorization: `Bearer ` + params.token,
        'Content-Type': 'application/json',
      },
    })
    console.log(res)
    if (res.data.status == 201) {
      return res
    }
  } catch (error) {
    console.log(error)
  }
  console.log(params)
})
