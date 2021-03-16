import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotchComponent } from './notch.component';

describe('NotchComponent', () => {
  let component: NotchComponent;
  let fixture: ComponentFixture<NotchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
