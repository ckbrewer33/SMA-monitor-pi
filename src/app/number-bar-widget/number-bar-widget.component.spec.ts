import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NumberBarWidgetComponent } from './number-bar-widget.component';

describe('NumberBarComponent', () => {
  let component: NumberBarWidgetComponent;
  let fixture: ComponentFixture<NumberBarWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberBarWidgetComponent ],
      imports: [
        NoopAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberBarWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
