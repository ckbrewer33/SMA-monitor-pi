import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NumberBarComponent } from './number-bar.component';

describe('NumberBarComponent', () => {
  let component: NumberBarComponent;
  let fixture: ComponentFixture<NumberBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberBarComponent ],
      imports: [
        NoopAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
