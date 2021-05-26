import {createSlice} from '@reduxjs/toolkit'

export const decisionsSlice = createSlice({
  name: 'decisions',
  initialState: {
    list: ['Choice 1', 'Choice 2']
  },
  reducers: {
    addDecision: (state, action) => {
      state.list.push(action.payload)
    },
    removeDecision: (state, action) => {
      state.list = state.list.filter((decision, index) => action.payload !== index)
    }
  }
})

export const {addDecision, removeDecision} = decisionsSlice.actions

export default decisionsSlice.reducer