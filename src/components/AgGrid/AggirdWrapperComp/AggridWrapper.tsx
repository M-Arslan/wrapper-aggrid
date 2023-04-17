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
import { AggridWrapperProps, ColumnsDefinitions, getSortedColumns } from './AggridWrapperUtils';
import { LicenseManager } from 'ag-grid-enterprise';
LicenseManager.setLicenseKey("CompanyName=General Reinsurance Corporation,LicensedGroup=G2 Application Development,LicenseType=MultipleApplications,LicensedConcurrentDeveloperCount=20,LicensedProductionInstancesCount=2,AssetReference=AG-030926,SupportServicesEnd=17_June_2024_[v2]_MTcxODU3ODgwMDAwMA==ac579ee70580ad049a67c3ceb2f0d75e");
let gridApi: any;
let columnApi: any;
var selectedView:any;

function AggridWrapper(props:AggridWrapperProps)  {
  
  const {
    columnDefs,
    dashboardName,
    getGridViewsData,
    updateGridViewsData,
    createGridViewsData,
    deleteGridViewsData,
    getGridRowsData,
    landingPage,
    views
  } = props;
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
      tempColDefObj.filter = x.type?.toLowerCase() === 'select' ? 'agSetColumnFilter': x.type?.toLowerCase() === 'text' ? 'agTextColumnFilter' : x.type?.toLowerCase() === 'date' ? 'agDateColumnFilter' : x.type?.toLowerCase() === 'number' ? 'agNumberColumnFilter' :  x.type;
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
    sortable:true
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
        let filterModel = gridApi.getFilterModel();
        let filterCount = Object.keys(filterModel).length;
        let sortCount = getSortedColumns(columnApi).length;
    
        let searchDataObj:any = {
          "pageNumber":params.request.endRow / 50,
          "pageSize":50,
        };

        // if(filterCount > 0 ) {
        //   for (let [key, value] of Object.entries(filterModel) as any){
            
        //     if(value !== undefined && value !== null) {

        //       if(value.filterType === 'set' && value.values.length > 0){
        //         searchDataObj[key] = value.values;
        //       }else if(value.filterType === 'text'){
        //         searchDataObj[key] = value.filter;
        //       }else if(value.filterType === 'date'){
        //         searchDataObj[key] = new Date(value.dateFrom).toISOString();
        //       }else if(value.filterType === 'number'){
        //         searchDataObj[key] = value.filter;
        //       } else return;
        //     }
        //   } 
        // }

        // if(sortCount > 0) {
        //   let sortedColumns = getSortedColumns(columnApi)[0];
        //   searchDataObj["orderBy"] = sortedColumns.colId + ' ' + sortedColumns.sort;
        // }

          getGridRowsData(searchDataObj,filterModel).then((data)=>{
            var totalRows = -1;
        
            if (data.length < 50) {
              totalRows = params.request.startRow + data.length;
            }
        
            params.successCallback(data, totalRows);           
          }).catch((error)=>{
            console.log(error);
          });

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
      return true;
    } 
    case 2: {
      //CreateView
      let flag = createGridViewsData(view);
      return flag; 
    } 
    case 3: {
      //UpdateViews
      if(typeof updateGridViewsData === 'function'){
        let flag = updateGridViewsData(view);
        return flag;
      }
    } 
    case 4: {
      if(typeof deleteGridViewsData === 'function'){
        let flag = deleteGridViewsData(view);
        return flag;
      }
    }
    default:
      return true
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
        <CustomAgGridViews getGridViewsData={getGridViewsData} reload={false} open={open} landingPage={landingPage} setOpen={setOpen} gridApi={gridApi} columnApi={columnApi} userGridViewFunction={userGridViewFunction}  />
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
          <GridContainer className="ag-theme-alpine" style={{width:'100%',height:'70vh'}}>
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




