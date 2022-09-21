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
  public readonly pvPowerMax = 7000;

  private currentPowerWaiting = false;
  private powerTodayWaiting = false;
  
  constructor(private http: HttpClient) {
    this.initCurrentPowerObserver();
    this.initPowerTodayObserver();
  }

  private initCurrentPowerObserver() {
    this._currentProduction = new Observable<number>(observer => {
      setInterval(() => {
        if (this.currentPowerWaiting) {
          return;
        }

        this.currentPowerWaiting = true;
        this.getPvPower().subscribe(pvPower => {
          observer.next(pvPower);
          this.currentPowerWaiting = false;
        });
      }, this.refreshRate);
    });
  }

  public getPvPower(): Observable<any> {
    console.log('fetching current power');
    return this.http.get(`${this.smaUrl}/pvpower`)
      .pipe(
        catchError(this.handleError)
      );
  }

  get currentPower(): Observable<number> {
    return this._currentProduction;
  }

  private initPowerTodayObserver() {
    this._powerToday = new Observable<number>(observer => {
      setInterval(() => {
        if (this.powerTodayWaiting) {
          return;
        }

        this.powerTodayWaiting = true;
        this.getPowerToday().subscribe(wattsToday => {
          observer.next(wattsToday);
          this.powerTodayWaiting = false;
        });
      }, this.refreshRate);
    });
  }

  public getPowerToday(): Observable<any> {
    console.log('fetching power today');
    return this.http.get(`${this.smaUrl}/powertoday`)
      .pipe(
        catchError(this.handleError)
      );
  }

  get powerToday(): Observable<number> {
    return this._powerToday;
  }

  get powerTotal(): Observable<any> {
    console.log('fetching power total');
    return this.http.get(`${this.smaUrl}/powertotal`)
      .pipe(
        catchError(this.handleError)
      );
  }

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
