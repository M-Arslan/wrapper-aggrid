import React, { useState ,useMemo} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ColDefUtil } from "ag-grid-community";
import { ClaimLandingContainer,ClaimLandingHeader, ClaimLandingToolbar, Toolbuttons,Title ,HeaderSwitchToolbar, GridContainer} from '../../Styles/Styles';
import { IconButton, Switch, FormControl, FormGroup, FormControlLabel } from '@mui/material';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import {Menu} from "@mui/icons-material"
import { CustomAgGridViews } from '../Views/CustomAgGridViews';
import { AggridWrapperProps, ColumnsDefinitions } from './AggridWrapperUtils';
import { loadUserGridViews } from '../Views/CustomAgGridViewsUtils';

let gridApi: any;
let columnApi: any;
var selectedView:any;

function AggridWrapper(props:AggridWrapperProps)  {
  
  const {
    columnDefs,
    dashboardName,
    apiURL,
    getGridViewsData,
    updateGridViewsData,
    createGridViewsData,
    deleteGridViewsData,
    views
  } = props;
  const [open, setOpen] = useState(false);
  const [colDefs,setColDefs] = useState<ColDef[]>([]);
  const [rowData, setRowData] = useState([]);

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
      tempColDefObj.filter = x.type?.toLowerCase() === 'select' ? 'agSetColumnFilter': x.type;
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

 function ServerSideDatasource() {
    return {
      getRows: async function (params:any) {
        debugger;
      let searchDataObj = {
        page:1,
        pageSize:20
      }
      const data = await getGridViewsData(searchDataObj);
      var totalRows = -1;
      if (data.length < 50) {
        totalRows = params.request.startRow + data.length;
      }
      params.successCallback(data, totalRows);

    }
  }
}

 const userGridViewFunction = (actionType: number,view:any) => { 
  
   switch(actionType){
    case 1:{
      // loadGridData
      selectedView = view;
      setGridFilters();
      var datasource = ServerSideDatasource();
      gridApi.setServerSideDatasource(datasource);
      return;
    } 
    case 2: {
      //CreateView
      createGridViewsData(view);
      return; 
    } 
    case 3: {
      //UpdateViews
      if(typeof updateGridViewsData === 'function')
        updateGridViewsData(view);
      return;
    } 
    case 4: {
      if(typeof deleteGridViewsData === 'function')
        deleteGridViewsData(view);
      return;
    }
  }
 
   


 }

 const setGridFilters = () => {
  if (selectedView !== null && selectedView !== undefined) {
    try {
      columnApi.applyColumnState({
        state: JSON.parse(selectedView.columnData),

        defaultState: { sort: null },
      });

      gridApi.setFilterModel(JSON.parse(selectedView.filterData));
    } catch (ex) {
      console.log(ex);
    }
  }
}

 const onGridReady = (params:any) => {
  gridApi=params.api;
  columnApi=params.columnApi;
}

  return (
    <ClaimLandingContainer>
        <CustomAgGridViews reload={false} open={open} setOpen={setOpen} gridApi={gridApi} columnApi={columnApi} userGridViewFunction={userGridViewFunction}  />
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
                  onGridReady={onGridReady}
                  defaultColDef={defaultColDef}
                  columnDefs={colDefs}
                  pagination={true}
                  paginationPageSize={50}
                  columnTypes={columnTypes}
                  rowModelType={"serverSide"}
                  serverSideStoreType={"partial"}
                  cacheBlockSize={50}
              >
              </AgGridReact>
              </GridContainer>

      </ClaimLandingHeader>
  </ClaimLandingContainer >
  
  );
}

export default AggridWrapper;