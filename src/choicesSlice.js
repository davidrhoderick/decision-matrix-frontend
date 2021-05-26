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
    },
    changeChoice: (state, action) => {
      state.list[action.payload.index] = action.payload.name
    }
  }
})

export const {addChoice, removeChoice, changeChoice} = choicesSlice.actions

export default choicesSlice.reducer