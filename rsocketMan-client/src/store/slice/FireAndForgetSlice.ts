import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface receiveItem {
  metadata?: string
  data?: string
}

interface fireAndForgetItem {
  id: string
  data?: string
  metadata?: string
  route?: string
  receive: receiveItem[]
}

const initFireAndForgetItem = {
  id: "",
  data: "",
  metadata: "",
  route: "",
  receive: []
}


export interface FireAndForget {
  fireAndForgetArray: fireAndForgetItem[]
}

const initialState: FireAndForget = {
  fireAndForgetArray: []
}

type FireAndForgetType = typeof initialState


export const fireAndForgetSlice = createSlice({
  name: 'fireAndForgetSlice',
  initialState,
  reducers: {
    addFireAndForgetItem: (state, action: PayloadAction<fireAndForgetItem>) => {

      const isHaveItemWithId = state.fireAndForgetArray.some((fireAndForgetItem) => {
        return fireAndForgetItem.id == action.payload.id
      })
      if (!isHaveItemWithId) {
        state.fireAndForgetArray.unshift({...initFireAndForgetItem, ...action.payload})
      } else {
        state.fireAndForgetArray = state.fireAndForgetArray.map((fireAndForgetItem) => {
          if (fireAndForgetItem.id == action.payload.id) {
            fireAndForgetItem = action.payload
          }
          return fireAndForgetItem
        })
      }
      return state
    }
  },
})

// Action creators are generated for each case reducer function
export const {addFireAndForgetItem} = fireAndForgetSlice.actions

export default fireAndForgetSlice.reducer
