import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  toDoUrl: string = '/assets/todo.json';
  currencyUrl: string = '/assets/currency.json';
  currencyConversionUrl : string = 'https://open.er-api.com/v6/latest';

  constructor(private http: HttpClient) { }

  getTodoData() : Observable<any> {
    return this.http.get(this.toDoUrl);
  }

  getCurrencyData() : Observable<any> {
    return this.http.get(this.currencyUrl);
  }

  getCurrencyConversionRate(baseCurrency? : string) {
    var urlWithBaseCurrency = this.currencyConversionUrl;
    if(baseCurrency != null) {
      urlWithBaseCurrency = `${this.currencyConversionUrl}/` + baseCurrency;
    }
    return this.http.get(urlWithBaseCurrency);
  }

}

