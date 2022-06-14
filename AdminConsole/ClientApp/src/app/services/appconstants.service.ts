import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppconstantsService {

  constructor() { }
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
  
  public static ProductAPIs = {
    productAPI: 'product',
    productListAPi: 'product/GetProducts',
    editProductApi: 'product/EditProduct',
    addProductApi: 'product/AddProduct',
    categoryApi:'category'
  };

  public static OrderAPIS = {
    GetOrderList: 'order/GetOrders',
    OrderAPI:'order',
    GetOrderDetail: 'order/GetOrderDetail',
  }

  public static CustomerApis = {
    GetMatchingCustomer: 'customer',
    Message: 'message',
    Plugin: 'plugin',
    Group:'group',
    User: 'customer',
    MarkUp:'markup'
  }

  public static countryList = [
    { value: "Afghanistan", label: "Afghanistan" }
    , { value: "Albania", label: "Albania" }
    , { value: "Algeria", label: "Algeria" }
    , { value: "American Samoa", label: "American Samoa" }
    , { value: "Andorra", label: "Andorra" }
    , { value: "Angola", label: "Angola" }
    , { value: "Anguilla", label: "Anguilla" }
    , { value: "Antarctica", label: "Antarctica" }
    , { value: "Antigua and Barbuda", label: "Antigua and Barbuda" }
    , { value: "Argentina", label: "Argentina" }
    , { value: "Armenia", label: "Armenia" }
    , { value: "Aruba", label: "Aruba" }
    , { value: "Australia", label: "Australia" }
    , { value: "Austria", label: "Austria" }
    , { value: "Azerbaijan", label: "Azerbaijan" }
    , { value: "Bahamas", label: "Bahamas" }
    , { value: "Bahrain", label: "Bahrain" }
    , { value: "Bangladesh", label: "Bangladesh" }
    , { value: "Barbados", label: "Barbados" }
    , { value: "Belarus", label: "Belarus" }
    , { value: "Belgium", label: "Belgium" }
    , { value: "Belize", label: "Belize" }
    , { value: "Benin", label: "Benin" }
    , { value: "Bermuda", label: "Bermuda" }
    , { value: "Bhutan", label: "Bhutan" }
    , { value: "Bolivia", label: "Bolivia" }
    , { value: "Bonaire, Sint Eustatius and Saba", label: "Bonaire, Sint Eustatius and Saba" }
    , { value: "Bosnia and Herzegovina", label: "Bosnia and Herzegovina" }
    , { value: "Botswana", label: "Botswana" }
    , { value: "Bouvet Island", label: "Bouvet Island" }
    , { value: "Brazil", label: "Brazil" }
    , { value: "British Indian Ocean Territory", label: "British Indian Ocean Territory" }
    , { value: "Brunei Darussalam", label: "Brunei Darussalam" }
    , { value: "Bulgaria", label: "Bulgaria" }
    , { value: "Burkina Faso", label: "Burkina Faso" }
    , { value: "Burundi", label: "Burundi" }
    , { value: "Cambodia", label: "Cambodia" }
    , { value: "Cameroon", label: "Cameroon" }
    , { value: "Canada", label: "Canada" }
    , { value: "Cape Verde", label: "Cape Verde" }
    , { value: "Cayman Islands", label: "Cayman Islands" }
    , { value: "Central African Republic", label: "Central African Republic" }
    , { value: "Chad", label: "Chad" }
    , { value: "Chile", label: "Chile" }
    , { value: "China", label: "China" }
    , { value: "Christmas Island", label: "Christmas Island" }
    , { value: "Cocos (Keeling) Islands", label: "Cocos (Keeling) Islands" }
    , { value: "Colombia", label: "Colombia" }
    , { value: "Comoros", label: "Comoros" }
    , { value: "Congo", label: "Congo" }
    , { value: "Congo, the Democratic Republic of the", label: "Congo, the Democratic Republic of the" }
    , { value: "Cook Islands", label: "Cook Islands" }
    , { value: "Costa Rica", label: "Costa Rica" }
    , { value: "Cote d'Ivoire", label: "Cote d'Ivoire" }
    , { value: "Croatia", label: "Croatia" }
    , { value: "Cyprus", label: "Cyprus" }
    , { value: "Czech Republic", label: "Czech Republic" }
    , { value: "Denmark", label: "Denmark" }
    , { value: "Djibouti", label: "Djibouti" }
    , { value: "Dominica", label: "Dominica" }
    , { value: "Dominican Republic", label: "Dominican Republic" }
    , { value: "Ecuador", label: "Ecuador" }
    , { value: "Egypt", label: "Egypt" }
    , { value: "El Salvador", label: "El Salvador" }
    , { value: "Equatorial Guinea", label: "Equatorial Guinea" }
    , { value: "Eritrea", label: "Eritrea" }
    , { value: "Estonia", label: "Estonia" }
    , { value: "Ethiopia", label: "Ethiopia" }
    , { value: "Falkland Islands (Malvinas)", label: "Falkland Islands (Malvinas)" }
    , { value: "Faroe Islands", label: "Faroe Islands" }
    , { value: "Fiji", label: "Fiji" }
    , { value: "Finland", label: "Finland" }
    , { value: "France", label: "France" }
    , { value: "French Guiana", label: "French Guiana" }
    , { value: "French Polynesia", label: "French Polynesia" }
    , { value: "French Southern Territories", label: "French Southern Territories" }
    , { value: "Gabon", label: "Gabon" }
    , { value: "Gambia", label: "Gambia" }
    , { value: "Georgia", label: "Georgia" }
    , { value: "Germany", label: "Germany" }
    , { value: "Ghana", label: "Ghana" }
    , { value: "Gibraltar", label: "Gibraltar" }
    , { value: "Greece", label: "Greece" }
    , { value: "Greenland", label: "Greenland" }
    , { value: "Grenada", label: "Grenada" }
    , { value: "Guadeloupe", label: "Guadeloupe" }
    , { value: "Guam", label: "Guam" }
    , { value: "Guatemala", label: "Guatemala" }
    , { value: "Guernsey", label: "Guernsey" }
    , { value: "Guinea", label: "Guinea" }
    , { value: "Guinea-Bissau", label: "Guinea-Bissau" }
    , { value: "Guyana", label: "Guyana" }
    , { value: "Haiti", label: "Haiti" }
    , { value: "Heard Island and Mcdonald Islands", label: "Heard Island and Mcdonald Islands" }
    , { value: "Holy See (Vatican City State)", label: "Holy See (Vatican City State)" }
    , { value: "Honduras", label: "Honduras" }
    , { value: "Hong Kong", label: "Hong Kong" }
    , { value: "Hungary", label: "Hungary" }
    , { value: "Iceland", label: "Iceland" }
    , { value: "India", label: "India" }
    , { value: "Indonesia", label: "Indonesia" }
    , { value: "Iraq", label: "Iraq" }
    , { value: "Ireland", label: "Ireland" }
    , { value: "Isle of Man", label: "Isle of Man" }
    , { value: "Israel", label: "Israel" }
    , { value: "Italy", label: "Italy" }
    , { value: "Jamaica", label: "Jamaica" }
    , { value: "Japan", label: "Japan" }
    , { value: "Jersey", label: "Jersey" }
    , { value: "Jordan", label: "Jordan" }
    , { value: "Kazakhstan", label: "Kazakhstan" }
    , { value: "Kenya", label: "Kenya" }
    , { value: "Kiribati", label: "Kiribati" }
    , { value: "Korea, Republic of", label: "Korea, Republic of" }
    , { value: "Kuwait", label: "Kuwait" }
    , { value: "Kyrgyzstan", label: "Kyrgyzstan" }
    , { value: "Lao People's Democratic Republic", label: "Lao People's Democratic Republic" }
    , { value: "Latvia", label: "Latvia" }
    , { value: "Lebanon", label: "Lebanon" }
    , { value: "Lesotho", label: "Lesotho" }
    , { value: "Liberia", label: "Liberia" }
    , { value: "Libya", label: "Libya" }
    , { value: "Liechtenstein", label: "Liechtenstein" }
    , { value: "Lithuania", label: "Lithuania" }
    , { value: "Luxembourg", label: "Luxembourg" }
    , { value: "Macao", label: "Macao" }
    , { value: "Macedonia, the Former Yugoslav Republic of", label: "Macedonia, the Former Yugoslav Republic of" }
    , { value: "Madagascar", label: "Madagascar" }
    , { value: "Malawi", label: "Malawi" }
    , { value: "Malaysia", label: "Malaysia" }
    , { value: "Maldives", label: "Maldives" }
    , { value: "Mali", label: "Mali" }
    , { value: "Malta", label: "Malta" }
    , { value: "Marshall Islands", label: "Marshall Islands" }
    , { value: "Martinique", label: "Martinique" }
    , { value: "Mauritania", label: "Mauritania" }
    , { value: "Mauritius", label: "Mauritius" }
    , { value: "Mayotte", label: "Mayotte" }
    , { value: "Mexico", label: "Mexico" }
    , { value: "Micronesia, Federated States of", label: "Micronesia, Federated States of" }
    , { value: "Moldova, Republic of", label: "Moldova, Republic of" }
    , { value: "Monaco", label: "Monaco" }
    , { value: "Mongolia", label: "Mongolia" }
    , { value: "Montenegro", label: "Montenegro" }
    , { value: "Montserrat", label: "Montserrat" }
    , { value: "Morocco", label: "Morocco" }
    , { value: "Mozambique", label: "Mozambique" }
    , { value: "Myanmar", label: "Myanmar" }
    , { value: "Namibia", label: "Namibia" }
    , { value: "Nauru", label: "Nauru" }
    , { value: "Nepal", label: "Nepal" }
    , { value: "Netherlands", label: "Netherlands" }
    , { value: "Netherlands Antilles", label: "Netherlands Antilles" }
    , { value: "New Caledonia", label: "New Caledonia" }
    , { value: "New Zealand", label: "New Zealand" }
    , { value: "Nicaragua", label: "Nicaragua" }
    , { value: "Niger", label: "Niger" }
    , { value: "Nigeria", label: "Nigeria" }
    , { value: "Niue", label: "Niue" }
    , { value: "Norfolk Island", label: "Norfolk Island" }
    , { value: "Northern Mariana Islands", label: "Northern Mariana Islands" }
    , { value: "Norway", label: "Norway" }
    , { value: "Oman", label: "Oman" }
    , { value: "Pakistan", label: "Pakistan" }
    , { value: "Palau", label: "Palau" }
    , { value: "Palestinian Territory, Occupied", label: "Palestinian Territory, Occupied" }
    , { value: "Panama", label: "Panama" }
    , { value: "Papua New Guinea", label: "Papua New Guinea" }
    , { value: "Paraguay", label: "Paraguay" }
    , { value: "Peru", label: "Peru" }
    , { value: "Philippines", label: "Philippines" }
    , { value: "Pitcairn", label: "Pitcairn" }
    , { value: "Poland", label: "Poland" }
    , { value: "Portugal", label: "Portugal" }
    , { value: "Puerto Rico", label: "Puerto Rico" }
    , { value: "Qatar", label: "Qatar" }
    , { value: "Republic of Kosovo", label: "Republic of Kosovo" }
    , { value: "Reunion", label: "Reunion" }
    , { value: "Romania", label: "Romania" }
    , { value: "Russian Federation", label: "Russian Federation" }
    , { value: "Rwanda", label: "Rwanda" }
    , { value: "Saint Helena", label: "Saint Helena" }
    , { value: "Saint Kitts and Nevis", label: "Saint Kitts and Nevis" }
    , { value: "Saint Lucia", label: "Saint Lucia" }
    , { value: "Saint Pierre and Miquelon", label: "Saint Pierre and Miquelon" }
    , { value: "Saint Vincent and the Grenadines", label: "Saint Vincent and the Grenadines" }
    , { value: "Samoa", label: "Samoa" }
    , { value: "San Marino", label: "San Marino" }
    , { value: "Sao Tome and Principe", label: "Sao Tome and Principe" }
    , { value: "Saudi Arabia", label: "Saudi Arabia" }
    , { value: "Senegal", label: "Senegal" }
    , { value: "Serbia", label: "Serbia" }
    , { value: "Seychelles", label: "Seychelles" }
    , { value: "Sierra Leone", label: "Sierra Leone" }
    , { value: "Singapore", label: "Singapore" }
    , { value: "Slovakia", label: "Slovakia" }
    , { value: "Slovenia", label: "Slovenia" }
    , { value: "Solomon Islands", label: "Solomon Islands" }
    , { value: "Somalia", label: "Somalia" }
    , { value: "South Africa", label: "South Africa" }
    , { value: "South Georgia and the South Sandwich Islands", label: "South Georgia and the South Sandwich Islands" }
    , { value: "Spain", label: "Spain" }
    , { value: "Sri Lanka", label: "Sri Lanka" }
    , { value: "Sudan", label: "Sudan" }
    , { value: "Suriname", label: "Suriname" }
    , { value: "Svalbard and Jan Mayen", label: "Svalbard and Jan Mayen" }
    , { value: "Swaziland", label: "Swaziland" }
    , { value: "Sweden", label: "Sweden" }
    , { value: "Switzerland", label: "Switzerland" }
    , { value: "Taiwan", label: "Taiwan" }
    , { value: "Tajikistan", label: "Tajikistan" }
    , { value: "Tanzania, United Republic of", label: "Tanzania, United Republic of" }
    , { value: "Thailand", label: "Thailand" }
    , { value: "Timor-Leste", label: "Timor-Leste" }
    , { value: "Togo", label: "Togo" }
    , { value: "Tokelau", label: "Tokelau" }
    , { value: "Tonga", label: "Tonga" }
    , { value: "Trinidad and Tobago", label: "Trinidad and Tobago" }
    , { value: "Tunisia", label: "Tunisia" }
    , { value: "Turkey", label: "Turkey" }
    , { value: "Turkmenistan", label: "Turkmenistan" }
    , { value: "Turks and Caicos Islands", label: "Turks and Caicos Islands" }
    , { value: "Tuvalu", label: "Tuvalu" }
    , { value: "Uganda", label: "Uganda" }
    , { value: "Ukraine", label: "Ukraine" }
    , { value: "United Arab Emirates", label: "United Arab Emirates" }
    , { value: "United Kingdom", label: "United Kingdom" }
    , { value: "United States", label: "United States" }
    , { value: "United States Minor Outlying Islands", label: "United States Minor Outlying Islands" }
    , { value: "Uruguay", label: "Uruguay" }
    , { value: "Uzbekistan", label: "Uzbekistan" }
    , { value: "Vanuatu", label: "Vanuatu" }
    , { value: "Venezuela", label: "Venezuela" }
    , { value: "Viet Nam", label: "Viet Nam" }
    , { value: "Virgin Islands, British", label: "Virgin Islands, British" }
    , { value: "Virgin Islands, U.S.", label: "Virgin Islands, U.S." }
    , { value: "Wallis and Futuna", label: "Wallis and Futuna" }
    , { value: "Western Sahara", label: "Western Sahara" }
    , { value: "Yemen", label: "Yemen" }
    , { value: "Zambia", label: "Zambia" }
    , { value: "Zimbabwe", label: "Zimbabwe" }
  ]

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
    { value: 11, label: "Add Art Work" },
    { value: 12, label: "Art Work Added" },
    { value: 13, label: "Art Work Approved" },
    { value: 14, label: "Art Work Rejected" },
    { value: 15, label: "Shipped" }
   // { value: 11, label: "Processing" },
    ////{ value: 12, label: "Awaiting Payment" },
    //{ value: 13, label: "Awaiting Fulfillment" },
   // { value: 14, label: "Awaiting Shipment" },
    //{ value: 15, label: "High Risk" },
    //{ value: 16, label: "Pre-Orders" },
    //{ value: 17, label: "Incomplete" },
   // { value: 18, label: "Archived" },
   // { value: 19, label: "Refunded" },
   
  ];
  public static CategoryList = [
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
  ];

}
