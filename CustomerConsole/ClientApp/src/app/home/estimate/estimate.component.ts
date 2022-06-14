import { Component, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-estimate',
  templateUrl: './estimate.component.html',
  styleUrls: ['./estimate.component.scss']
})
export class EstimateComponent implements OnInit {

  selectedProductCat = "Advertising Flags";
  selectedProduct = 0;

  constructor() { }

  categorySelected(event) {
    console.log(event);
    this.selectedProduct = this.productCatSpecificFields[this.selectedProductCat][0].id;
  }

  designProof = {
    label: 'Deisgn Proof:', options: [
      { id: 1, name: 'No Proof, Run As Is' },
      { id: 1, name: 'Email Proof' },
    ]
  };

  carryBagOption = {
    label: 'Carry Bag:', options: [
      { id: 'Yes', name: 'Yes' },
      { id: 'No', name: 'No' },
    ]
  };

  flagPoleOption = {
    label: 'Flag Pole:',
    options: [
      { id: 'Flag + Pole', name: 'Flag + Pole', selected: true },
      { id: 'Flag Only', name: 'Flag Only' }
    ]
  };
  graphicOption = {
    label: 'Graphic:',
    options: [
      { id: 'Single Sided Print Thru', name: 'Single Sided Print Thru', selected: true },
      { id: 'Single Sided Print Thru Reverse', name: 'Single Sided Print Thru Reverse' },
      { id: 'Double Sided', name: 'Double Sided' },
    ]
  };
  baseOption = {
    label: 'Base:',
    options: [
      { id: 'Ground Stake', name: 'Ground Stake', selected: true },
      { id: 'Cross Base', name: 'Cross Base' },
      { id: 'Cross Base + Ground Stake', name: 'Cross Base + Ground Stake' },
      { id: 'Cross Base + WaterBag', name: 'Cross Base + WaterBag' },
      { id: 'Square Base', name: 'Square Base' },
      { id: 'No Hardware (Flag Only)', name: 'No Hardware (Flag Only)' }
    ]
  };
  tensionFabrichardwareOption = {
    label: 'Hardware:',
    options: [
      { id: 'Stand + Insert', name: 'Stand + Insert', selected: true },
      { id: 'Insert Only', name: 'Insert Only' }
    ]
  };
  insertOption = {
    label: 'Insert:',
    options: [
      { id: '13 oz. Matte Vinyl Banner', name: '13 oz. Matte Vinyl Banner', selected: true },
      { id: 'UV Printed Fabric', name: 'UV Printed Fabric' }
    ]
  };
  sizeOption = {
    label: 'Size:',
    options: [
      { id: '33" x 81"', name: '33" x 81"', selected: true },
    ]
  };
  hardwareOption = {
    label: 'Hardware:',
    options: [
      { id: 'Stand + Insert', name: 'Stand + Insert', selected: true },
    ]
  };
  sidesOption = {
    label: '# of Sides:',
    options: [
      { id: '1 Side', name: '1 Side', selected: true },
      { id: '2 Side', name: '2 Side' }
    ]
  };
  ledOption = {
    label: 'LED Lights:',
    options: [
      { id: 'No', name: 'No', selected: true },
      { id: '2 LED Lights', name: '2 LED Lights' }
    ]
  };
  realestateHardwareOption = {
    label: 'Hardware:',
    options: [
      { id: 'Sign + Frame', name: 'Sign + Frame', selected: true },
      { id: 'Sign Only', name: 'Sign Only' }
    ]
  };
  graphicOption2 = {
    label: 'Graphic:',
    options: [
      { id: 'Double Sided', name: 'Double Sided', selected: true }
    ]
  };
  realestateRiderOption = {
    label: 'Rider:',
    options: [
      { id: 'No', name: 'No', selected: true },
      { id: 'Yes', name: 'Yes' }

    ]
  };
  realestateSizeOption = {
    label: 'Size:',
    options: [
      { id: '24" x 18"', name: '24" x 18"', selected: true }
    ]
  };
  realestateMaterialOption = {
    label: 'Material:',
    options: [
      { id: '4mm White Coroplast', name: '4mm White Coroplast', selected: true }
    ]
  };
  materialOption = {
    label: 'Material:',
    options: [
      { id: 'Double White Popup', name: 'Double White Popup', selected: true }
    ]
  };
  snapPosterHardwareOption2 = {
    label: 'Hardware:',
    options: [
      { id: 'Print + Hardware', name: 'Print + Hardware', selected: true }
    ]
  };
  snapPosterHardwareOption1 = {
    label: 'Hardware:',
    options: [
      { id: "Print + Hardware", name: "Print + Hardware", selected: true },
      { id: "Hardware Only", name: "Hardware Only" }
    ]
  };
  laminationOption = {
    label: 'Lamination:',
    options: [
      { id: 'UV Printed', name: 'UV Printed', selected: true }
    ]
  };
  standingDisplaysHardwareOption = {
    label: 'Lamination:',
    options: [
      { id: 'Stand + Print', name: 'Stand + Print', selected: true },
      { id: 'Stand Only', name: 'Stand Only' }
    ]
  };



