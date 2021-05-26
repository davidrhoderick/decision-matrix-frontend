import { css, Global } from "@emotion/react"

import {useSelector, useDispatch} from 'react-redux'
import { incrementFactor } from "./decisionsFactorsSlice"
import { addDecision, removeDecision } from "./decisionsSlice"
import { addFactor, removeFactor } from "./factorsSlice"

const App = () => {
  const dispatch = useDispatch()

  const {list: decisions} = useSelector(state => state.decisions)
  const {list: factors} = useSelector(state => state.factors)
  const {matrix: decisionsFactors} = useSelector(state => state.decisionsFactors)

  return <div>
    <Global styles={css`
      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
          'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
          sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
          monospace;
      }
    `} />

    <h1>Decision Matrix</h1>

    <table>
      <thead>
        <tr>
          <th>Factors</th>
          {decisions.map((decision, index) => <th key={index}>{decision} {decisions.length > 1 && <span onClick={() => dispatch(removeDecision(index))}>X</span>}</th>)}
          <th onClick={() => dispatch(addDecision('new decision'))}>Add decision</th>
        </tr>
      </thead>

      <tbody>
        {factors.map((factor, factorIndex) => <tr key={factorIndex}>
          <td>{factor} {factors.length > 1 && <span onClick={() => dispatch(removeFactor(factorIndex))}>X</span>}</td>
          {decisionsFactors[factorIndex].map((decisionFactor, decisionIndex) => <td key={decisionIndex} onClick={() => dispatch(incrementFactor({factor: factorIndex, decision: decisionIndex}))}>{decisionFactor}</td>)}
        </tr>)}
        <tr>
          <td onClick={() => dispatch(addFactor('new factor'))}>Add factor</td>
        </tr>
      </tbody>
    </table>
  </div>
}

export default App
