import {configureStore} from '@reduxjs/toolkit'

import decisions from './decisionsSlice'
import factors from './factorsSlice'
import decisionsFactors from './decisionsFactorsSlice'

export default configureStore({
  reducer: {
    decisions,
    factors,
    decisionsFactors
  }
})