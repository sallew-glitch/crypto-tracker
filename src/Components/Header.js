import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { CryptoState } from "../CryptoContext";

const Header = () => {

  const navigate = useNavigate();

  const { currency, setCurrency } = CryptoState();

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
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography onClick={() => navigate('/')} variant="h6" component="div" sx={{ flex: 1, color: 'gold', fontFamily: 'Montserrat',  fontWeight: 'bold', cursor: 'pointer'}}>
            Crypto Tracker
          </Typography>
          <Select
            variant="outlined"
            style={{width: 100, height: 40}}
            value={currency}
            label="currency"
            onChange={(e) => setCurrency(e.target.value)}
          >
            <MenuItem value='USD'>USD</MenuItem>
            <MenuItem value='INR'>INR</MenuItem>
            <MenuItem value='PKR'>PKR</MenuItem>
          </Select>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
