import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyArtworkComponent } from './my-artwork.component';

describe('MyArtworkComponent', () => {
  let component: MyArtworkComponent;
  let fixture: ComponentFixture<MyArtworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyArtworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyArtworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
