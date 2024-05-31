import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import produce from 'immer'

export type PageInfoType = {
  title: string
  desc?: string
  background?: string
  js?: string
  css?: string
  isPublished?: boolean
}

const INIT_STATE: PageInfoType = {
  title: '',
  desc: '',
  background: '',
  js: '',
  css: '',
}

const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState: INIT_STATE,
  reducers: {
    resetPageInfo: (state: PageInfoType, action: PayloadAction<PageInfoType>) => {
      return action.payload
    },

    // 修改标题
    changePageTitle: produce((draft: PageInfoType, action: PayloadAction<string>) => {
      draft.title = action.payload
    }),
    // 修改标题
    changePageBackground: produce((draft: PageInfoType, action: PayloadAction<string>) => {
      draft.background = action.payload
    }),
  },
})

export const { resetPageInfo, changePageTitle, changePageBackground } = pageInfoSlice.actions

export default pageInfoSlice.reducer
