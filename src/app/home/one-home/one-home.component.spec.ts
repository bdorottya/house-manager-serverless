import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneHomeComponent } from './one-home.component';

describe('OneHomeComponent', () => {
  let component: OneHomeComponent;
  let fixture: ComponentFixture<OneHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
