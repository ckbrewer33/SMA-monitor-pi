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
  private readonly UNITS = {
    WATT: 'W',
    WATT_HOUR: 'Wh',
    KILO_WATT_HOUR: 'kWh',
    MEGA_WATT_HOUR: 'MWh'
  }
  private readonly ONE_MEGAWATT = 1000000;
  private readonly ONE_KILOWATT = 1000;

  pvPower = 0;
  pvPowerMax = 7000;
  pvPowerUnits = this.UNITS.WATT

  pvEnergyToday = 0.0;
  pvEnergyTodayUnits = this.UNITS.KILO_WATT_HOUR;

  pvEnergyTotal = 0.0;
  pvEnergyTotalUnits = this.UNITS.KILO_WATT_HOUR;

  constructor(private smaService: SmaService) { }

  ngOnInit(): void {
    this.initPowerTotal();
    this.subscriptions.push(this.getCurrentPowerSubscription());
    this.subscriptions.push(this.getPvEnergyTodaySubscription());
    this.pvPowerMax = this.smaService.pvPowerMax;
  }

  ngOnDestroy(): void {
    this.closeAllSubscriptions();
  }

  private closeAllSubscriptions(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private getCurrentPowerSubscription(): Subscription {
    return this.smaService.currentPower.subscribe((currentPower => this.pvPower = currentPower));
  }

  private getPvEnergyTodaySubscription(): Subscription {
    return this.smaService.powerToday.subscribe((powerToday => {
      this.updatePowerToday(powerToday);
    }));
  }

  private updatePowerToday(wattsToday: number): void {
    if (wattsToday > this.ONE_KILOWATT) {
      this.pvEnergyToday = this.convertWattToKwatt(wattsToday);
      this.pvEnergyTodayUnits = this.UNITS.KILO_WATT_HOUR;
      return;
    }

    this.pvEnergyToday = wattsToday;
    this.pvEnergyTodayUnits = this.UNITS.WATT_HOUR;
  }

  private initPowerTotal(): void {
    this.smaService.powerTotal.subscribe(wattsTotal => {
      if (wattsTotal > this.ONE_MEGAWATT) {
        this.pvEnergyTotal = this.convertWattToMwatt(wattsTotal);
        this.pvEnergyTotalUnits = this.UNITS.MEGA_WATT_HOUR;
        return;
      }

      if (wattsTotal > this.ONE_KILOWATT) {
        this.pvEnergyTotal = this.convertWattToKwatt(wattsTotal);
        this.pvEnergyTotalUnits = this.UNITS.KILO_WATT_HOUR;
        return;
      }
  
      this.pvEnergyTotal = wattsTotal;
      this.pvEnergyTodayUnits = this.UNITS.WATT;
    });
  }

  private convertWattToKwatt(watts: number): number {
    return watts / this.ONE_KILOWATT;
  }

  private convertWattToMwatt(watts: number): number {
    return watts / this.ONE_MEGAWATT
  }
}
