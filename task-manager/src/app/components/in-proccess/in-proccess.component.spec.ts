import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InProccessComponent } from './in-proccess.component';

describe('InProccessComponent', () => {
  let component: InProccessComponent;
  let fixture: ComponentFixture<InProccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InProccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InProccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
