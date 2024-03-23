import { Component } from '@angular/core';
import { DataService } from '../services/get-data.service';
import { Currency } from '../models/currency.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $ : any;

@Component({
  selector: 'app-infocusp-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent {
  currencyForm!: FormGroup<any>;
  currencyList: Currency[] = [];
  currencyCodes: string[] = [];
  baseRate!: number;
  convertedRate!: number;
  isSubmitted = false;

  constructor(private dataService : DataService,
    private formBuilder: FormBuilder,
    private snackBar : MatSnackBar) {}

  ngOnInit() {
    this.createFormBuilder();
    this.dataService.getCurrencyConversionRate().subscribe( (res : any) => {
      this.currencyCodes = Object.keys(res.rates);
    });

    this.dataService.getCurrencyData().subscribe( res => {
      this.currencyList = res.currencyList;
      this.currencyList.forEach((currency: Currency) => {
        this.dataService.getCurrencyConversionRate(currency.source).subscribe( (res : any) => {
          currency.conversionRate = res.rates[currency.target!];
          currency.lastUpdatedDate = new Date(res.time_last_update_utc);
          currency.sourceValue = '1';
          currency.targetValue = currency.conversionRate.toFixed(2);
        });
      });
    });
  }

  createFormBuilder() {
    this.currencyForm = this.formBuilder.group({
      source: ['', [Validators.required]],
      target: ['', [Validators.required]]
    });
  }

  convertToRate(isSource : boolean, inputValue : string, index : number) {
    var parsedInput = parseFloat(inputValue);
    if(isNaN(parsedInput)) {
      this.snackBar.open("Please enter number.", 'X', {
        duration: 1000
      });
      return;
    }
    if(inputValue != null) {
      
      if(isSource){
        this.currencyList[index].targetValue = (parsedInput * this.currencyList[index].conversionRate).toFixed(2);
      } else {
        this.currencyList[index].sourceValue = (parsedInput / this.currencyList[index].conversionRate).toFixed(2);
      }
    }
  }

  removeConverter(index : number) {
    this.currencyList.splice(index, 1);
  }

  showCurrencyPopup(showOrHide : string) {
    $('#exampleModal').modal(showOrHide);
  }

  addNewConverter() {
    this.isSubmitted = true;
    console.log(this.currencyForm.value);
    if(this.currencyForm.invalid) {
      return;
    }
    var source = this.currencyForm.value.source;
    var target = this.currencyForm.value.target;
    var currency : Currency;
    if(source != target) {
      this.dataService.getCurrencyConversionRate(source).subscribe( (res : any) => {
        currency = {
          id : this.currencyList.length,
          source: source,
          target: target,
          conversionRate: res.rates[target],
          lastUpdatedDate : new Date(res.time_last_update_utc),
          sourceValue: '1',
          targetValue: res.rates[target].toFixed(2)
        };
        this.currencyList.push(currency);
        this.isSubmitted = false;
        this.createFormBuilder();
        this.showCurrencyPopup('hide');
        this.snackBar.open('Currency converter added.', 'X', {
          duration : 1500
        });
        return;
      });
    } else {
      this.snackBar.open('Source and target is same.', 'X', {
        duration : 1500
      });
      return;
    }
  }

}
