import {configureStore} from '@reduxjs/toolkit'

import choices from './choicesSlice'
import factors from './factorsSlice'
import factorsChoices from './factorsChoicesSlice'

export default configureStore({
  reducer: {
    choices,
    factors,
    factorsChoices
  }
})