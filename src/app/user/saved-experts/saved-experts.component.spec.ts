import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedExpertsComponent } from './saved-experts.component';

describe('SavedExpertsComponent', () => {
  let component: SavedExpertsComponent;
  let fixture: ComponentFixture<SavedExpertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedExpertsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedExpertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
