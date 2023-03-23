export interface ColDefProp {
    field: string,
    type:string,
    filterParams?: any,
    width: Number
  }

  export interface AggridWrapperProps {
      columnDefs: ColDefProp[];
      dashboardName: string;
      getGridRowsData: () => Promise<any>,
      getGridViewsData: () => any[],
      createGridViewsData: (params : any) => any,
      updateGridViewsData:(params : any) => any,
      deleteGridViewsData: (params : any) => void,
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