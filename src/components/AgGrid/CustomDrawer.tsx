import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Drawer, IconButton, Divider } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import styled from "styled-components";
import Typography from "@mui/material/Typography";

const drawerWidth = 400;

const theme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: drawerWidth,
        },
      },
    },
  },
});
const ScrollPanel = styled.div`
  height: calc(100% - 38px);
  width: 100%;
  padding: 0 0 220px 0;
  margin: 0;
  border: 0;
  overflow-x: hidden;
  overflow-y: auto;
`;
const InputPanel = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-content: flex-start;
`;
const drawerStyle = {
  width: drawerWidth,
  flexShrink: 0,
  listStyle: "none",
  listStyleType: "none",
};
const drawerHeader = {
  display: "flex",
  alignItems: "center",
  padding: "0 1em",
  justifyContent: "flex-start",
  fontWeight: "bold",
  backgroundColor: "#bdc3c7",
};
interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
}
export const CustomDrawer: React.FC<Props> = ({ open, setOpen }) => {
 
    const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Drawer anchor="right" open={open} style={drawerStyle}>
        <div style={drawerHeader}>
          <IconButton name="arrowchevron_right" onClick={closeDrawer}>
            <ChevronLeft />
          </IconButton>
          <Typography>View Settings</Typography>
        </div>
        <ScrollPanel>
          <InputPanel>
            <h1>Custom Drawer</h1>
          </InputPanel>
        </ScrollPanel>
        <Divider />
      </Drawer>
    </ThemeProvider>
  );
};
