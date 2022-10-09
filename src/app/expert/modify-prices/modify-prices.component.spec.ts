import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPricesComponent } from './modify-prices.component';

describe('ModifyPricesComponent', () => {
  let component: ModifyPricesComponent;
  let fixture: ComponentFixture<ModifyPricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyPricesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
