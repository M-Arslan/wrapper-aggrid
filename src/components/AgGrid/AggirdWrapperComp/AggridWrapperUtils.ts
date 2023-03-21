export interface ColDefProp {
    field: string,
    type:string,
    filterParams?: any,
    width: Number
  }

  export interface AggridWrapperProps {
      columnDefs: ColDefProp[];
      dashboardName: string;
      apiURL: string;
  }
    
  export interface ColumnsDefinitions {
    id : any,
    name:string,
    field:string,
    filter:string|null,
    filterParams: any[]|null,
    width:any
  } 