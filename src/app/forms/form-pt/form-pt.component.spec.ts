import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPtComponent } from './form-pt.component';

describe('FormPtComponent', () => {
  let component: FormPtComponent;
  let fixture: ComponentFixture<FormPtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormPtComponent]
    });
    fixture = TestBed.createComponent(FormPtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
