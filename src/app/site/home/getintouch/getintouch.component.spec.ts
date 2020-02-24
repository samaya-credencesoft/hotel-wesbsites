/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GetintouchComponent } from './getintouch.component';

describe('GetintouchComponent', () => {
  let component: GetintouchComponent;
  let fixture: ComponentFixture<GetintouchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetintouchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetintouchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