  flagProductFields = [
    this.flagPoleOption,
    this.graphicOption,
    this.baseOption,
    this.carryBagOption,
    this.designProof
  ];
  customPoleFlagFields = [
    {
      label: 'Width:',

      options: [
        { id: 'Yes', name: 'Yes', selected: true },
        { id: 'No', name: 'No' },
      ]
    },
    {
      label: 'Height:',

      options: [
        { id: 'Yes', name: 'Yes', selected: true },
        { id: 'No', name: 'No' },
      ]
    },
    this.flagPoleOption,
    {
      label: 'Bracket:',
      options: [
        { id: 'Yes', name: 'Yes', selected: true },
        { id: 'No', name: 'No' },
      ]
    },
    {
      label: 'Flag Graphic:',
      options: [
        { id: 'Single Sided Print Thru', name: 'Single Sided Print Thru', selected: true },
        { id: 'Double Sided', name: 'Double Sided' },
      ]
    },
    {
      label: 'Finishing:',
      options: [
        { id: 'Hem w/ Grommet Strip - Left', name: 'Hem w/ Grommet Strip - Left', selected: true },
        { id: 'Hem w/ Grommet Strip - Top', name: 'Hem w/ Grommet Strip - Top' },
        { id: 'Hem Only (No Grommets)', name: 'Hem Only (No Grommets)' },
        { id: 'Custom Pole Pocket', name: 'Custom Pole Pocket' },
      ]
    },
    this.designProof
  ];

  ecnoFeatherFlagFeilds = [
    this.flagPoleOption,
    {
      label: 'Graphic:', options: [
        { id: 'Single Sided Print Thru', name: 'Single Sided Print Thru', selected: true },
        { id: 'Single Sided Print Thru Reverse', name: 'Single Sided Print Thru Reverse' },
      ]
    },
    {
      label: 'Base:', options: [
        { id: 'Ground Stake', name: 'Ground Stake', selected: true },
        { id: 'No Hardware(Flag Only)', name: 'No Hardware(Flag Only)' }
      ]
    },
    this.designProof
  ];

  bannerStandFields = [
    this.materialOption,
    this.laminationOption,
    this.designProof
  ];

