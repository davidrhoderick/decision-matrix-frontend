import {createSlice} from '@reduxjs/toolkit'

export const decisionsFactorsSlice = createSlice({
  name: 'decisionsFactors',
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
      state.matrix[action.payload.factor][action.payload.decision]++

      if(state.matrix[action.payload.factor][action.payload.decision] > 3) {
        state.matrix[action.payload.factor][action.payload.decision] = 0
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
    'decisions/addDecision': (state) => {
      state.matrix = state.matrix.map(factor => factor.concat([0]))
    },
    'decisions/removeDecision': (state, action) => {
      state.matrix = state.matrix.map(factor => factor.filter((decision, index) => index !== action.payload))
    }
  }
})

export const {incrementFactor} = decisionsFactorsSlice.actions

export default decisionsFactorsSlice.reducer