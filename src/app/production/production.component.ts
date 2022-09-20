import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { SmaService } from './sma.service';

@Component({
  selector: 'sunnypi-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss']
})
export class ProductionComponent implements OnInit {
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
    return this.productionService.productionPercent.subscribe((data => this.pvPower = data))
  }

  private getPvEnergyTodaySubscription(): Subscription {
    return this.productionService.pvEnergy.subscribe((data => this.pvEnergyToday += data))
  }

  ngOnDestroy(): void {
    this.closeAllSubscriptions();
  }

  private closeAllSubscriptions(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