  tensionFabricStand = [
    this.tensionFabrichardwareOption,
    this.sidesOption,
    this.ledOption,
    this.designProof
  ];
  tensionFabricStand2 = [
    this.tensionFabrichardwareOption,
    this.sidesOption,
    this.designProof
  ];
  rsAframeFields = [
    this.realestateSizeOption,
    this.realestateHardwareOption,
    this.graphicOption2,
    {
      label: 'Grommets:',
      options: [
        { id: 'Grommets (Top Two Corner)', name: 'Grommets (Top Two Corner)', selected: true }
      ]
    },
    this.realestateRiderOption,
    {
      label: 'Pennant Flag:',
      options: [
        { id: 'No', name: 'No', selected: true },
        { id: 'Yes', name: 'Yes' }
      ]
    }
  ];
  yardSignFields = [
    {
      label: 'Sign + H-Stake:',
      options: [
        { id: 'Sign + H-Stake', name: 'Sign + H-Stake', selected: true },
        { id: 'Sign Only', name: 'Sign Only' }
      ]
    },
    this.realestateSizeOption,
    this.graphicOption2,
    this.materialOption
  ];
  realestateFrameFields = [
    this.realestateSizeOption,
    this.realestateHardwareOption,
    this.graphicOption2,
    this.materialOption,
    this.realestateRiderOption,
  ];
  realestatePostFields = [
    {
      label: 'Post Stand:',
      options: [
        { id: 'Small Post (36")', name: 'Small Post (36")', selected: true },
        { id: 'Large Post (48")', name: 'Large Post (48")' }
      ]
    },
    {
      label: 'Hanging Sign:',
      options: [
        { id: '24" x 18"', name: '24" x 18"', selected: true },
        { id: '24" x 36"', name: '24" x 36"' },
        { id: '36" x 24"', name: '36" x 24"' },
        { id: '36" x 48"', name: '36" x 48"' }
      ]
    },
    {
      label: 'Rider:',
      options: [
        { id: 'No Rider', name: 'No Rider', selected: true },
        { id: '24" x 6" Rider Sign', name: '24" x 6" Rider Sign' },
        { id: '36" x 6" Rider Sign', name: '36" x 6" Rider Sign' }

      ]
    },
    {
      label: 'Hardware:',
      options: [
        { id: 'Post + Sign', name: 'Post + Sign', selected: true }
      ]
    },
    this.graphicOption2,
    {
      label: 'Holes Punch:',
      options: [
        { id: 'Top Corners for 24"', name: 'Top Corners for 24"', selected: true }
      ]
    },
  ];

  repeatBackdropFields = [
    {
      label: 'Insert:',
      options: [
        { id: '9 oz Wrinkle Free Fabric', name: '9 oz Wrinkle Free Fabric', selected: true }
      ]
    },
    {
      label: 'Size:',
      options: [
        { id: "8' W x 8' H", name: "8' W x 8' H", selected: true },
        { id: "9' W x 8' H", name: "9' W x 8' H" },
        { id: "10' W x 8' H", name: "10' W x 8' H" },
        { id: 'Custom Size', name: 'Custom Size' }
      ]
    },
    this.hardwareOption,
    this.designProof
  ];
  snapPosterHangerFields1 = [
    {
      label: 'Size:',
      options: this.getInches(24, 24, 18, 100)
    },
    this.sidesOption,
    this.snapPosterHardwareOption1,
    this.materialOption,
    this.laminationOption,
    this.designProof
  ];
  snapPosterHangerFields2 = [
    {
      label: 'Size:',
      options: this.getInches(36, 36, 18, 100)
    },
    this.sidesOption,
    this.snapPosterHardwareOption2,
    this.materialOption,
    this.laminationOption,
    this.designProof
  ];
  snapPosterHangerFields3 = [
    {
      label: 'Size:',
      options: this.getInches(48, 48, 18, 100)
    },
    this.sidesOption,
    this.snapPosterHardwareOption2,
    this.materialOption,
    this.laminationOption,
    this.designProof
  ];
   snapPosterHangerFields4 = [
    this.snapPosterHardwareOption1
  ];
  standingDisplaysFields1 = [
    {
      label: 'Size:',
      options: [
        { id: '22" x 28"', name: '22" x 28"', selected: true }
      ]
    },
    this.standingDisplaysHardwareOption,
    this.graphicOption2,
    {
      label: 'Material:',
      options: [
        { id: '1/8" white PVC', name: '1/8" white PVC"', selected: true }
      ]
    }
  ];
  standingDisplaysFields2 = [
    this.standingDisplaysHardwareOption
  ];

  getInches(start1, end1, start2, end2) {
    var options = [];
    for (var i = start1; i <= end1; i++) {
      for (var j = start2; j <= end2; j++) {
        options.push({ id: i + '" x ' + j + '"', name: i + '" x ' + j + '"', selected: true });
      }
    }
    return options;
  }

  ngOnInit(): void {
  }

