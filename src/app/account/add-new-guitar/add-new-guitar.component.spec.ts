import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewGuitarComponent } from './add-new-guitar.component';

describe('AddNewGuitarComponent', () => {
  let component: AddNewGuitarComponent;
  let fixture: ComponentFixture<AddNewGuitarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewGuitarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewGuitarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
