import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawBusComponent } from './draw-bus.component';

describe('DrawBusComponent', () => {
  let component: DrawBusComponent;
  let fixture: ComponentFixture<DrawBusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawBusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
