import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'

export type receiveItem={
  metadata?:any
  data?:any
  date?:string
  success?:boolean
}
export interface RequestSliceItem {
  id: string
  method?: string
  route?: string
  metadata?: any
  data?: any
  receive?: receiveItem[]
  isFirstSend?:boolean
}

const initialState: Array<RequestSliceItem> = []

export const requestSlice = createSlice({
  name: 'requestSlice',
  initialState,
  reducers: {
    addRequestItem: (state, action: PayloadAction<RequestSliceItem>) => {
      state.unshift(action.payload)
      return state
    },
    updateRequestItem: (state, action: PayloadAction<RequestSliceItem>) => {
      state = state.map((item) => {
        if (item.id === action.payload.id) {
          return {...item, ...action.payload}
        }
        return item
      })
      return state
    },
    clearRequests: (state) => {
      state.length=0
      return state
    },
  },
})

// Action creators are generated for each case reducer function
export const {addRequestItem, updateRequestItem,clearRequests} = requestSlice.actions

export default requestSlice.reducer
