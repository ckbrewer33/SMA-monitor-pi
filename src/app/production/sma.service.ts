import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SmaService {
  private _productionPercent: Observable<number> = new Observable();
  private _pvEnergy: Observable<number> = new Observable();

  private readonly refreshRate = 3000;
  private readonly pvPowerMax = 7300;
  
  constructor() {
    this.initProductionPercentObserver();
    this.initPvEnergyObserver();
  }

  private initProductionPercentObserver() {
    this._productionPercent = new Observable<number>(observer => {
      setInterval(() => {
        let nextNumber = this.getRandomNumber(1, this.pvPowerMax);
        observer.next(nextNumber)
      }, this.refreshRate);
    });
  }

  private initPvEnergyObserver() {
    this._pvEnergy = new Observable<number>(observer => {
      setInterval(() => {
        let nextNumber = this.getRandomNumber(-2, 0);
        observer.next(nextNumber)
      }, this.refreshRate);
    });
  }

  get productionPercent(): Observable<number> {
    return this._productionPercent;
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  get pvEnergy(): Observable<number> {
    return this._pvEnergy;
  }
}
