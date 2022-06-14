import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatNode, TreeView } from 'src/app/models/tree.mode';

@Component({
  selector: 'app-treeview',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.scss']
})
export class TreeviewComponent implements OnInit {

  
  _treeData: any;
  get allowDay(): boolean {
      return this._treeData;
  }

  @Input() set TreeData(data:any){
    this._treeData = data;
    this.dataSource.data = this._treeData;
  }

  nestedNodeMap = new Map<TreeView, FlatNode>();
  flatNodeMap = new Map<FlatNode, TreeView>();
  
  private _transformer = (node: TreeView, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.name === node.name
        ? existingNode
        : new FlatNode()
    flatNode.name = node.name;
    flatNode.level = level;
    flatNode.expandable = !!node.children && node.children.length > 0;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: FlatNode) => node.expandable;

  constructor() { }

  ngOnInit(): void {
  }

  getLevel = (node: FlatNode) => node.level;
  checklistSelection = new SelectionModel<FlatNode>(false);
 
  todoLeafItemSelectionToggle(node: FlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }
  
  checkAllParentsSelection(node: FlatNode): void {
    let parent: FlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }
  
  checkRootNodeSelection(node: FlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child);
    });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  getParentNode(node: FlatNode): FlatNode | null {
    const currentLevel = this.getLevel(node);
    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  onMouseOut(node:any){
    setTimeout(()=>{node.show = false;},100);
  }

  onMouseHover(node:any){
    node.show = true;
  }
  
  addNewCategoryPressed(node:any){
    node.newChildVal ='';
    this.treeControl.expand(node);
    node.showInput = true;
  }

  CancelCategoryAdd(node:any){
    node.showInput = false;
  }
  
  SaveCategoryName(node:any){
    if(node && node.newChildVal){
      const parentNode = this.flatNodeMap.get(node);
      var json = {
        item_subCatName:node.newChildVal,
        CategoryId: parentNode.id
      };
    }
  }

}
