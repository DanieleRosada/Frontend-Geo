import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBusComponent } from './info-bus.component';

describe('InfoBusComponent', () => {
  let component: InfoBusComponent;
  let fixture: ComponentFixture<InfoBusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoBusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
