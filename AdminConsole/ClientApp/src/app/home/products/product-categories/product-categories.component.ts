import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { GridModel } from 'src/app/models/grid.model';
import { TreeView, FlatNode } from 'src/app/models/tree.mode';
import { Input as InputModel } from 'src/app/models/input.model';
import { SelectionModel } from '@angular/cdk/collections';
import { environment } from 'src/environments/environment';
import { HttputilityService } from '../../../services/httputility.service';
import { HelperService } from '../../../services/helper.service';
import { AppconstantsService } from '../../../services/appconstants.service';


@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss']
})


export class ProductCategoriesComponent implements OnInit {

  @ViewChild('fileToUpload', { static: true }) fileUploaded?: ElementRef<HTMLElement>;

  onload: boolean = true;
  CategoryImage: any;
  showAddView: boolean = false;
  categoryData: any = {};
  categoryTreeView: any[] = [];
  imageUrl: any = [];

  @Input() set showActionButtons(val) {
    this.tableData.tableToolbar = val;
  };

  @Input() showTreeView: boolean = true;

  _selectedCategory: any;

  /* Checks all the parents when a leaf node is selected/unselected */
  expandAllParentsSelection(node: FlatNode): void {
    let parent: FlatNode | null = this.getParentNode(node);
    while (parent) {
      this.treeControl.expand(parent);
      parent = this.getParentNode(parent);
    }
    this.treeControl.expand(parent);
  }

  selectDefaultIdRequired() {
    if (this.onload && this._selectedCategory) {
      var ar = this._selectedCategory;
      for (let i = 0; i < this.treeControl.dataNodes.length; i++) {
        const nodedata = this.flatNodeMap.get(this.treeControl.dataNodes[i]);
        if (ar.indexOf(nodedata.id) != -1) {
          this.checklistSelection.toggle(this.treeControl.dataNodes[i]);
          this.expandAllParentsSelection(this.treeControl.dataNodes[i]);
        }
      }
    }
    this.onload = false;
  }

  _multiSelect = false;
  @Input() set multiSelect(val: boolean) {
    this.checklistSelection = new SelectionModel<FlatNode>(val);
    this._multiSelect = val;
  };

  get multiSelect() {
    return this._multiSelect;
  };
  @Input() selectedCatName = "";

  @Input() set selectedCategory(id) {
    this._selectedCategory = id;
  };

  get selectedCategory() {
    return this._selectedCategory;
  }

  @Output() selectedCategoryChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectedCatNameChange: EventEmitter<string> = new EventEmitter<string>();

  removeCatValue(catId) {
    if (this.multiSelect) {
      var i = this.selectedCategory.indexOf(catId);
      this.selectedCategory.splice(i, 1);
    }
    this.selectedCategoryChange.emit(this.selectedCategory);
  }

  changeCatValue(catId, name) {
    if (this.multiSelect) {
      this.selectedCategory.push(catId);
    }
    else {
      this.selectedCategory = catId;
    }
    this.selectedCatName = name;
    this.selectedCategoryChange.emit(this.selectedCategory);
    this.selectedCatNameChange.emit(this.selectedCatName);
  }

  @Output("onRowClick") onRowClick: EventEmitter<any> = new EventEmitter();

  tableData: GridModel = {
    EnableSearch: false,
    tableHeader: 'Products',
    columns: [] = [
      {
        name: '',
        type: 'checkbox',
        id: 'checkbox',
      },
      {
        name: '',
        type: 'button',
        id: 'subCatExist',
        iconClass: 'chevron_right',
        compareVal: 'false',
        activeClass: 'd-none',
        usedefaultIcon: false
      },
      {
        name: 'Category Name',
        type: 'string',
        id: 'CategoryName',
        showSubRowIcon: true
      },
      {
        name: 'Description',
        type: 'string',
        id: 'Description'
      }
    ],
    data: [] = [],
    currentPageSize: 20,
    totalRows: 0,
    sortCol: '',
    sortOrder: 1,
    tableToolbar: true,
    enablePagination: false
  }
  catInputDetails1: InputModel[] = [
  ]

  initFieldS() {
    this.catInputDetails1 = [
      {
        fieldId: "CategoryName",
        label: "Name",
        fieldValue: "",
        type: "text",
        isValid: true,
        errorMesg: "Please enter category name",
        styleClass: "",
        required: true
      },
      {
        fieldId: "Description",
        label: "Description",
        fieldValue: "",
        type: "text",
        isValid: true,
        errorMesg: "",
        styleClass: "",
        required: false
      },
    ]
  }

