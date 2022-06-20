import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllExpertsComponent } from './all-experts.component';

describe('AllExpertsComponent', () => {
  let component: AllExpertsComponent;
  let fixture: ComponentFixture<AllExpertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllExpertsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllExpertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
