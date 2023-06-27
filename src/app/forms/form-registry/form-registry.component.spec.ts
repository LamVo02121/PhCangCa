import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegistryComponent } from './form-registry.component';

describe('FormRegistryComponent', () => {
  let component: FormRegistryComponent;
  let fixture: ComponentFixture<FormRegistryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormRegistryComponent]
    });
    fixture = TestBed.createComponent(FormRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
