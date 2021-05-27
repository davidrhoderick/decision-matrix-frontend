import { useEffect, useState } from 'react'
import {css, Global} from '@emotion/react'
import styled from '@emotion/styled'

import {useSelector, useDispatch} from 'react-redux'
import {incrementFactor} from './factorsChoicesSlice'
import {addChoice, removeChoice, changeChoice} from './choicesSlice'
import {addFactor, removeFactor, changeFactor} from './factorsSlice'

import BarChart from './bar-chart'

const App = () => {
  const dispatch = useDispatch()

  const {list: choices} = useSelector(state => state.choices)
  const {list: factors} = useSelector(state => state.factors)
  const {matrix: factorsChoices} = useSelector(state => state.factorsChoices)

  const [newChoice, setNewChoice] = useState('')
  const [newFactor, setNewFactor] = useState('')

  const calculateTotals = () => choices.map((choice, index) => factorsChoices.reduce((totals, factor) => {
    const min = totals[0]
    const max = totals[1]

    if(factor[index] < 0) {
      return [
        min,
        max + 3
      ]
    } else {
      return [
        min + factor[index],
        max + factor[index]
      ]
    }
  }, [0, 0]))

  const calculateMax = () => totals.reduce((max, totals) => totals[1] > max ? totals[1] : max, 0)
  const calculateLeaders = () => totals.map((totals, index) => totals[1] === max && index)

  const [totals, setTotals] = useState(calculateTotals(choices, factorsChoices))
  const [max, setMax] = useState(calculateMax(totals))
  const [leaders, setLeaders] = useState(calculateLeaders(totals))

  useEffect(() => {
    setTotals(calculateTotals())
  }, [choices, factorsChoices])

  useEffect(() => {
    setMax(calculateMax())
  }, [totals])

  useEffect(() => {
    setLeaders(calculateLeaders())
  }, [totals, max])

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

    <div style={{position: 'relative'}}>
      <AxisTitle axis={'x'}>Choices</AxisTitle>
      <AxisTitle axis={'y'}>Factors</AxisTitle>
      
      <StyledTable>
        <thead>
          <tr>
            <th></th>
            {choices.map((choice, index) => <th key={index}><StyledInput value={choice} onChange={event => dispatch(changeChoice({name: event.target.value, index}))} /> {choices.length > 1 && <Remove onClick={() => dispatch(removeChoice(index))} />}</th>)}
            <th><StyledInput value={newChoice} onChange={event => setNewChoice(event.target.value)} placeholder="Add choice" /><Add onClick={() => {
              if(newChoice.length > 0) {
                dispatch(addChoice(newChoice))
                setNewChoice('')
              }
            }}/></th>
          </tr>
        </thead>

        <tbody>
          {factors.map((factor, factorIndex) => <tr key={factorIndex}>
            <th><StyledInput value={factor} onChange={event => dispatch(changeFactor({name: event.target.value, index: factorIndex}))} /> {factors.length > 1 && <Remove onClick={() => dispatch(removeFactor(factorIndex))} />}</th>
            {factorsChoices[factorIndex].map((choiceFactor, choiceIndex) => <td key={choiceIndex} onClick={() => dispatch(incrementFactor({factor: factorIndex, choice: choiceIndex}))}>{choiceFactor < 0 ? '?' : choiceFactor}</td>)}
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
            <th>{choice} {leaders.includes(index) && `⭐`}</th>
            <td>{totals[index].reduce((string, total) => {
              if(string.length === 0) {
                return `${total}`
              } else {
                // eslint-disable-next-line eqeqeq
                if(string == total) {
                  return string
                } else {
                  return `${string}-${total}`
                }
              }
            }, '')}</td>
            <td style={{width: '100%'}}><BarChart totals={totals[index]} max={max} /></td>
          </tr>)}
        </tbody>
      </StyledTable>
    </div>
  </div>
}

export default App

const Title = styled.h1`
  margin: 3rem 2rem 2rem;
`

const AxisTitle = styled.h2`
  margin: 1rem 2rem;

  ${({axis}) => axis === 'y' ? `
    transform: rotate(-90deg) translateX(-50%);
    position: absolute;
    margin: 0;
  ` : `margin-left: 6rem;`}
`

const StyledTable = styled.table`
  margin: 1rem 2rem 1rem 4rem;
  border-collapse: collapse;

  th, td {
    padding: 1rem;
    text-align: center;
    border: 1px solid #222;
    user-select: none;
    white-space: nowrap;
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