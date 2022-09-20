import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'sunnypi-number-bar-widget',
  templateUrl: './number-bar-widget.component.html',
  styleUrls: ['./number-bar-widget.component.scss'],
  animations: [
    trigger('stateChange', [
      state('low', style({
        backgroundColor: 'red'
      })),
      state('med', style({
        backgroundColor: 'yellow'
      })),
      state('hight', style({
        backgroundColor: 'green'
      })),
      transition('* => low, * => med, * => high', [
        animate('0.5s')
      ])
    ])
  ]
})
export class NumberBarWidgetComponent implements OnInit {
  @Input() title = "untitled";
  @Input() fillPercent = 50;

  private readonly lowPercent = 33;
  private readonly medPercent = 66;

  states = {
    low: 'low',
    med: 'med',
    high: 'high'
  };
  state = this.states.low;

  highColor = 'green';
  medColor = 'yellow';
  lowColor = 'red'

  constructor() { }

  ngOnInit(): void {
    this.state = this.getStateFromFillPercent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fillPercent']) {
      this.state = this.getStateFromFillPercent();
    }
  }

  private getStateFromFillPercent(): string {
    if (this.fillPercent < this.lowPercent) {
      return this.states.low;
    }

    const higherThanLow = this.fillPercent > this.lowPercent;
    const lowerThanHigh = this.fillPercent < this.medPercent;
    if (higherThanLow && lowerThanHigh) {
      return this.states.med;
    }

    return this.states.high;
  }
}
