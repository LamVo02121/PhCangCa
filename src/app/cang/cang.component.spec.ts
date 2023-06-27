import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CangComponent } from './cang.component';

describe('CangComponent', () => {
  let component: CangComponent;
  let fixture: ComponentFixture<CangComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CangComponent]
    });
    fixture = TestBed.createComponent(CangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
