import { styled } from "@mui/material";

export const Main = styled("main")`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 54px);
  margin-top: 56px;
  @media screen and (min-width: 600px) {
    margin-top: 64px;
  }
`;
