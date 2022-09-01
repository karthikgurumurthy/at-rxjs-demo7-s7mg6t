import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, timer } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

export interface Motd {
  msg: string;
  url: string;
}

export interface Rates {
  EUR: number;
  GBP: number;
}

export interface RatesResponse {
  motd: Motd;
  success: boolean;
  base: string;
  date: string;
  rates: Rates;
}

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  private URL = 'https://api.exchangerate.host/latest?base=USD&symbols=EUR,GBP';

  private rates$ = new ReplaySubject<Rates>(1);

  constructor(private http: HttpClient) {
    timer(0, 30000) //Emits a value now and then every 30 seconds
      .pipe(
        switchMap(() => this.getRatesFromApi()), // Change that value into an API call
        map((response) => response.rates), // Extract the rates from the response
        tap(console.log) // Logging the result for debugging purposes
      )
      .subscribe((rates) => this.rates$.next(rates)); // Emit new values using our Subject
  }

  private getRatesFromApi(): Observable<RatesResponse> {
    return this.http.get<RatesResponse>(this.URL);
  }

  getExchangeRates(): Observable<Rates> {
    return this.rates$.asObservable(); // Return our Subject as an Observable
  }
}
