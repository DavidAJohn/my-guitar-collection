import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuitarCardActionsComponent } from './guitar-card-actions.component';

describe('GuitarCardActionsComponent', () => {
  let component: GuitarCardActionsComponent;
  let fixture: ComponentFixture<GuitarCardActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuitarCardActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuitarCardActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
