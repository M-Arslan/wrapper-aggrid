import React, { useState ,useMemo} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ColDefUtil } from "ag-grid-community";
import { ClaimLandingContainer,ClaimLandingHeader, ClaimLandingToolbar, Toolbuttons,Title ,HeaderSwitchToolbar, GridContainer} from '../Styles/Styles';
import { IconButton, Switch, FormControl, FormGroup, FormControlLabel } from '@mui/material';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import {Menu} from "@mui/icons-material"
import { CustomDrawer } from './CustomDrawer';

type ColDefProp = {
  field: string,
  type:string,
  filterParams?: any,
  width: Number
}
interface AggridWrapperProps {
    columnDefs: ColDefProp[];
    rowData:  any[];
    dashboardName: string
}


interface ColumnsDefinitions {
  id : any,
  name:string,
  field:string,
  filter:string|null,
  filterParams: any[]|null,
  width:any
} 

function AggridWrapper(props:AggridWrapperProps)  {
  
  const {columnDefs,rowData,dashboardName} = props;
  const [open, setOpen] = useState(false);
  const [colDefs,setColDefs] = useState<ColDef[]>([]);

  const handleDrawerOpen = () => {
        setOpen(true);
  }

  const handleDrawerClose = () => {
    setOpen(false);
  }

  const modifyColumnDefs = () => {
    const colDefArray:ColumnsDefinitions[] = columnDefs?.map((x) => {
      let tempColDefObj  = {} as ColumnsDefinitions;
      tempColDefObj.id = x?.field;
      tempColDefObj.field = x?.field;
      tempColDefObj.name = x?.field;
      tempColDefObj.filter = x.type.toLowerCase() === 'select' ? 'agSetColumnFilter': x.type;
      tempColDefObj.filterParams = x.filterParams ? x.filterParams : null;
      tempColDefObj.width = x.width ? x.width : 200;
      return tempColDefObj;
    });

    setColDefs(colDefArray);
}


 const defaultColDef = React.useMemo(() => {
  return {
    // set the default column width
    width: 150,
    // make every column editable
    editable: true,
    // make every column use 'text' filter by default
    filter: 'agTextColumnFilter',
    // enable floating filters by default
    floatingFilter: true,
    // make columns resizable
    resizable: true,
    };
  }, []);


  const columnTypes = useMemo(() => {
    return {
      text: { width: 130, filter: 'agNumberColumnFilter' },
      select: { width: 130, filter: 'agSetColumnFilter' },
      number: { width: 130, filter: 'agNumberColumnFilter' },
      nonEditableColumn: { editable: false },
      date: {
        // specify we want to use the date filter
        filter: 'agDateColumnFilter',
        // add extra parameters for the date filter
        filterParams: {
          // provide comparator function
          comparator: (filterLocalDateAtMidnight : any, cellValue:any) => {
            // In the example application, dates are stored as dd/mm/yyyy
            // We create a Date object for comparison against the filter date
            const dateParts = cellValue.split('/');
            const day = Number(dateParts[0]);
            const month = Number(dateParts[1]) - 1;
            const year = Number(dateParts[2]);
            const cellDate = new Date(year, month, day);
            // Now that both parameters are Date objects, we can compare
            if (cellDate < filterLocalDateAtMidnight) {
              return -1;
            } else if (cellDate > filterLocalDateAtMidnight) {
              return 1;
            } else {
              return 0;
            }
          },
        },
      },
    };
  }, []);

 React.useEffect(() => {
    if(columnDefs) {
     modifyColumnDefs();
    }

 },[columnDefs]);


  return (
    <ClaimLandingContainer>
        <CustomDrawer open={open} setOpen={setOpen} />
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
                  <Menu />
              </IconButton>
          </HeaderSwitchToolbar>
      </ClaimLandingToolbar>
      <ClaimLandingHeader>
          <GridContainer className="ag-theme-alpine" style={{width:'1200px',height:'500px'}}>
              <AgGridReact
                  defaultColDef={defaultColDef}
                  columnDefs={colDefs}
                  rowData={rowData}
                  pagination={true}
                  paginationPageSize={50}
                  columnTypes={columnTypes}
              >
              </AgGridReact>
              </GridContainer>

      </ClaimLandingHeader>
  </ClaimLandingContainer >
  
  );
}

export default AggridWrapper