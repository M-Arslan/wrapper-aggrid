import styled from "styled-components";

// Styles

export const drawerWidth = 400;

export const ErrorPanel = styled.div`
  padding:  10px;
`;

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

export const drawerStyle = {
  width: drawerWidth,
  flexShrink: 0,
  listStyle: "none",
  listStyleType: "none",
};

export const selectControlStyles = {
  width: "300px",
  margin: "0 auto",
};

export const headingStyles = { fontSize: "15px", flexBasis: "33.33%", flexShrink: 0 };

export const btnMarginStyles = {margin:"1em"};

// Types, Helper Functions && Interfaces
export interface Props {
  open: boolean;
  reload: boolean;
  landingPage?: string;
  setOpen: (v: boolean) => void;
  gridApi:any;
  columnApi:any;
  userGridViewFunction:(v:number,params:any)=>void;
  getGridViewsData: () => any[];
}

export interface ViewNameError {
  error:boolean;
  errorMessage:string;
}

export interface userViewDataObj {
  userGridViews: any[];
}

export const loadUserGridViews = async () => {
  const response = await fetch(
    "https://mocki.io/v1/5136124a-f937-4c49-bbc5-72db22b9b0f8"
  );
  const data = await response.json();
  return data;
};