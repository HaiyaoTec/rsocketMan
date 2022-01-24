import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import {ReactiveSocket} from "rsocket-types";

export interface Connection {
  rsocket: ReactiveSocket<string, string> | null
  status: string
  error: object | null
  websocketURL:string
  KeepAlive: number
  metadataMimeType: string
  metadata?: string
  dataMimeType: string
  data?: string
  lifetime: number
  //resume need
  sessionDuration?:number
  token?:string
  useResume:boolean
}

const initialState: Connection = {
  websocketURL:'',
  lifetime: 0,
  rsocket: null,
  status: 'CONNECTING',
  error: null,
  dataMimeType: "",
  KeepAlive: 0,
  metadataMimeType: "",
  //resume need
  sessionDuration:0,
  token:'',
  useResume:true
}


type initialValues = {
  websocketURL: string,
  KeepAlive: number,
  lifetime: number,
  dataMimeType: string,
  metadataMimeType: string
}

export const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    configure: (state, action: PayloadAction<initialValues>) => {
      return {...state, ...action.payload}
    },
    updateRScoketInstance: (state, action) => {
      console.log(action.payload)
      state.rsocket = action.payload
      return state
    }
  },
})

// Action creators are generated for each case reducer function
export const {configure, updateRScoketInstance} = connectionSlice.actions

export default connectionSlice.reducer
