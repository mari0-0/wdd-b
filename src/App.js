import React, { useRef } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import { Grid } from "@mui/material";
import Code from "./components/Code";
import { DataSQL } from "./dataSQL";
import { useState } from "react";
import LiveSearch from "./components/LiveSearch";
import Header from "./components/Header";
import ButtonGrp from "./components/ButtonGrp";
import PasswordWall from "./components/PasswordWall";

const darkTheme = createTheme({
  palette: { primary: { main: grey[50] }, secondary: { main: grey[900] } },
});

export default function App() {
  const password = useRef();
  const [isEntered, setIsEntered] = useState({ main: false, input: true });
  const [type, setType] = useState("all");
  const [searchValue, setSearchValue] = useState(null);
  let Data = DataSQL;

  function handleType(text) {
    setType(() => text);
  }

  if (searchValue) {
    Data = [searchValue];
  }

  function handlePassword() {
    const pass = password.current.value;
    if (pass === "999") {
      setIsEntered({ main: true, input: true });
    } else {
      setIsEntered({ main: false, input: false });
    }
  }

  if (!isEntered.main) {
    return (
      <ThemeProvider theme={darkTheme}>
        <PasswordWall isEntered={isEntered} handlePassword={handlePassword} ref={password}/>
      </ThemeProvider>
    );
  } else {
    return (
      <>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Header />
          <LiveSearch setValue={setSearchValue} Data={Data} />
          <ButtonGrp handleType={handleType} />
        </ThemeProvider>
        {searchValue ? (
          <Grid container spacing={2} sx={{ alignItems: "stretch" }}>
            {Data.map((item, index) => {
              return (
                <Grid
                  key={index}
                  item
                  md={12}
                  lg={6}
                  sx={{ maxWidth: "100%", margin: "auto", height: "100%" }}
                >
                  <Code title={item.title} code={item.code} />
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Grid container spacing={2} style={{ alignItems: "stretch" }}>
            {Data.map((item, index) => {
              if (type === "all")
                return (
                  <Grid
                    key={index}
                    item
                    md={12}
                    lg={6}
                    sx={{ maxWidth: "100%", margin: "auto" }}
                  >
                    <Code title={item.title} code={item.code} />
                  </Grid>
                );

              if (type === item.unit || type === item.cycle)
                return (
                  <Grid
                    item
                    md={12}
                    lg={6}
                    sx={{ maxWidth: "100%", margin: "auto" }}
                  >
                    <Code title={item.title} code={item.code} />
                  </Grid>
                );
              return null;
            })}
          </Grid>
        )}
      </>
    );
  }
}
