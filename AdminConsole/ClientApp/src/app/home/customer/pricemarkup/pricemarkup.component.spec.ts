import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricemarkupComponent } from './pricemarkup.component';

describe('PricemarkupComponent', () => {
  let component: PricemarkupComponent;
  let fixture: ComponentFixture<PricemarkupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricemarkupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PricemarkupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
