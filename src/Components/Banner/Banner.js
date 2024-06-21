import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import Carousel from './Carousel'

const Banner = () => {
  return (
    <Box sx={{backgroundImage: "url(./banner2.jpg)"}}>
      <Container sx={{height: 400, display: "flex", flexDirection: "column", paddingTop: 5, justifyContent: "space-around"}}>
        <Box sx={{display: "flex", height: "40%", flexDirection: "column", justifyContent: "center", textAlign: "center"}}>
          <Typography variant='h2' style={{fontWeight: "bold", marginBottom: 15, fontFamily: "Montserrat"}}>
            Crypto Tracker
          </Typography>
          <Typography variant='subtitle2' style={{color: "darkgrey", textTransform: "capitalize", fontFamily: "Montserrat"}}>
            Get all info regarding your favorite Crypto Currencies
          </Typography>
        </Box>
        <Carousel />
      </Container>
    </Box>
  )
}

export default Banner