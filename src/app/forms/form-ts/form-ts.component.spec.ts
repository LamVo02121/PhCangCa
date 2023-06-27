import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTsComponent } from './form-ts.component';

describe('FormTsComponent', () => {
  let component: FormTsComponent;
  let fixture: ComponentFixture<FormTsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormTsComponent]
    });
    fixture = TestBed.createComponent(FormTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
