import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { SmaService } from './sma.service';

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
  pvEnergyToday = 7.0;
  pvEnergyTodayUnits = 'kWh';

  constructor(private productionService: SmaService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.getCurrentPowerSubscription());
    this.subscriptions.push(this.getPvEnergyTodaySubscription());
  }

  private getCurrentPowerSubscription(): Subscription {
    return this.productionService.productionPercent.subscribe((data => this.pvPower = data));
  }

  private getPvEnergyTodaySubscription(): Subscription {
    return this.productionService.pvEnergy.subscribe((data => {
      // Test to make sure the energy value doesn't go negative.
      // Yes, this is just fake data, but may as well make it look good.
      const tmp = this.pvEnergyToday + data;
      if (tmp < 0) {
        this.pvEnergyToday = 0;
      } else {
        this.pvEnergyToday = tmp;
      }
    }));
  }

  ngOnDestroy(): void {
    this.closeAllSubscriptions();
  }

  private closeAllSubscriptions(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
