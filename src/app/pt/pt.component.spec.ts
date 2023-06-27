import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtComponent } from './pt.component';

describe('PtComponent', () => {
  let component: PtComponent;
  let fixture: ComponentFixture<PtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PtComponent]
    });
    fixture = TestBed.createComponent(PtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
