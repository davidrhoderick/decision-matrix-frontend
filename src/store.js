import {configureStore} from '@reduxjs/toolkit'

import {loadState, saveState} from './localStorage'

import choices from './choicesSlice'
import factors from './factorsSlice'
import factorsChoices from './factorsChoicesSlice'

const store = configureStore({
  reducer: {
    choices,
    factors,
    factorsChoices
  },
  preloadedState: loadState()
})

store.subscribe(() => {
  saveState({
    choices: store.getState().choices,
    factors: store.getState().factors,
    factorsChoices: store.getState().factorsChoices
  })
})

export default store