import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { HistoricalChart } from '../config/api';
import { CircularProgress, ThemeProvider, createTheme } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Line } from 'react-chartjs-2';
import { CategoryScale, LinearScale, PointElement, LineElement, Chart } from 'chart.js';
import { chartDays } from '../config/data';
import SelectButton from './SelectButton';

const CoinInfo = ({ coin }) => {

    Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

    const [historicData, setHistoricData] = useState();
    const [days, setDays] = useState(1);

    const { currency } = CryptoState();

    const fetchHistoricData = async () => {
        const { data } = await axios.get(HistoricalChart(coin.id, days, currency));

        setHistoricData(data.prices);
    }

    console.log(historicData);

    useEffect(() => {
        fetchHistoricData();
    }, [currency, days])

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff"
            },
            mode: "dark"
        }
    });

  return (
    <ThemeProvider theme={darkTheme}>
        <div style={{width: isMdDown ? "100%" : "75%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: isMdDown ? 0 : 25, padding: isMdDown ? 20 : 40, paddingTop: isMdDown ? 0 : 40 }}>
            { !historicData ? 
            (<CircularProgress style={{color: "gold"}} size={250} thickness={1} />) 
            : 
            <>
                <Line data={{labels: historicData.map(coin => {
                    let date = new Date(coin[0]);
                    let time = date.getHours() > 12 
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;

                    return days === 1 ? time : date.toLocaleDateString()

                }),
                
                datasets: [{
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past  ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D"
                }]
                }}
                options={{elements: {point: {radius: 1}}}}
                />
                <div style={{display: "flex", marginTop: 20, justifyContent: "space-around", width: "100%"}}>
                    {chartDays.map((day) => (
                        <SelectButton key={day.value} onClick={() => setDays(day.value)} selected={day.value === days}>{day.label}</SelectButton>
                    ))}
                </div>
            </>
            }
        </div>
    </ThemeProvider>
  )
}

export default CoinInfo