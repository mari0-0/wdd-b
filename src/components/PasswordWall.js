import React from "react";
import { forwardRef } from "react";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { TextField, Button } from "@mui/material";

const PasswordWall = forwardRef(function MyInput(
  { isEntered, handlePassword },
  password
) {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
    >
      <Typography
        variant="h3"
        color="secondary"
        level="title-sm"
        fontWeight={700}
        fontFamily={"Syne"}
        align="center"
        marginBottom={5}
      >
        Enter Password
      </Typography>
      {isEntered.input ? (
        <TextField
          autoFocus
          id="outlined-basic"
          align="center"
          color="secondary"
          label="password"
          variant="outlined"
          sx={{ width: "20%" }}
          inputRef={password}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handlePassword();
            }
          }}
        />
      ) : (
        <TextField
          autoFocus
          error
          id="outlined-basic"
          align="center"
          color="secondary"
          label="password"
          variant="outlined"
          sx={{ width: "20%" }}
          inputRef={password}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handlePassword();
            }
          }}
        />
      )}
      <Button
        type="submit"
        onClick={handlePassword}
        sx={{ width: "20%", marginTop: "40px" }}
        size="lg"
        color="secondary"
        variant="outlined"
      >
        Enter
      </Button>
    </Grid>
  );
});

export default PasswordWall;
