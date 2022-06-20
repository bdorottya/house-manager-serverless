import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetRatingsComponent } from './get-ratings.component';

describe('GetRatingsComponent', () => {
  let component: GetRatingsComponent;
  let fixture: ComponentFixture<GetRatingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetRatingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
