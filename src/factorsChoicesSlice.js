import {createSlice} from '@reduxjs/toolkit'

export const factorsChoicesSlice = createSlice({
  name: 'factorsChoices',
  initialState: {
    matrix: [[
        1, 2
      ], [
        3, 3
      ]
    ]
  },
  reducers: {
    incrementFactor: (state, action) => {
      state.matrix[action.payload.factor][action.payload.choice]++

      if(state.matrix[action.payload.factor][action.payload.choice] > 3) {
        state.matrix[action.payload.factor][action.payload.choice] = 0
      }
    }
  },
  extraReducers: {
    'factors/addFactor': (state) => {
      state.matrix.push(state.matrix[0].map(() => 0))
    },
    'factors/removeFactor': (state, action) => {
      state.matrix = state.matrix.filter((factor, index) => index !== action.payload)
    },
    'choices/addChoice': (state) => {
      state.matrix = state.matrix.map(factor => factor.concat([0]))
    },
    'choices/removeChoice': (state, action) => {
      state.matrix = state.matrix.map(factor => factor.filter((choice, index) => index !== action.payload))
    }
  }
})

export const {incrementFactor} = factorsChoicesSlice.actions

export default factorsChoicesSlice.reducer