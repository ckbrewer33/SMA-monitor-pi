import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SmaService {
  private _currentProduction: Observable<number> = new Observable();
  private _powerToday: Observable<number> = new Observable();

  private readonly smaUrl = "http://localhost:5000/sma";
  private readonly refreshRate = 2000;
  private readonly pvPowerMax = 7300;
  
  constructor(private http: HttpClient) {
    this.initProductionPercentObserver();
    this.initPvEnergyObserver();
  }

  private initProductionPercentObserver() {
    this._currentProduction = new Observable<number>(observer => {
      setInterval(() => {
        this.getPvPower().subscribe(pvPower => observer.next(pvPower));
      }, this.refreshRate);
    });
  }

  public getPvPower(): Observable<any> {
    return this.http.get(`${this.smaUrl}/pvpower`)
      .pipe(
        catchError(this.handleError)
      );
  }

  get currentProduction(): Observable<number> {
    return this._currentProduction;
  }

  private initPvEnergyObserver() {
    this._powerToday = new Observable<number>(observer => {
      setInterval(() => {
        this.getPowerToday().subscribe(wattsToday => {
          const kiloWattsToday = this.convertWattToKwatt(wattsToday);
          observer.next(kiloWattsToday)
        });
      }, this.refreshRate);
    });
  }

  private convertWattToKwatt(watts: number): number {
    return watts / 1000;
  }

  public getPowerToday(): Observable<any> {
    return this.http.get(`${this.smaUrl}/powertoday`)
      .pipe(
        catchError(this.handleError)
      );
  }

  get powerToday(): Observable<number> {
    return this._powerToday;
  }


  // public getPowerToday():

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
