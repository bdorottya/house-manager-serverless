import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PleaseSignInComponent } from './please-sign-in.component';

describe('PleaseSignInComponent', () => {
  let component: PleaseSignInComponent;
  let fixture: ComponentFixture<PleaseSignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PleaseSignInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PleaseSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
