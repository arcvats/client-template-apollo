import React from "react";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "./helpers/theme";
import apolloClient from "./helpers/apolloClient";

import RootContainer from "./components/layout/RootContainer";
import Routes from "./router/routes";

export default function Main() {
  return (
    <BrowserRouter>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RootContainer>
            <Routes />
          </RootContainer>
        </ThemeProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
}
