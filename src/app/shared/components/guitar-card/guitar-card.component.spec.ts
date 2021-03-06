import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GuitarCardComponent } from './guitar-card.component';

describe('GuitarCardComponent', () => {
  let component: GuitarCardComponent;
  let fixture: ComponentFixture<GuitarCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GuitarCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuitarCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
