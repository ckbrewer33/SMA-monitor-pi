import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { SmaService } from '../sma_sunnyboy/sma.service';


@Component({
  selector: 'sunnypi-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  pvPower = 0;
  pvPowerMax = 7300;
  pvPowerUnits = 'W'
  pvEnergyToday = 0.0;
  pvEnergyTodayUnits = 'kWh';

  constructor(private smaService: SmaService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.getCurrentPowerSubscription());
    this.subscriptions.push(this.getPvEnergyTodaySubscription());
  }

  private getCurrentPowerSubscription(): Subscription {
    return this.smaService.currentProduction.subscribe((data => this.pvPower = data));
  }

  private getPvEnergyTodaySubscription(): Subscription {
    return this.smaService.powerToday.subscribe((data => {
      this.pvEnergyToday = data;
    }));
  }

  ngOnDestroy(): void {
    this.closeAllSubscriptions();
  }

  private closeAllSubscriptions(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
