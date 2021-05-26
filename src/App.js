import { useState } from 'react'
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

  const [newDecision, setNewDecision] = useState('')
  const [newFactor, setNewFactor] = useState('')

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

    <Title>Decision Matrix</Title>

    <div>
      <StyledTable>
        <thead>
          <tr>
            <th>Factors</th>
            {decisions.map((decision, index) => <th key={index}>{decision} {decisions.length > 1 && <Remove onClick={() => dispatch(removeDecision(index))} />}</th>)}
            <th><StyledInput value={newDecision} onChange={(event) => setNewDecision(event.target.value)} placeholder="Add decision" /><Add onClick={() => {
              if(newDecision.length > 0) {
                dispatch(addDecision(newDecision))
                setNewDecision('')
              }
            }}/></th>
          </tr>
        </thead>

        <tbody>
          {factors.map((factor, factorIndex) => <tr key={factorIndex}>
            <td>{factor} {factors.length > 1 && <Remove onClick={() => dispatch(removeFactor(factorIndex))} />}</td>
            {decisionsFactors[factorIndex].map((decisionFactor, decisionIndex) => <td key={decisionIndex} onClick={() => dispatch(incrementFactor({factor: factorIndex, decision: decisionIndex}))}>{decisionFactor}</td>)}
          </tr>)}
          <tr>
            <td><StyledInput value={newFactor} onChange={(event) => setNewFactor(event.target.value)} placeholder="Add factor" /><Add onClick={() => {
              if(newFactor.length > 0) {
                dispatch(addFactor(newFactor))
                setNewFactor('')
              }
            }}/></td>
          </tr>
        </tbody>
      </StyledTable>
    </div>
    
    <div>
      <StyledTable>
        <tbody>
          {decisions.map((decision, index) => <tr key={index}>
            <th>{decision}</th>
            <td>{decisionsFactors.reduce((sum, factor) => sum += factor[index], 0)}</td>
          </tr>)}
        </tbody>
      </StyledTable>
    </div>
  </div>
}

export default App

const Title = styled.h1`
  margin: 3rem 2rem 1rem;
`

const StyledTable = styled.table`
  margin: 1rem 2rem;
  border-collapse: collapse;

  th, td {
    padding: 1rem;

    text-align: center;

    border: 1px solid #222;

    &:first-of-type {
      text-align: left;
    }
  }

  td:not(:first-of-type) {
    cursor: pointer;
  }
`

const Add = styled.button`
  outline: none;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 2rem;
  vertical-align: sub;

  :after {
    content: '\\002B';
    display: inline-block;
  }
`

const Remove = styled.button`
  outline: none;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 2rem;
  vertical-align: sub;

  :after {
    content: '\\00D7';
    display: inline-block;
  }
`

const StyledInput = styled.input`
  outline: none;
  border: none;
  padding-bottom: 0.375rem;
  border-bottom: 1px solid #222;
`