  productCatSpecificFields = {
    "Advertising Flags": [
      { id: 0, name: "Econo Feather Flag", children: this.ecnoFeatherFlagFeilds },
      { id: 1, name: "Teardrop Flag (X-Large)", children: this.flagProductFields },
      { id: 2, name: "Teardrop Flag (Large)", children: this.flagProductFields },
      { id: 3, name: "Teardrop Flag (Medium)", children: this.flagProductFields },
      { id: 4, name: "Teardrop Flag (Small)", children: this.flagProductFields },
      { id: 5, name: "Feather Convex Flag (X-Large)", children: this.flagProductFields },
      { id: 6, name: "Feather Convex Flag (Large)", children: this.flagProductFields },
      { id: 7, name: "SFeather Convex Flag (Medium)", children: this.flagProductFields },
      { id: 8, name: "Feather Convex Flag (Small)", children: this.flagProductFields },
      { id: 9, name: "Feather Angled Flag (X-Large)", children: this.flagProductFields },
      { id: 10, name: "Feather Angled Flag (Large)", children: this.flagProductFields },
      { id: 11, name: "Feather Angled Flag (Medium)", children: this.flagProductFields },
      { id: 12, name: "Feather Angled Flag (Small)", children: this.flagProductFields },
      { id: 13, name: "Rectangle Flag (Large)", children: this.flagProductFields },
      { id: 14, name: "Rectangle Flag (Medium)", children: this.flagProductFields },
      { id: 15, name: "Rectangle Flag (Small)", children: this.flagProductFields },
      { id: 16, name: "Custom Pole Flag", children: this.customPoleFlagFields },
    ],
    "Banner Stands > Stand + Insert": [
      { id: 0, name: 'Table Top Banner Stand 11.5"x17.5"', children: this.bannerStandFields },
      { id: 1, name: 'Tension Fabric Stand 36"x90"', children: this.tensionFabricStand },
      { id: 2, name: 'Tension Fabric Stand 48"x90"', children: this.tensionFabricStand },
    ],
    "Banner Stands > Insert Only": [
      { id: 0, name: 'Tension Fabric Stand 36"x90"', children: this.tensionFabricStand2 },
      { id: 1, name: 'Tension Fabric Stand 48"x90"', children: this.tensionFabricStand2 },
    ],
    "Real Estate Products": [
      { id: 0, name: 'Real Estate A-Frame', children: this.rsAframeFields },
      { id: 1, name: 'Yard Sign and H-Stake', children: this.yardSignFields },
      { id: 2, name: 'Real Estate Frame', children: this.realestateFrameFields },
      { id: 3, name: 'Real Estate Post', children: this.realestatePostFields },
    ],
    "Step and Repeat Backdrop": [
      { id: 0, name: 'Step and Repeat Backdrop', children: this.repeatBackdropFields },
    ],
    "Hanging Displays > Graphic + Hardware": [
      { id: 0, name: 'Snap Poster Hanger 24" (W)', children: this.snapPosterHangerFields1 },
      { id: 1, name: 'Snap Poster Hanger 36" (W)', children: this.snapPosterHangerFields2 },
      { id: 2, name: 'Snap Poster Hanger 487" (W)', children: this.snapPosterHangerFields3 },
    ],
    "Hanging Displays > Hardware": [
      { id: 0, name: 'Snap Poster Hanger-24" (W)', children: this.snapPosterHangerFields4 },
    ],
    "Standing Displays": [
      { id: 0, name: '22" x 28" Poster Stand', children: this.standingDisplaysFields1 },
      { id: 1, name: '22" x 28" Poster Stand (Hardware Only)', children: this.standingDisplaysFields2 },
    ],
    "Signicade A-Frame": [
      { id: 0, name: 'White Standard Signicade' },
      { id: 1, name: 'Black Deluxe Signicade' },
      { id: 2, name: 'White Deluxe Signicade' },
      { id: 3, name: 'White Simposign A-Frame' },
    ],
    "Trade Show Products > Hardware": [
      { id: 0, name: 'LED Light (Trade Show Display)' },
    ],
    "Trade Show Products > Graphic": [
      { id: 0, name: '6ft Curve Tension Fabric Display (Graphic Replacement)' },
      { id: 1, name: '10ft Curve Tension Fabric Display (Graphic Replacement)' },
      { id: 2, name: '8ft Curve Tension Fabric Display (Graphic Replacement)' },
      { id: 3, name: '8ft Straight Tension Fabric Display (Graphic Replacement)' },
      { id: 4, name: '10ft Straight Tension Fabric Display (Graphic Replacement)' },
      { id: 5, name: '20ft Straight Tension Fabric Display (Graphic Replacement)' },
      { id: 6, name: '8ft Curve Velcro Fabric Pop Up Display (Graphic Replacement)' },
      { id: 7, name: '10ft Curve Velcro Fabric Pop Up Display (Graphic Replacement)' },
      { id: 8, name: '8ft Straight  Velcro Fabric Pop Up Display (Graphic Replacement)' },
      { id: 9, name: '10ft Straight Velcro Fabric Pop Up Display (Graphic Replacement)' },
      { id: 10, name: 'Podium Graphic' },
    ],
    "Trade Show Products": [
      { id: 0, name: '6ft Curve Tension Fabric Display' },
      { id: 1, name: '8ft Curve Tension Fabric Display' },
      { id: 2, name: '8ft Curve Tension Fabric Display (Graphic Replacement)' },
      { id: 3, name: '10ft Curve Tension Fabric Display' },
      { id: 4, name: '8ft Straight Tension Fabric Display' },
      { id: 5, name: '10ft Straight Tension Fabric Display' },
      { id: 6, name: '20ft Straight Tension Fabric Display' },
      { id: 7, name: '8ft Curve Velcro Fabric Pop Up Display' },
      { id: 8, name: '10ft Curve Velcro Fabric Pop Up Display' },
      { id: 9, name: '8ft Straight Velcro Fabric Pop Up Display' },
      { id: 10, name: '10ft Straight Velcro Fabric Pop Up Display' },
    ],
    "Custom Event Tent": [
      { id: 0, name: 'Event Tent (Full Color)' },
      { id: 1, name: 'Tent Full Wall (Full Color)' },
      { id: 2, name: 'Tent Half Wall (Full Color)' },
      { id: 3, name: 'Tent Flag' },
    ],
    "Table Throw > Black Stretch Table Throw": [
      { id: 0, name: '4ft Black Stretch Table Throw' },
      { id: 1, name: '8ft Black Stretch Table Throw' },
    ],
    "Table Throw": [
      { id: 0, name: 'Table Runner Only' },
      { id: 1, name: 'Solid Color Table Throws (Assorted Colors)' },
      { id: 2, name: 'Table Runner + Solid Color Throw Combo' },
      { id: 3, name: 'Black Stretch Table Covers' },
      { id: 4, name: '4ft Table Cover 3 sided (Open Back)' },
      { id: 5, name: '4ft Table Cover 4 sided (Close Back)' },
      { id: 6, name: '6ft Table Cover 3 sided (Open Back)' },
      { id: 7, name: '6ft Table Cover 4 sided (Close Back)' },
      { id: 8, name: '8ft Table Cover 3 sided (Open Back)' },
      { id: 9, name: '8ft Table Cover 3 sided (Close Back)' },
      { id: 10, name: '6ft Stretch Table Cover' },
      { id: 11, name: '8ft Stretch Table Cover' },
    ],
    "Hardware Only > Event Tent Hardware": [
      { id: 0, name: 'Event Tent Hardware Only' },
    ],
    "Banners": [
      { id: 0, name: 'Vinyl Banner (13oz.)' },
      { id: 1, name: 'Vinyl Banner (18oz. Blockout)' },
      { id: 2, name: 'Vinyl Banner (Backlit)' },
      { id: 3, name: 'Mesh Banners' },
      { id: 4, name: 'Super Smooth (Indoor Banner)' },
      { id: 5, name: 'Pole Banner Set' },
      { id: 6, name: 'Fabric Banner (9 oz. Wrinkle Free)' },
      { id: 7, name: 'Fabric Banner (9.5oz. Blockout)' },
      { id: 8, name: 'Tension Fabric' },
    ],
    "Wall Art": [
      { id: 0, name: 'Canvas Wrap' },
      { id: 1, name: 'Framed Canvas' },
      { id: 2, name: 'Framed Poster' },
      { id: 3, name: 'Acrylic Prints' },
      { id: 4, name: 'Wood Frame Hanger' },
      { id: 5, name: 'Framed Prints' },
    ],
    "Adhesive Products": [
      { id: 0, name: 'Adhesive Vinyl' },
      { id: 1, name: 'Adhesive Vinyl (High Performance)' },
      { id: 2, name: 'Adhesive Clear Vinyl' },
      { id: 3, name: 'Adhesive Translucent Vinyl' },
      { id: 4, name: 'Adhesive Window Perf' },
      { id: 5, name: 'Vehicle Wrap (3M Cast)' },
      { id: 6, name: 'Floor Graphics' },
      { id: 7, name: 'Wall Graphics' },
      { id: 8, name: 'Etched (Printable Frosted Vinyl)' },
    ],
    "Rigid Signs and Magnets": [
      { id: 0, name: 'Magnets' },
      { id: 1, name: 'Coroplast' },
      { id: 2, name: 'PVC Board' },
      { id: 3, name: 'Aluminum Sandwich Board' },
      { id: 4, name: 'Foamcore' },
      { id: 5, name: 'GatorFoam' },
      { id: 6, name: 'Aluminum Sign' },
    ],
    "Reflective Products": [
      { id: 0, name: 'Reflective Adhesive Vinyl' },
      { id: 1, name: 'Reflective Signicade A-Frame' },
      { id: 2, name: 'Reflective Car Magnet' },
      { id: 3, name: 'Reflective Coroplast' },
      { id: 4, name: 'Reflective Aluminum Sandwich Board' },
      { id: 5, name: 'Reflective Aluminum Sign' },
      { id: 6, name: 'Reflective Foamcore' },
      { id: 7, name: 'Reflective GatorFoam' },
      { id: 8, name: 'Reflective PVC Board' },
    ],
    "Dry Erase Products": [
      { id: 0, name: 'Dry Erase Adhesive Vinyl' },
      { id: 1, name: 'Dry Erase Signicade A-Frame' },
      { id: 2, name: 'Dry Erase Magnet' },
      { id: 3, name: 'Dry Erase Coroplast' },
      { id: 4, name: 'Dry Erase Aluminum Sandwich Board' },
      { id: 5, name: 'Dry Erase Foamcore' },
      { id: 6, name: 'Dry Erase PVC Board' },
    ],
    "Large Format": [
      { id: 0, name: 'Backlit Film' },
      { id: 1, name: 'Premium Window Cling' },
      { id: 2, name: 'Posters' },
      { id: 3, name: 'Styrene' },
      { id: 4, name: 'Popup' },
      { id: 5, name: 'Canvas Roll' },
    ],
    "Others": [
      { id: 0, name: 'Other Product' },
    ]
  }


