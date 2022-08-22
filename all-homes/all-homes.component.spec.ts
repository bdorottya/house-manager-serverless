import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllHomesComponent } from './all-homes.component';

describe('AllHomesComponent', () => {
  let component: AllHomesComponent;
  let fixture: ComponentFixture<AllHomesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllHomesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllHomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
