export interface ColDefProp {
    field: string,
    type:string,
    filterParams?: any,
    width: Number
  }

  export interface AggridWrapperProps {
      columnDefs: ColDefProp[];
      dashboardName: string;
      getGridRowsData: (v:any,u:any) => Promise<any>,
      getGridViewsData: () => Promise<any>,
      createGridViewsData: (params : any) => boolean,
      updateGridViewsData:(params : any) => boolean,
      deleteGridViewsData: (params : any) => boolean,
      landingPage:string,
      views: boolean
  }
    
  export interface ColumnsDefinitions {
    id : any,
    name:string,
    field:string,
    filter:string|null,
    filterParams: any[]|null,
    width:any
  } 

  const ensureNonEmptyString = (value: any) => {
    return value && typeof value === 'string' && value.trim().length > 0
  }

  export const getSortedColumns = (columnApi:any) => {
    return columnApi?.getColumnState().filter((cs:any) => ensureNonEmptyString(cs.sort))
  }