import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateBusComponent } from './state-bus.component';

describe('StateBusComponent', () => {
  let component: StateBusComponent;
  let fixture: ComponentFixture<StateBusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateBusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
