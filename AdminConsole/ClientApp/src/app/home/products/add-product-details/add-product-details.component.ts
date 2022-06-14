import { Component, ElementRef, HostListener, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TableConfig } from 'src/app/models/table.model';
import { Input as InputField} from 'src/app/models/input.model';
import { environment } from 'src/environments/environment';
import { HelperService } from '../../../services/helper.service';
import { HttputilityService } from '../../../services/httputility.service';
import { AppconstantsService } from '../../../services/appconstants.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpHeaders } from '@angular/common/http';
import { GridModel } from '../../../models/GridModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product-details',
  templateUrl: './add-product-details.component.html',
  styleUrls: ['./add-product-details.component.scss']
})
export class AddProductDetailsComponent implements OnInit {

  @ViewChild('fileToUpload', { static: true }) fileUploaded?: ElementRef<HTMLElement>;
  @ViewChild('fileToUpload1', { static: true }) fileUploaded1?: ElementRef<HTMLElement>;
  @ViewChild('fileToUpload2', { static: true }) fileUploaded2?: ElementRef<HTMLElement>;
  selectedImageIndex: number = -1;

  editId = "";
  @Input() set productData(data: any) {
    this.setProductData(data);
  }

  @Output("editDone") editDone: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttputilityService, private router: Router, private sanitizer: DomSanitizer, private modalService: NgbModal, private helper: HelperService, private elRef: ElementRef) {
    this.http.get(AppconstantsService.ProductAPIs.categoryApi).then((data) => {
      if (data) {
        this.categoryData = data.rows;
      }
    },
      (error) => {

      })
    this.setInputFields();
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  selectedCatId = '';
  selectedCatName = '';
  categoryData: [] = [];
  selectedIndex: number = 0;
  ImageList: any = [];
  VariantsList: any = [];
  variantFields: any = [];

  VariantTable: TableConfig = {
    EnableSearch: false,
    tableHeader: '',
    columns: [] = [
      {
        name: 'Option Name',
        type: 'string',
        id: 'Name'
      },
      {
        name: 'Type',
        type: 'string',
        id: 'Type'
      },
      {
        name: 'Values',
        type: 'string',
        id: 'Values',
      }
    ],
    data: [],
    currentPageSize: 20,
    tableToolbar: false,
    totalRows: 0,
    sortCol: '',
    sortOrder: 1
  };

  ProductVariantTable: TableConfig = {
    EnableSearch: false,
    tableHeader: 'Variants',
    columns: [] = [
      {
        name: 'Purchasable',
        type: 'checkbox',
        id: 'purchasable'
      },
      {
        name: 'Image',
        type: 'input',
        subType: 'file',
        id: 'Variant',
        editable: true
      },
      {
        name: 'Variant',
        type: 'string',
        subType: 'text',
        id: 'Values',
        editable: false
      },
      {
        name: 'SKU',
        type: 'input',
        subType: 'text',
        id: 'SKU',
        editable: true
      },
      {
        name: 'Default Price',
        type: 'input',
        subType: 'number',
        id: 'defaultPrice',
        editable: true
      },
      {
        name: 'Sale Price',
        type: 'input',
        subType: 'number',
        id: 'salePrice',
        editable: true
      },
      {
        name: 'MSRP',
        type: 'input',
        subType: 'text',
        id: 'msrp',
        editable: true
      },
      {
        name: 'Weight(KGS)',
        type: 'input',
        subType: 'number',
        id: 'weight',
        editable: true
      },
      {
        name: 'Width(Centimeters)',
        type: 'input',
        subType: 'number',
        id: 'width',
        editable: true
      },
      {
        name: 'Height(Centimeters)',
        type: 'input',
        subType: 'number',
        id: 'height',
        editable: true
      },
      {
        name: 'Depth(Centimeters)',
        type: 'input',
        subType: 'number',
        id: 'depth',
        editable: true
      },
      {
        name: 'Cost',
        type: 'input',
        subType: 'number',
        id: 'cost',
        editable: true
      },
      {
        name: ' UPC / EAN',
        type: 'input',
        subType: 'text',
        id: 'upc-ean',
        editable: true
      },
      {
        name: 'Bin Picking Number',
        type: 'input',
        subType: 'text',
        id: 'binPickingNumber',
        editable: true
      },
      {
        name: 'MPN',
        type: 'input',
        subType: 'text',
        id: 'mpn',
        editable: true
      }
    ],
    data: [],
    currentPageSize: 20,
    tableToolbar: false,
    totalRows: 0,
    sortCol: '',
    sortOrder: 1
  };

  VideoList: string[] = [];

  discountTireTableConfig: TableConfig = {
    EnableSearch: false,
    tableHeader: '',
    data: [],
    currentPageSize: 20,
    tableToolbar: false,
    totalRows: 0,
    sortCol: '',
    sortOrder: 1,
    columns: [
      {
        name: 'Min Quantity',
        type: 'input',
        subType: 'number',
        id: 'min_quantity',
        editable: true
      },
      {
        name: '',
        type: 'input',
        subType: 'number',
        id: 'offvalue',
        editable: true
      },
      {
        name: 'Thumbnail(Default Image)',
        type: 'input',
        subType: 'number',
        id: 'unit_price',
        editable: true
      },
      {
        name: '',
        type: 'action',
        id: 'action',
      },
    ]
  };

  ProductDetailsTab = [
    {
      title: 'PRODUCT INFORMATION',
      subTabs: [
        {
          title: 'Basic Information',
          link: 'basicInfo'

        },
        {
          title: 'Description',
          link: 'description'

        },
        {
          title: 'Images & Videos',
          link: 'images-videos'

        },
        {
          title: 'Product Identifiers',
          link: 'identifiers'
        },
        {
          title: 'Pricing',
          link: 'pricing'
        },
        {

          title: 'Inventory',
          link: 'inventory'
        }
      ]
    },
    {
      title: 'PRODUCT OPTIONS',
      subTabs: [
        {
          title: 'Variations',
          link: 'variations'
        },
        //{
        //  title: 'Customizations',
        //  link: 'customizations'

        //}
      ]
    },
    {
      title: 'STOREFRONT',
      subTabs: [
        {
          title: 'Storefront Details',
          link: 'storefront'

        },
        {
          title: 'Custom Fields',
          link: 'customFields'

        },
        {
          title: 'Related Products',
          link: 'relatedProducts'

        }
      ]
    },
    {
      title: 'FULFILLMENT',
      subTabs: [
        {
          title: 'Dimensions & Weight',
          link: 'fulfillment'

        },
        {
          title: 'Shipping Details',
          link: 'shippingDetails'

        },
        {
          title: 'Purchasability',
          link: 'purchasability'

        },
        {
          title: 'Gift Wrapping',
          link: 'giftWrapping'

        },
        {
          title: 'Customs Information',
          link: 'customInfo'

        }
      ]
    },
    {
      title: 'SEO & SHARING',
      subTabs: [
        {
          title: 'SEO',
          link: 'searchOpt'

        },
        {
          title: '	Open Graph Sharing',
          link: 'openGraphSharing'

        },
        // {
        //   title: 'Related Products',
        //   link: ''

        // }
      ]
    },
  ];

  editor: {} = {
    fieldValue: ''
  }

  showVariantsOption: boolean = false

  productVideoUrl: InputField = {
    fieldId: "itemName",
    label: "Url",
    fieldValue: "",
    type: "text",
    isValid: true,
    errorMesg: "Please provide image url",
    required: true
  };

  productDetails: any[] = []

  customFields: any[] = [];
  qaFields: any[] = []

  setInputFields() {

    this.productVideoUrl.fieldValue = "";

    this.productDetails = [
      {//1
        fieldId: "ProductTitle",
        label: "Product Title",
        fieldValue: "",
        type: "text",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {//2
        fieldId: "ProductName",
        label: "Product Name",
        fieldValue: "",
        type: "text",
        isValid: true,
        errorMesg: "Please provide product name",
        required: true
      },
      {//3
        fieldId: "SerialNo",
        label: "Serial Number",
        fieldValue: "",
        type: "text",
        isValid: true,
        errorMesg: "Please provide product code",
        required: true
      },
      {//4
        fieldId: "Price",
        label: "Cost",
        fieldValue: "",
        type: "number",
        isValid: true,
        errorMesg: "",
        required: false
      },
      {//5
        fieldId: "Specification",
        label: "Specification",
        styleClass: "",
        type: "text",
        required: true,
        iconClass: '',
        value: "",
        rows: "2",
        cols: "3",
        isValid: true,
        errorMesg: "Please provide product specifications",
      },
      {//6
        fieldId: "SearchKeywords",
        label: "Search Keywords",
        fieldValue: "",
        type: "text",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {//7
        fieldId: "WarrantyInformation",
        label: "Warranty Information",
        fieldValue: "",
        type: "text",
        isValid: true,
        errorMesg: "",
        required: false,
        rows: "2",
        cols: "3",
      },
      {//8
        fieldId: "ProductWeight",
        label: "Weight(KGS)",
        fieldValue: "",
        type: "number",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {//9
        fieldId: "Width",
        label: "Width (Centimeters)",
        fieldValue: "",
        type: "number",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {//10
        fieldId: "Height",
        label: "Height (Centimeters)",
        fieldValue: "",
        type: "number",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {//11
        fieldId: "Depth",
        label: "Depth (Centimeters)",
        fieldValue: "",
        type: "number",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {//12
        fieldId: "AvailableCount",
        label: "Available Count",
        fieldValue: "",
        type: "number",
        isValid: true,
        errorMesg: "",
        required: true,
      },
      {//13
        fieldId: "Warning",
        label: "Warning",
        fieldValue: "",
        type: "textarea",
        isValid: true,
        errorMesg: "",
        required: false,
      },
       {//14
        fieldId: "shorttdiscription",
        label: "Short Specification",
        fieldValue: "",
        type: "textarea",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {//15
        fieldId: "turnAroundDays",
        label: "Turn Around days",
        fieldValue: "",
        type: "number",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {//16
        fieldId: "minimumPrice",
        label: "Minimum Price",
        fieldValue: "",
        type: "number",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {//17
        fieldId: "bannerHardwareCost",
        label: "Banner Hardware Cost",
        fieldValue: "",
        type: "number",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {//18
        fieldId: "ShippingCharge0",
        label: "Shipping Charge Next Day",
        fieldValue: "",
        type: "number",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {//19
        fieldId: "ShippingCharge3",
        label: "Shipping Charge 3 Day",
        fieldValue: "",
        type: "number",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {//20
        fieldId: "ShippingCharge7",
        label: "Shipping Charge 5-7 Day",
        fieldValue: "",
        type: "number",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {//21
        fieldId: "ProductionDays",
        label: "Days Required For Production",
        fieldValue: "",
        type: "number",
        isValid: true,
        errorMesg: "",
        required: false,
      },
    ];

    this.qaFields = [[{
      fieldId: "qaFieldName1",
      label: "Question",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "qaAnsFieldName1",
      label: "Answer",
      fieldValue: "",
      type: "textarea",
      isValid: true,
      errorMesg: "",
      required: false,
    }]];

    this.variantFields = [[{
      fieldId: "variantFieldName1",
      label: "Variant Name",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "variantFieldImage1",
      label: "Image",
      fieldValue: [],
      type: "image",
      isValid: true,
      errorMesg: "",
      required: false,
    }]];

    this.customFields = [
      [{
      fieldId: "customFieldName1",
      label: "Custom Field Name",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "customFieldValue10",
      label: "Name",
      fieldValue: "",
      type: "textarea",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "customFieldImage1",
      label: "Image",
      fieldValue: [],
      type: "image",
      isValid: true,
      errorMesg: "",
      required: false,
    }]
    ];

    this.VariantsList = [];
    this.VariantTable.data = [];
    this.ProductVariantTable.data = [];
  }

  removeField(index: number) {
    this.customFields.splice(index, 1);
  }

  removeQAField(index: number) {
    this.qaFields.splice(index, 1);
  }

  removeVariant(index: number) {
    this.variantFields.splice(index, 1);
  }

  radioChange(val: string) {
    console.log(val);
  }

  savedVariants(variants: any) {
    this.showVariantsOption = false;
    this.VariantTable.data = [];
    this.ProductVariantTable.data = [];
    for (var i = 0; i < variants.length; i++) {
      this.VariantTable.data.push({
        Name: variants[i].Name,
        Type: variants[i].Type,
        Values: variants[i].Values.join(", ")
      });
      for (var j = 0; j < variants[i].Values.length; j++) {
        this.ProductVariantTable.data.push({
          Name: variants[i].Name,
          Type: variants[i].Type,
          Values: variants[i].Values[j]
        });
      }
    }
    this.VariantsList = variants;
  }

  addCustomField() {
    var suffix = ((this.customFields.length) + 1);
    var d = [{
      fieldId: "customFieldName" + suffix,
      label: "Name",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "customFieldValue" + suffix + "0",
      label: "Description",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "customFieldImage" + suffix,
      label: "Image",
      fieldValue: [],
      type: "image",
      isValid: true,
      errorMesg: "",
      required: false,
    }];
    this.customFields.push(d)
  }

  addVariant() {
    var suffix = ((this.variantFields.length) + 1);
    var d = [{
      fieldId: "variantFieldName" + suffix,
      label: "Variant ",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "variantFieldImage" + suffix,
      label: "Image",
      fieldValue: [],
      type: "image",
      isValid: true,
      errorMesg: "",
      required: false,
    }];
    this.variantFields.push(d)
  }

  addQAField() {
    var suffix = ((this.qaFields.length) + 1);
    var d = [{
      fieldId: "qaFieldName" + suffix,
      label: "Question ",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "qaFieldValue" + suffix,
      label: "Answer ",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    }];
    this.qaFields.push(d)
  }

  setDiscountTableHeader(selectedOffType: string) {
    this.discountTireTableConfig.columns[1].name = selectedOffType;
  };

  bulkDiscountChanged(value: string) {
    for (var i = 0; i < this.productDetails[18].options.length; i++) {
      if (value == this.productDetails[18].options[i].value) {
        this.setDiscountTableHeader(this.productDetails[18].options[i].label);
        break;
      }
    }
  }

  addTireEmptyRow() {
    var val;
    for (var i = 0; i < this.productDetails[18].options.length; i++) {
      if (this.productDetails[18].fieldValue == this.productDetails[18].options[i].value) {
        switch (this.productDetails[18].fieldValue) {
          case 'Percentage off on total order':
            val = '0.00%'
            break;
          case 'Fixed Amount off on total order': case 'Off Per Unit':
            val = 'AED0.00'
            break;
        }
        break;
      }
    }

    this.discountTireTableConfig.data.push(
      {
        min_quantity: this.discountTireTableConfig.data.length + 1,
        offvalue: val,
        unit_price: ''
      }
    );
  }

  closeModel() {
    this.modalService.dismissAll();
  }

  AddFromUrlClicked(content: any) {
    this.modalService.open(content, { size: 'md', backdrop: 'static', centered: true });
  }

  onAnyAction(e: any) {
    console.log(e);
    switch (e.action) {
      case "deleteRow":
        break;
    }
  }

  onAnyActionOnTire(e: any) {
    console.log(e);
    switch (e.action) {
      case "deleteRow":
        this.discountTireTableConfig.data.splice(e.index, 1);
        break;
    }
  }

  UploadImageClicked(from, i) {
    switch (from) {
      case "product":
        if (this.fileUploaded) {
          let el: HTMLElement = this.fileUploaded.nativeElement;
          el.click();
        }
        break;
      case "customAttr":
        if (this.fileUploaded1) {
          this.selectedImageIndex = i
          let el: HTMLElement = this.fileUploaded1.nativeElement;
          el.click();
        }
        break;
      case "variant":
        if (this.fileUploaded2) {
          this.selectedImageIndex = i
          let el: HTMLElement = this.fileUploaded2.nativeElement;
          el.click();
        }
        break;
    }
  }

  imageFileSelected(event: any, from: any) {
    var file = event.target.files;
    var  j=0;
    for (var i = 0; i < file.length; i++) {
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        if (fileReader.result) {
          console.log(fileReader);
          switch (from) {
            case "product":
              this.ImageList.push({
                image_url: fileReader.result.toString(),
                image_alt: '',
                thumbnail: false,
                file: file[j]
              });
              break;
            case "customAttr":
              this.customFields[this.selectedImageIndex][2].fieldValue.push({
                image_url: fileReader.result.toString(),
                image_alt: '',
                thumbnail: false,
                file: file[j]
              });
              break;
            case "variant":
              this.variantFields[this.selectedImageIndex][1].fieldValue.push({
                image_url: fileReader.result.toString(),
                image_alt: '',
                thumbnail: false,
                file: file[j]
              });
              break;
          }
          j++;
        }
      }
      fileReader.readAsDataURL(file[i]);
    }
  }

  
  DeleteImageClicked(i) {
    this.ImageList.splice(i, 1);
  }

  DeleteVideoClicked(url: string) {
    var i = this.VideoList.indexOf(url);
    this.VideoList.splice(i, 1);
  }

  SaveVideoClicked(url: string) {
    var id = url.split('v=');
    if (id && id.length > 0) {
      var video_id = id[1].split('&')[0];
      this.VideoList.push(video_id);
      this.closeModel();
    }
    else {
      this.helper.showSuccessTostMessage("Provide full youtube url. (Eg: https://www.youtube.com/watch?v=o5weKNsalkdnksdn)");
    }

  }

  ngOnInit(): void {

  }

  onTabSelected(tabId: number) {
    this.selectedIndex = tabId;
  }

  setCustomAttributeData(CustomAttributes: any) {
    for (var i = 0; i < CustomAttributes.length; i++) {
      this.customFields[i][0].fieldValue = CustomAttributes[i].Name;
      this.customFields[i][1].fieldValue = CustomAttributes[i].Value;
      this.customFields[i][2].fieldValue = [];
      for (var j = 0; j < CustomAttributes[i].ImageData.length; j++) {
        this.customFields[i][2].fieldValue.push({
          file: { name: CustomAttributes[i].ImageData[j].Name },
          image_url: CustomAttributes[i].ImageData[j].Path
        });
      }
      if (i + 1 < CustomAttributes.length)
        this.addCustomField();
    }
  }

  getCustomAttributeData() {
    var ar = [];
    for (var i = 0; i < this.customFields.length; i++) {
      if (this.customFields[i][0].fieldValue) {
        var imgList = [];
        if (this.customFields[i][2].fieldValue && this.customFields[i][2].fieldValue) {
          for (var j = 0; j < this.customFields[i][2].fieldValue.length; j++) {
            imgList.push({
              Name: this.customFields[i][2].fieldValue[j].file ? this.customFields[i][2].fieldValue[j].file.name : "",
              Value: this.customFields[i][2].fieldValue[j].image_url ? this.customFields[i][2].fieldValue[j].image_url : ""
            });
          }
        }
        ar.push({
          Name: this.customFields[i][0].fieldValue,
          Value: this.customFields[i][1].fieldValue,
          ImageData: imgList
        });
      }
    }
    return ar;
  }

  setQuestionAnsData(QuestionAns: any) {
    for (var i = 0; i < QuestionAns.length; i++) {
      this.qaFields[i][0].fieldValue = QuestionAns[i].Question;
      this.qaFields[i][1].fieldValue = QuestionAns[i].Answer;
      if (i + 1 < QuestionAns.length)
       this.addQAField();
    }
  }

  getQuestionAnsData() {
    var ar = [];
    for (var i = 0; i < this.qaFields.length; i++) {
      if (this.qaFields[i][0].fieldValue) {
        ar.push({
          Question: this.qaFields[i][0].fieldValue,
          Answer: this.qaFields[i][1].fieldValue
        });
      }
    }
    return ar;
  }

  setvariantFieldData(VariantsDetails: any) {
    for (var i = 0; i < VariantsDetails.length; i++) {
      this.variantFields[i][0].fieldValue = VariantsDetails[i].VariantName;
      this.variantFields[i][1].fieldValue = [];
      for (var j = 0; j < VariantsDetails[i].ImageData.length; j++) {
        this.variantFields[i][1].fieldValue.push({
          file: { name: VariantsDetails[i].ImageData[j].Name },
          image_url: VariantsDetails[i].ImageData[j].Path
        });
      }
      if (i + 1 < VariantsDetails.length)
        this.addVariant();
    }
  }

  getvariantFieldData() {
    var ar = [];
    for (var i = 0; i < this.variantFields.length; i++) {
      if (this.variantFields[i][0].fieldValue) {
        var imgList = [];
        if (this.variantFields[i][1].fieldValue && this.variantFields[i][1].fieldValue) {
          for (var j = 0; j < this.variantFields[i][1].fieldValue.length; j++) {
            imgList.push({
              Name: this.variantFields[i][1].fieldValue[j].file ? this.variantFields[i][1].fieldValue[j].file.name : "",
              Value: this.variantFields[i][1].fieldValue[j].image_url ? this.variantFields[i][1].fieldValue[j].image_url : ""
            });
          }
        }
        ar.push({
          VariantName: this.variantFields[i][0].fieldValue,
          ImageData: imgList
        });
      }
    }
    return ar;
  }

  setProductData(json) {
    this.editId = json.Id;
    this.helper.MapDataToModel(this.productDetails, json);
    this.setCustomAttributeData(json.CustomAttributes);
    this.setQuestionAnsData(json.QuestionAns);
    this.selectedCatId = json.CategoryId;
    this.selectedCatName = json.CategoryName;
    console.log(json);
    this.setvariantFieldData(json.VariantsDetails);
    this.VideoList = json.VideoLinks;
    for (var i = 0; i < json.ImagesUrls.length; i++) {
      this.ImageList.push({ file: { name: json.ImagesUrls[i].Name }, image_url: json.ImagesUrls[i].Path})
    }
  }
   
  CreateClicked() {
    if (this.helper.isFormValid(this.productDetails)) {
      var json: any = {};
      this.helper.getDataJsonMapped(this.productDetails, json);
      json.CustomAttributes = this.getCustomAttributeData();
      json.QuestionAns = this.getQuestionAnsData();
      json.CategoryId = this.selectedCatId;
      json.CategoryName = this.selectedCatName;
      json.VariantsDetails = this.getvariantFieldData();
      json.VideoLinks = this.VideoList;
      json.Id = this.editId;
      var imagesUrls = [];
      for (var i = 0; i < this.ImageList.length; i++) {
        if (this.ImageList[i]) {
          imagesUrls.push({ Name: this.ImageList[i].file.name, Value: this.ImageList[i].image_url });
        }
      }
      json.ImagesUrls = imagesUrls;

      this.http.post(AppconstantsService.ProductAPIs.productAPI, json).then((data) => {
        if (data && data.isSucess) {
          if (this.editId) {
            this.editDone.emit();
            this.editId = "";
            this.helper.showSuccessTostMessage("Updated product successfully");
          }
          else {
            this.helper.showSuccessTostMessage("Added product successfully");
          }
        } else {
          this.helper.showErrorTostMessage("Failed to add product");
        }
      },
        (error) => {

        });
    }
    else {
      this.helper.showErrorTostMessage("Please fill all mandatory data.");
    }
  }

  CancelClicked() {
    if (this.editId) {
      this.editDone.emit();
    }
    else {
      this.router.navigate(["home/products/view"]);
    }
  }

}
