import { useState } from 'react'
import {css, Global} from '@emotion/react'
import styled from '@emotion/styled'

import {useSelector, useDispatch} from 'react-redux'
import {incrementFactor} from './factorsChoicesSlice'
import {addChoice, removeChoice} from './choicesSlice'
import {addFactor, removeFactor} from './factorsSlice'

const App = () => {
  const dispatch = useDispatch()

  const {list: choices} = useSelector(state => state.choices)
  const {list: factors} = useSelector(state => state.factors)
  const {matrix: factorsChoices} = useSelector(state => state.factorsChoices)

  const [newChoice, setNewChoice] = useState('')
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
            {choices.map((choice, index) => <th key={index}>{choice} {choices.length > 1 && <Remove onClick={() => dispatch(removeChoice(index))} />}</th>)}
            <th><StyledInput value={newChoice} onChange={(event) => setNewChoice(event.target.value)} placeholder="Add choice" /><Add onClick={() => {
              if(newChoice.length > 0) {
                dispatch(addChoice(newChoice))
                setNewChoice('')
              }
            }}/></th>
          </tr>
        </thead>

        <tbody>
          {factors.map((factor, factorIndex) => <tr key={factorIndex}>
            <td>{factor} {factors.length > 1 && <Remove onClick={() => dispatch(removeFactor(factorIndex))} />}</td>
            {factorsChoices[factorIndex].map((choiceFactor, choiceIndex) => <td key={choiceIndex} onClick={() => dispatch(incrementFactor({factor: factorIndex, choice: choiceIndex}))}>{choiceFactor}</td>)}
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
          {choices.map((choice, index) => <tr key={index}>
            <th>{choice}</th>
            <td>{factorsChoices.reduce((sum, factor) => sum += factor[index], 0)}</td>
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
    user-select: none;

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