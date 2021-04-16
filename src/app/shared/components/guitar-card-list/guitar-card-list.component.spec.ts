import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuitarCardListComponent } from './guitar-card-list.component';

describe('GuitarCardListComponent', () => {
  let component: GuitarCardListComponent;
  let fixture: ComponentFixture<GuitarCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuitarCardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuitarCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
