import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import {createRSocketClient} from "../../utils";

export interface DataDisplay {
  id: string
  method: string
  route?: string
  metadata?: any
  data?: any
  receive: any[]
}



const initialState: DataDisplay = {
  id: '',
  data: undefined,
  metadata: undefined,
  method: "",
  receive: [],
  route: undefined
}

type DataDisplayType = typeof initialState


export const dataDisplaySlice = createSlice({
  name: 'dataDisplay',
  initialState,
  reducers: {
    updateDataDisplay: (state, action: PayloadAction<DataDisplay>) => {
      return {...state, ...action.payload}
    }
  },
})

// Action creators are generated for each case reducer function
export const {updateDataDisplay} = dataDisplaySlice.actions

export default dataDisplaySlice.reducer
