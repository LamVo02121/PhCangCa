import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCgcaComponent } from './form-cgca.component';

describe('FormCgcaComponent', () => {
  let component: FormCgcaComponent;
  let fixture: ComponentFixture<FormCgcaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormCgcaComponent]
    });
    fixture = TestBed.createComponent(FormCgcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
