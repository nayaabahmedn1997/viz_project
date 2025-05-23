import { Box } from '@mui/material'
import React from 'react'
import Header from '../../components/Header'
import BreakdownChart from '../../components/BreakdownChart/BreakdownChart'

const Breakdown = () => {
  return (
    <Box m="1.5rem 2.5rem">
        <Header  title="BREAKDOWN" subtitle="Breakdown of sales by category" />
        <Box mt="40px" height="75vh" >
            <BreakdownChart />
        </Box>

    </Box>
  )
}

export default Breakdown