import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyConverterComponent } from './currency-converter.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from '../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../services/get-data.service';

describe('CurrencyConverterComponent', () => {
  let component: CurrencyConverterComponent;
  let fixture: ComponentFixture<CurrencyConverterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyConverterComponent],
      imports: [ HttpClientTestingModule, MaterialModule, ReactiveFormsModule, BrowserAnimationsModule],
      providers: [DataService]
    });
    fixture = TestBed.createComponent(CurrencyConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.ngOnInit();
  });
});
