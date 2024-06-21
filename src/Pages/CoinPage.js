import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { SingleCoin } from '../config/api';
import CoinInfo from '../Components/CoinInfo';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { LinearProgress, Typography } from '@mui/material';
import ReactHtmlParser from 'react-html-parser';
import { numberWithCommas } from '../Components/Banner/Carousel';

const CoinPage = () => {

  const theme = useTheme();

  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const isXsDown = useMediaQuery(theme.breakpoints.down('xs'));

  const { id } = useParams();
  
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  }

  console.log(coin);

  useEffect(() => {
    fetchCoin();
  }, [])

  if (!coin) return ( <LinearProgress style={{backgroundColor: "gold"}} /> );

  return (
    <div style={{display: "flex", flexDirection: isMdDown ? 'column' : 'row', alignItems: isMdDown ? 'center' : 'flex-start'}}>
      <div style={{width: isMdDown ? "100%" : "30%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: 25, borderRight: "2px solid grey" }}>
        <img src={coin?.image.large} alt={coin?.name} height="200" style={{marginBottom: 20}} />
        <Typography variant='h3' style={{fontWeight: "bold", marginBottom: 20, fontFamily: "Montserrat"}} >{coin?.name}</Typography>
        <Typography variant='subtitle1' style={{width: "100%", fontFamily: "Montserrat", padding: 25, paddingBottom: 15, paddingTop: 0, textAlign: "justify"}} >{ReactHtmlParser(coin?.description.en.split(". ")[0])}.</Typography>
        <div style={{alignSelf: "start", padding: 25, paddingTop: 10, width: "100%", display: isMdDown ? 'flex' : 'block', justifyContent: isMdDown ? 'space-around' : 'initial', flexDirection: isSmDown ? 'column' : 'row', alignItems: isXsDown ? 'start' : isSmDown ? 'center' : 'initial',}}>
          <span style={{display: "flex"}}>
            <Typography variant='h5' >Rank: </Typography>
            &nbsp; &nbsp;
            <Typography variant='h5' style={{fontFamily: "Montserrat"}}>{coin?.market_cap_rank}</Typography>
          </span>
          <span style={{display: "flex"}}>
            <Typography variant='h5' >Current Price: </Typography>
            &nbsp; &nbsp;
            <Typography variant='h5' style={{fontFamily: "Montserrat"}}>{symbol} {" "} {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}</Typography>
          </span>
          <span style={{display: "flex"}}>
            <Typography variant='h5' >Market Cap: </Typography>
            &nbsp; &nbsp;
            <Typography variant='h5' style={{fontFamily: "Montserrat"}}>{symbol} {" "} {numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6))}M</Typography>
          </span>
        </div>
      </div>

      {/* chart */}
      <CoinInfo coin={coin} />
    </div>
  )
}

export default CoinPage