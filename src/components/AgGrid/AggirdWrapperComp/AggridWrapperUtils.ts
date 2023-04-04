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
      getGridViewsData: () => Promise<any>,
      createGridViewsData: (params : any) => boolean,
      updateGridViewsData:(params : any) => boolean,
      deleteGridViewsData: (params : any) => boolean,
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