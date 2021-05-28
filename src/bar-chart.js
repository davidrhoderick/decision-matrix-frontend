import styled from '@emotion/styled'

const BarChart = ({totals, max, colors}) => {
  return <Bar>
    {[...Array(max)].map((value, index) => {
      if(index < totals[0]) {
        return <Filled key={index} color={colors.body} />
      } else if(index < totals[1]) {
        return <Fuzzy key={index} color={colors.grey} />
      } else {
        return <Empty key={index} color={colors.bg} />
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
  background: ${({color}) => color};
  flex: 1;
  height: 1rem;
`

const Fuzzy = styled.div`
  background: ${({color}) => color};
  flex: 1;
  height: 1rem;
`

const Empty = styled.div`
  background: ${({color}) => color};
  flex: 1;
  height: 1rem;
`