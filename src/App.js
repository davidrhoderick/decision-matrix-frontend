import {css, Global} from '@emotion/react'
import styled from '@emotion/styled'

import {useSelector, useDispatch} from 'react-redux'
import {incrementFactor} from './decisionsFactorsSlice'
import {addDecision, removeDecision} from './decisionsSlice'
import {addFactor, removeFactor} from './factorsSlice'

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

    <StyledTable>
      <thead>
        <tr>
          <th>Factors</th>
          {decisions.map((decision, index) => <th key={index}>{decision} {decisions.length > 1 && <Remove onClick={() => dispatch(removeDecision(index))} />}</th>)}
          <th onClick={() => dispatch(addDecision('new decision'))}>Add decision</th>
        </tr>
      </thead>

      <tbody>
        {factors.map((factor, factorIndex) => <tr key={factorIndex}>
          <td>{factor} {factors.length > 1 && <Remove onClick={() => dispatch(removeFactor(factorIndex))} />}</td>
          {decisionsFactors[factorIndex].map((decisionFactor, decisionIndex) => <td key={decisionIndex} onClick={() => dispatch(incrementFactor({factor: factorIndex, decision: decisionIndex}))}>{decisionFactor}</td>)}
        </tr>)}
        <tr>
          <td onClick={() => dispatch(addFactor('new factor'))}>Add factor</td>
        </tr>
      </tbody>
    </StyledTable>

    <StyledTable>
      <tbody>
        {decisions.map((decision, index) => <tr key={index}>
          <th>{decision}</th>
          <td>{decisionsFactors.reduce((sum, factor) => sum += factor[index], 0)}</td>
        </tr>)}
      </tbody>
    </StyledTable>
  </div>
}

export default App

const StyledTable = styled.table`
  th, td {
    padding: 0.5rem;
  }
`

const Remove = styled.button`
  outline: none;
  background: none;
  border: none;
  cursor: pointer;

  :after {
    content: '\\00D7';
    display: inline-block;
  }
`