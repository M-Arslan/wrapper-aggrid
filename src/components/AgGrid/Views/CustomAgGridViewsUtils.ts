import styled from "styled-components";

export const drawerWidth = 400;

export const ScrollPanel = styled.div`
  height: calc(100% - 38px);
  width: 100%;
  padding: 0 0 220px 0;
  margin: 0;
  border: 0;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const InputPanel = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-content: flex-start;
`;

export const drawerHeader = {
  display: "flex",
  alignItems: "center",
  padding: "0 1em",
  justifyContent: "flex-start",
  fontWeight: "bold",
  backgroundColor: "#bdc3c7",
};

export interface Props {
  open: boolean;
  reload:boolean;
  landingPage?:string;
  setOpen: (v: boolean) => void;
  gridApi:any;
  columnApi:any;
  userGridViewFunction:(v:any)=>void;
}

export const drawerStyle = {
    width: drawerWidth,
    flexShrink: 0,
    listStyle: "none",
    listStyleType: "none",
};

export const loadUserGridViews = async () => {
    const response = await fetch("https://mocki.io/v1/4a36a458-b06f-4abd-b0c0-eb2d1c40b6d3");
    const data = await response.json();
    return data;
}

