import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneExpertComponent } from './one-expert.component';

describe('OneExpertComponent', () => {
  let component: OneExpertComponent;
  let fixture: ComponentFixture<OneExpertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneExpertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneExpertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
