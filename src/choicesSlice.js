import {createSlice} from '@reduxjs/toolkit'

export const choicesSlice = createSlice({
  name: 'choices',
  initialState: {
    list: ['Choice 1', 'Choice 2']
  },
  reducers: {
    addChoice: (state, action) => {
      state.list.push(action.payload)
    },
    removeChoice: (state, action) => {
      state.list = state.list.filter((choice, index) => action.payload !== index)
    }
  }
})

export const {addChoice, removeChoice} = choicesSlice.actions

export default choicesSlice.reducer