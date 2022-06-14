export class TreeView{
    name: string = "";
    children?: TreeView[];
    id:string= '';
    parentId:string= '';
}


export class FlatNode {
    expandable: boolean = false;
    name: string = "";
    level: number = 0;
    
}