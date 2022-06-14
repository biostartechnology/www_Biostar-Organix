import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppconstantsService {

  constructor() { }
  public static orderStatus = [
    { value: 1, label: "Order Placed" },
    { value: 2, label: "Pending" },
    { value: 3, label: "Accepted" },
    { value: 4, label: "Ready For PickUp" },
    //{ value: 5, label: "Order In Progress" },
    //{ value: 6, label: "Order on the way" },
    { value: 7, label: "Delivered" },
    //{ value: 8, label: "AssignDM" },
    { value: 9, label: "Cancelled" },
    { value: 10, label: "Item Rejected" },
    // { value: 11, label: "Processing" },
    ////{ value: 12, label: "Awaiting Payment" },
    //{ value: 13, label: "Awaiting Fulfillment" },
    // { value: 14, label: "Awaiting Shipment" },
    //{ value: 15, label: "High Risk" },
    //{ value: 16, label: "Pre-Orders" },
    //{ value: 17, label: "Incomplete" },
    // { value: 18, label: "Archived" },
    // { value: 19, label: "Refunded" },
    //{ value: 20, label: "Shipped" }
  ];
  public static SessionAPIs= {
    loginAPI : "login",
    register : "signup",
    resetPassword : "login",
    validateEmailId : "login",
    version: "version",
    forgotPassword:"login/resetPswd",
    passwordReset:"login/verifyresetPswd",
    setNewPassword:"login/setnewpassword",
    verifyAccount:"signup/verify",
    chatInitAPI: 'chatinit',
  };

  public static homeAPIs = {
    chatAPI: "chat",
    formsAPI:'formsreply',
    contatctForm:"form",
    popupFormAPI:'popupform',
    helpFormAPI:'helpform',
    healthFormAPI:'healthform',
    taskListAPi:'taskTable',
    editTaskApi:'editTaskTable',
    submitTask: 'submitTask',
    userapi: 'users',
    category: 'category',
    products: 'product',
    orders:'order',
    cart: 'cart',
    message:'message'
  }

  public static  CategoryList = [
  {
    "CategoryName": "Software",
    "AccountId": "c391a889-93ca-4c60-9285-7ssldmhikosdkn7",
    "CreateOn": "2022-01-26T07:11:25.543Z",
    "Description": "Software",
    "Id": "b8e89409-c3cc-4b17-9fe8-b38051945abf",
    "Images": null,
    "ParentId": null
  },
  {
    "CategoryName": "Hardware",
    "AccountId": "c391a889-93ca-4c60-9285-7ssldmhikosdkn7",
    "CreateOn": "2022-01-26T07:11:35.796Z",
    "Description": "Hardware",
    "Id": "e9ddc0ef-5dc9-4f7f-8bcf-6c2a698f1ae9",
    "Images": null,
    "ParentId": null
  },
  {
    "CategoryName": "Training",
    "AccountId": "c391a889-93ca-4c60-9285-7ssldmhikosdkn7",
    "CreateOn": "2022-01-26T07:11:41.356Z",
    "Description": "Training",
    "Id": "d207802c-d55b-44fa-af81-84c4438969da",
    "Images": null,
    "ParentId": null
  },
  {
    "CategoryName": "CounterFeit",
    "AccountId": "c391a889-93ca-4c60-9285-7ssldmhikosdkn7",
    "CreateOn": "2022-01-26T07:11:46.537Z",
    "Description": "CounterFeit",
    "Id": "f417b50a-9c04-4835-93e8-bab97a20faa1",
    "Images": null,
    "ParentId": null
  },
  {
    "CategoryName": "Vector-TM v19",
    "AccountId": "c391a889-93ca-4c60-9285-7ssldmhikosdkn7",
    "CreateOn": "2022-01-26T07:14:19.677Z",
    "Description": null,
    "Id": "e606e8f9-42af-46c0-8ff0-d20a0769b6fc",
    "Images": null,
    "ParentId": "b8e89409-c3cc-4b17-9fe8-b38051945abf"
  },
  {
    "CategoryName": "Vector-TM XP v19",
    "AccountId": "c391a889-93ca-4c60-9285-7ssldmhikosdkn7",
    "CreateOn": "2022-01-26T07:32:03.652Z",
    "Description": null,
    "Id": "3df85492-46a3-470a-b87f-00df677cf53f",
    "Images": null,
    "ParentId": "b8e89409-c3cc-4b17-9fe8-b38051945abf"
  },
  {
    "CategoryName": "Vector-TM NT v19",
    "AccountId": "c391a889-93ca-4c60-9285-7ssldmhikosdkn7",
    "CreateOn": "2022-01-26T07:32:29.355Z",
    "Description": null,
    "Id": "aff73fc8-7697-438e-8fc9-245a0124b609",
    "Images": null,
    "ParentId": "b8e89409-c3cc-4b17-9fe8-b38051945abf"
  },
  {
    "CategoryName": "Anti-EMF",
    "AccountId": "c391a889-93ca-4c60-9285-7ssldmhikosdkn7",
    "CreateOn": "2022-01-26T07:32:41.395Z",
    "Description": null,
    "Id": "48fce054-293c-4abf-a031-e732d072dde2",
    "Images": null,
    "ParentId": "e9ddc0ef-5dc9-4f7f-8bcf-6c2a698f1ae9"
  },
  {
    "CategoryName": "Light therapy",
    "AccountId": "c391a889-93ca-4c60-9285-7ssldmhikosdkn7",
    "CreateOn": "2022-01-26T07:39:02.361Z",
    "Description": null,
    "Id": "20b58563-befa-4af6-b603-d4965751ed73",
    "Images": null,
    "ParentId": "e9ddc0ef-5dc9-4f7f-8bcf-6c2a698f1ae9"
  },
  {
    "CategoryName": "Sound Therapy",
    "AccountId": "c391a889-93ca-4c60-9285-7ssldmhikosdkn7",
    "CreateOn": "2022-01-26T07:32:12.599Z",
    "Description": null,
    "Id": "5e8f3419-6b31-42db-b062-34bda29e6ea6",
    "Images": null,
    "ParentId": "e9ddc0ef-5dc9-4f7f-8bcf-6c2a698f1ae9"
  },
  {
    "CategoryName": "NLS Instruments",
    "AccountId": "c391a889-93ca-4c60-9285-7ssldmhikosdkn7",
    "CreateOn": "2022-01-26T07:37:17.621Z",
    "Description": null,
    "Id": "81018c58-60c2-4446-ba77-cdb7a7cead5b",
    "Images": null,
    "ParentId": "e9ddc0ef-5dc9-4f7f-8bcf-6c2a698f1ae9"
  },
  {
    "CategoryName": "Certification",
    "AccountId": "c391a889-93ca-4c60-9285-7ssldmhikosdkn7",
    "CreateOn": "2022-01-26T07:43:51.161Z",
    "Description": null,
    "Id": "32376fed-9cfc-43b7-a552-86e1d82e902f",
    "Images": null,
    "ParentId": "d207802c-d55b-44fa-af81-84c4438969da"
  },
  {
    "CategoryName": "NLS Level 1",
    "AccountId": "c391a889-93ca-4c60-9285-7ssldmhikosdkn7",
    "CreateOn": "2022-03-07T14:22:48.294Z",
    "Description": null,
    "Id": "27eeb809-67da-4b95-8591-48b35a022a60",
    "Images": null,
    "ParentId": "d207802c-d55b-44fa-af81-84c4438969da"
  },
  {
    "CategoryName": "NLS Level 2",
    "AccountId": "c391a889-93ca-4c60-9285-7ssldmhikosdkn7",
    "CreateOn": "2022-03-15T16:18:59.261Z",
    "Description": null,
    "Id": "f200229e-82be-4ee5-835b-ccdc2817315f",
    "Images": null,
    "ParentId": "d207802c-d55b-44fa-af81-84c4438969da"
  },
  {
    "CategoryName": "Voice Analysis",
    "AccountId": "c391a889-93ca-4c60-9285-7ssldmhikosdkn7",
    "CreateOn": "2022-03-15T16:32:17.21Z",
    "Description": null,
    "Id": "43720fdc-e08e-4b19-993b-584022d452ae",
    "Images": null,
    "ParentId": "d207802c-d55b-44fa-af81-84c4438969da"
  },
  {
    "CategoryName": "Metapathia Hunter",
    "AccountId": "c391a889-93ca-4c60-9285-7ssldmhikosdkn7",
    "CreateOn": "2022-03-16T08:33:29.312Z",
    "Description": null,
    "Id": "1c52b624-5e9c-4f8e-bfde-31cd2b54228d",
    "Images": null,
    "ParentId": "f417b50a-9c04-4835-93e8-bab97a20faa1"
  },
  {
    "CategoryName": "Singularity Vector - Fakes",
    "AccountId": "c391a889-93ca-4c60-9285-7ssldmhikosdkn7",
    "CreateOn": "2022-03-16T08:54:26.599Z",
    "Description": null,
    "Id": "cc111850-0142-41e6-ae48-1963be842b0b",
    "Images": null,
    "ParentId": "f417b50a-9c04-4835-93e8-bab97a20faa1"
  },
  {
    "CategoryName": "ISHA Vector - Fakes",
    "AccountId": "c391a889-93ca-4c60-9285-7ssldmhikosdkn7",
    "CreateOn": "2022-03-16T10:19:18.905Z",
    "Description": null,
    "Id": "febdf07e-cfcd-4d1d-b967-8fcf494f9865",
    "Images": null,
    "ParentId": "f417b50a-9c04-4835-93e8-bab97a20faa1"
  },
  {
    "CategoryName": "Oberon Vector - Fakes",
    "AccountId": "c391a889-93ca-4c60-9285-7ssldmhikosdkn7",
    "CreateOn": "2022-03-16T15:19:56.319Z",
    "Description": null,
    "Id": "96f674d1-7dac-4f63-ab2f-65dbf1185d4b",
    "Images": null,
    "ParentId": "f417b50a-9c04-4835-93e8-bab97a20faa1"
    }
]
}
