import styled from '@emotion/styled'

const BarChart = ({totals, max}) => {
  return <Bar>
    {[...Array(max)].map((value, index) => {
      if(index < totals[0]) {
        return <Filled key={index}/>
      } else if(index < totals[1]) {
        return <Fuzzy key={index}/>
      } else {
        return <Empty key={index}/>
      }
    })}
  </Bar>
}

export default BarChart

const Bar = styled.div`
  display: flex;
  width: 2rem;
  height: 15rem;
  flex-direction: column-reverse;
`

const Filled = styled.div`
  background: #222;
  border-right: 1px solid white;
  flex: 1;
  height: 1rem;
`

const Fuzzy = styled.div`
  background: #999;
  border-right: 1px solid white;
  flex: 1;
  height: 1rem;
`

const Empty = styled.div`
  background: transparent;
  border-right: 1px solid white;
  flex: 1;
  height: 1rem;
`