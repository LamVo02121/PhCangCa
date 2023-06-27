import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HangTsComponent } from './hang-ts.component';

describe('HangTsComponent', () => {
  let component: HangTsComponent;
  let fixture: ComponentFixture<HangTsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HangTsComponent]
    });
    fixture = TestBed.createComponent(HangTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
