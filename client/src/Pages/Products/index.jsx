import React, { useState } from 'react'
import Header from '../../components/Header'
import { Box, Button, Card, CardActions, CardContent, Collapse, Rating, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useGetProductsQuery } from '../../store/api'


const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat
})=>{

  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Card
    key={_id}
    sx = {{
      backgroundImage: "none",
      backgroundColor: theme.palette.background.alt,
      borderRadius: "0.55rem"
    }}
    >
      <CardContent>
        <Typography
        sx={{fontSize: 14}}
        color={theme.palette.secondary[700]}
        gutterBottom
        >
          {category}
        </Typography>
        <Typography variant='h5'>
    {name}
        </Typography>
        <Typography
        sx={{mb:"1.5rem"}}
        color={theme.palette.secondary[400]}
        >
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating  value={rating}  readOnly/>


      <Typography
      variant='body2'
      >
        {description}
      </Typography>
      <CardActions>
        <Button
        variant='primary'
        size='small'
        onClick = {()=> setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
      in={isExpanded}
      timeout= "auto"
      unmountOnExit
      sx={{
        color: theme.palette.neutral[300]
      }}
      >
        <CardContent>
          <Typography >id:{_id}</Typography>
          <Typography >supply Left:{supply}</Typography>
          <Typography >Yearly Sales this year:{stat.yearlySalesTotal}</Typography>
          <Typography >Yearly Units Sold this Year:{stat.yearlyTotalSoldUnits}</Typography>
        </CardContent>
      </Collapse>

      </CardContent>
    </Card>
  )

}

const Products = () => {

  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  
  return (
    <Box
      m="1.5rem 2.5rem"
    >

      <Header
        title="PRODUCTS"
        subtitle="See your list of products"
      />
      {data || !isLoading ?
      (<Box
      mt="20px"
      display="grid"
      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
      justifyContent="space-between"
      rowGap="20px"
      columnGap="1.33%"
      sx={{
        "& > div":{ gridColumn: isNonMobile ? undefined : "span 4"}
      }}
      >

      {
       data.map(({
        _id,
        name,
        description,
        price,
        rating,
        category,
        supply,
        stat
       })=>( <Product  key={_id} 
        _id={_id}
        name= {name}
        description = {description}
        price = {price}
        rating = {rating}
        category = {category}
        supply = {supply}
        stat = {stat}
        />))
       
    }   

      </Box>):
      
      <></>}


    </Box>

  )
}

export default Products