  constructor(private http: HttputilityService, private helper: HelperService) {

    this.getCategoryDetails();

    this.initFieldS();
  }

  UploadImageClicked() {
    let el: HTMLElement = this.fileUploaded.nativeElement;
    el.click();
  }

  imageFileSelected(event: any, from: any) {
    var file = event.target.files;
    var j = 0;
    for (var i = 0; i < file.length; i++) {
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        if (fileReader.result) {
          console.log(fileReader);
          this.imageUrl.push({
            Name: file[j].name,
            Path: "",
            Value: fileReader.result.toString(),
          });
        }
      }
      fileReader.readAsDataURL(file[i]);
    }
  }

  removeSubCategoryToTable(Id: any, index: number) {
    for (var i = index; i < this.tableData.data.length; i++) {
      if (Id == this.tableData.data[i].ParentId) {
        this.tableData.data.splice(i, 1);
        i--;
      }
    }
    this.tableData.data[index].subCatExist = "chevron_right";
  }

  onMouseOut(node: any) {
    setTimeout(() => { node.show = false; }, 100);
  }

  onMouseHover(node: any) {
    node.show = true;
  }

  addNewCategoryPressed(node: any) {
    node.newChildVal = '';
    this.treeControl.expand(node);
    node.showInput = true;
  }

  CancelCategoryAdd(node: any) {
    node.showInput = false;
  }

  SaveCategoryName(node: any) {
    if (node && node.newChildVal) {
      const parentNode = this.flatNodeMap.get(node);
      var json = {
        CategoryName: node.newChildVal,
        ParentId: parentNode.id,
        Images: this.imageUrl
      };
      this.http.post(AppconstantsService.ProductAPIs.categoryApi, json).then((data) => {
        if (data.isSucess) {
          this.getCategoryDetails();
        }
        else {
          this.helper.showErrorTostMessage(data.message ? data.message : "Failed adding new category");
        }
      }, (error) => {
        this.helper.showErrorTostMessage("Failed adding new category");
      });
    }
  }

  addSubCategoryToTable(Id: any, index: number) {
    this.tableData.data[index].subCatExist = "expand_more";
    for (var i = 0; i < this.categoryData.SubCategories.length; i++) {
      if (Id == this.categoryData.SubCategories[i].Id) {
        var subCat = {
          BrachCode: this.categoryData.SubCategories[i].BranchCode,
          CategoryDesc: this.categoryData.SubCategories[i].Description,
          Id: this.categoryData.SubCategories[i].Id,
          CategoryName: this.categoryData.SubCategories[i].CategoryName,
          Vatrate: this.categoryData.SubCategories[i].Vatrate,
          prodCount: this.categoryData.SubCategories[i].prodCount,
          subCatExist: this.categoryData.SubCategories[i].subCatExist,
          subProdCount: this.categoryData.SubCategories[i].subProdCount,
          ParentId: Id,
          childRow: true
        }
        this.tableData.data.splice(index + 1, 0, subCat);
      }
    }
  }

  unflatten(arr: any[], cat: any[]) {
    var tree: any[] = [];
    var mappedArr: any = {};
    var arrElem;
    var mappedElem;
    for (var i = 0, len = arr.length; i < len; i++) {
      arrElem = arr[i];
      mappedArr[arrElem.id] = arrElem;
      mappedArr[arrElem.id]['children'] = [];
    }

    for (var id in mappedArr) {
      if (mappedArr.hasOwnProperty(id)) {
        mappedElem = mappedArr[id];
        if (mappedElem.parentId) {
          if (!mappedArr[mappedElem.parentId]) {
            mappedArr[mappedElem.parentId] = {};
            mappedArr[mappedElem.parentId]['children'] = [];
          }
          mappedArr[mappedElem.parentId]['children'].push(mappedElem);
        }
      }
    }
    cat.forEach(element => {
      tree.push(mappedArr[element.id])
    });
    return tree;
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

  GenerateTreeView(data: any) {
    let tree: any[] = [];
    let parentNodes = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i].ParentId) {
        tree.push({
          name: data[i].CategoryName,
          children: [],
          parentId: data[i].ParentId,
          id: data[i].Id,
          selected: true
        });
      }
      else {
        tree.push({
          name: data[i].CategoryName,
          children: [],
          parentId: "",
          id: data[i].Id
        });
        parentNodes.push({
          name: data[i].CategoryName,
          children: [],
          parentId: "",
          id: data[i].Id
        });
      }
    }
    this.categoryTreeView = this.unflatten(tree, parentNodes)
    this.dataSource.data = this.categoryTreeView;
    this.selectDefaultIdRequired();
  }


  hasChild = (_: number, node: FlatNode) => node.expandable;

  getCategoryDetails() {
    if (HelperService.CategoryList.length > 0) {
      setTimeout(() => {
        this.categoryData = HelperService.CategoryList;
        this.tableData.data = HelperService.CategoryList;
        this.GenerateTreeView(HelperService.CategoryList);
      }, 1000);
    }
    else {
      this.http.get(AppconstantsService.ProductAPIs.categoryApi).then((data) => {
        if (data) {
          this.categoryData = data.rows;
          this.tableData.data = data.rows;
          this.GenerateTreeView(data.rows);
        }
      },
        (error) => {
        })
    }
  }

  GetParentNodeRecusively(treeView: any[], id: string): any {
    for (var i = 0; i < treeView.length; i++) {
      if (treeView[i].id == id) {
        return treeView[i];
      }
      else if (treeView[i].children && treeView[i].children.length > 0) {
        var retVal = this.GetParentNodeRecusively(treeView[i].children, id);
        if (retVal) {
          return retVal;
        }
      }
    }
  }

  ngOnInit(): void {
  }

  deleteCategoryClicked(row: any[]) {
    var subCategoryJson: any[] = [];
    var categoryJson: any[] = [];
    if (row && row.length > 0) {
      for (var i = 0; i < row.length; i++) {
        if (row[i].ParentId) {
          subCategoryJson.push(row[i].Id);
        }
        else {
          categoryJson.push(row[i].Id);
        }
      }

      // if(row.item)
      // json.push(row)
    }
    this.http.post(AppconstantsService.ProductAPIs.categoryApi, subCategoryJson).then((data) => {
      if (data == 'success') {
        this.getCategoryDetails();
      }
    });
    console.log(row);

  }

  addCategoryClick(e: any) {
    this.showAddView = true;
  }

  onAnyAction(e: any) {
    console.log(e);
    switch (e.action) {
      case "click":
        var Id = e.row.Id;
        if (e.columnHeader.id == "subCatExist") {
          if (e.row.subCatExist == "chevron_right") {
            this.addSubCategoryToTable(Id, e.index);
          }
          else {
            this.removeSubCategoryToTable(Id, e.index);
          }
        }
        break;
      case "edit":
        break;
      case 'rowSelected':
        if (this.onRowClick) {
          this.onRowClick.emit(e);
        }
        break;
    }
  }

  getLevel = (node: FlatNode) => node.level;
  checklistSelection = new SelectionModel<FlatNode>(this.multiSelect);
  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: FlatNode): void {
    this.onload = false;
    this.checklistSelection.toggle(node);
    var selected = this.checklistSelection.isSelected(node);
    if (selected) {
      const nodedata = this.flatNodeMap.get(node);
      this.changeCatValue(nodedata.id, nodedata.name);
    }
    else {
      if (this.multiSelect) {
        const nodedata = this.flatNodeMap.get(node);
        this.removeCatValue(nodedata.id)
      }
      else {
        this.changeCatValue("", "");
      }
    }
    this.checkAllParentsSelection(node);
  }



  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: FlatNode): void {
    let parent: FlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
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

  /* Get the parent node of a node */
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

  SaveCategoryDetails() {
    if (this.helper.isFormValid(this.catInputDetails1)) {
      var json = {};
      this.helper.getDataJsonMapped(this.catInputDetails1, json);
      //this.helper.getDataJsonMapped(this.catInputDetails2,json);
      //if(this.CategoryImage){
      //  this.uploadFile(this.CategoryImage);
      //}
      this.http.post(AppconstantsService.ProductAPIs.categoryApi, json).then((data) => {
        if (data.isSucess) {
          this.getCategoryDetails();
          this.showAddView = false;
          this.initFieldS();
        }
      });
    }
  }

  uploadFile(fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('Image', fileToUpload, fileToUpload.name);
    //this.http.uploadFileWithProgress("post", environment.imageUploadServerAddr, formData).subscribe((data)=>{
    //   console.log(data);
    //},
    //(error)=>{
    //   console.log(error);
    //});
  }

  onFileUploaded(event: any) {
    var file = event.target.files;
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (fileReader.result) {
      }
    }
    fileReader.readAsDataURL(file[0]);
    this.CategoryImage = file[0];
  }

}
