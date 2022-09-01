import { Component, VERSION } from '@angular/core';
import { Observable } from 'rxjs';
import { ExchangeRateService, Rates } from './exchange-rate.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  rates$: Observable<Rates>;

  constructor(service: ExchangeRateService) {
    this.rates$ = service.getExchangeRates();
  }
}
