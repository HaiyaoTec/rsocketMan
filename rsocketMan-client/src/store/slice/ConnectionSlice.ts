import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import {ReactiveSocket} from "rsocket-types";

export interface Connection {
  rsocket: ReactiveSocket<string, string> | null
  status: string
  error: object | null
  host: string
  port: number
  KeepAlive: number
  metadataMimeType: string
  metadata?: string
  dataMimeType: string
  data?: string
  lifetime: number
}

const initialState: Connection = {
  host: "",
  port: 0,
  lifetime: 0,
  rsocket: null,
  status: 'CONNECTING',
  error: null,
  dataMimeType: "",
  KeepAlive: 0,
  metadataMimeType: "",
}


type initialValues = {
  websocketHost: string,
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
      const host = action.payload.websocketHost?.split(':')[0]
      const port = Number(action.payload.websocketHost?.split(':')[1])
      return {...state, ...action.payload, host, port}
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