  category = [
    { id: "Advertising Flags", name: "Advertising Flags" },
    { id: "Banner Stands > Stand + Insert", name: "Banner Stands > Stand + Insert" },
    { id: "Banner Stands > Insert Only", name: "Banner Stands > Insert Only" },
    { id: "Real Estate Products", name: "Real Estate Products" },
    { id: "Step and Repeat Backdrop", name: "Step and Repeat Backdrop" },
    { id: "Hanging Displays > Graphic + Hardware", name: "Hanging Displays > Graphic + Hardware" },
    { id: "Hanging Displays > Hardware", name: "Hanging Displays > Hardware" },
    { id: "Standing Displays", name: "Standing Displays" },
    { id: "Signicade A-Frame", name: "Signicade A-Frame" },
    { id: "Trade Show Products > Hardware", name: "Trade Show Products > Hardware" },
    { id: "Trade Show Products > Graphic", name: "Trade Show Products > Graphic" },
    { id: "Trade Show Products", name: "Trade Show Products" },
    { id: "Custom Event Tent", name: "Custom Event Tent" },
    { id: "Table Throw > Black Stretch Table Throw", name: "Table Throw > Black Stretch Table Throw" },
    { id: "Table Throw", name: "Table Throw" },
    { id: "Hardware Only > Event Tent Hardware", name: "Hardware Only > Event Tent Hardware" },
    { id: "Banners", name: "Banners" },
    { id: "Wall Art", name: "Wall Art" },
    { id: "Adhesive Products", name: "Adhesive Products" },
    { id: "Rigid Signs and Magnets", name: "Rigid Signs and Magnets" },
    { id: "Reflective Products", name: "Reflective Products" },
    { id: "Dry Erase Products", name: "Dry Erase Products" },
    { id: "Large Format", name: "Large Format" },
    { id: "Others", name: "Others" },
  ];

}
