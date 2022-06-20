import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedHomesComponent } from './saved-homes.component';

describe('SavedHomesComponent', () => {
  let component: SavedHomesComponent;
  let fixture: ComponentFixture<SavedHomesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedHomesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedHomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
