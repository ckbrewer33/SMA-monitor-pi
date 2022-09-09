import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

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
    console.log('generating a random number');
    return Math.random() * 10;
  }
}
