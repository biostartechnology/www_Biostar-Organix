export class GridModel{
    tableHeader: string = '';
    columns: any[] = [];
    data: any[] = [];
    currentPageSize:number = 20;
    totalRows:number = 0;
    sortCol:string = '';
    sortOrder:number = 1;
    tableToolbar:boolean = true;
    EnableSearch: boolean = true;
    enablePagination: boolean = true;
}
