import {createSlice} from '@reduxjs/toolkit'

export const factorsSlice = createSlice({
  name: 'factors',
  initialState: {
    list: ['Factor 1', 'Factor 2']
  },
  reducers: {
    addFactor: (state, action) => {
      state.list.push(action.payload)
    },
    removeFactor: (state, action) => {
      state.list = state.list.filter((factor, index) => action.payload !== index)
    }
  }
})

export const {addFactor, removeFactor} = factorsSlice.actions

export default factorsSlice.reducer