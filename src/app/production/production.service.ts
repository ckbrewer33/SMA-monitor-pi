import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductionService {
  private _productionPercent: Observable<number>;
  
  constructor() {
    this._productionPercent = new Observable<number>(observer => {
      setInterval(() => {
        let nextNumber = this.getRandomNumber();
        observer.next(nextNumber)
      }, 1000);
    });

  }

  get productionPercent(): Observable<number> {
    return this._productionPercent;
  }

  private getRandomNumber(): number {
    return Math.floor(Math.random() * (100 - 1) + 1);
  }
}
