import React from "react";
import { Container } from "@mui/material";

export default function RootContainer({ children }) {
  return <Container maxWidth={false}>{children}</Container>;
}
