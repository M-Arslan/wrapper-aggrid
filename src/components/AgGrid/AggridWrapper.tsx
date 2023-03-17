import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from "ag-grid-community";
import { ClaimLandingContainer,ClaimLandingHeader, ClaimLandingToolbar, Toolbuttons,Title ,HeaderSwitchToolbar, GridContainer} from '../Styles/Styles';
import { IconButton, Switch, FormControl, FormGroup, FormControlLabel } from '@mui/material';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS


interface AggridWrapperProps {
    columnDefs: any[];
    rowData:  any[];
    dashboardName: string
}

function AggridWrapper(props:AggridWrapperProps)  {
  const {columnDefs,rowData,dashboardName} = props;
  const [open, setOpen] = useState(false);

  const defaultColDef: ColDef = {
    cellClass: "cell-wrap-text",
    cellStyle: { whiteSpace: "normal" },
    sortable: true,
    resizable: true,
    floatingFilter: true
  };

  const handleDrawerOpen = () => {
        setOpen(true);
  }

  const handleDrawerClose = () => {
    setOpen(false);
}


  return (
    <ClaimLandingContainer>
      <ClaimLandingToolbar>
          <Toolbuttons>
                  <IconButton name="new" title="New Claim" >
                     
                  </IconButton>
          </Toolbuttons>
          <Title>{dashboardName}</Title>
          <HeaderSwitchToolbar>
              <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
              >  
                  
              </IconButton>
          </HeaderSwitchToolbar>
      </ClaimLandingToolbar>
      <ClaimLandingHeader>
          <GridContainer className="ag-theme-alpine">
              <AgGridReact
                  defaultColDef={defaultColDef}
                  columnDefs={columnDefs}
                  rowData={rowData}
                  pagination={true}
                  paginationPageSize={50}
              >
              </AgGridReact>
              </GridContainer>

      </ClaimLandingHeader>
  </ClaimLandingContainer >
  
  );
}

export default AggridWrapper