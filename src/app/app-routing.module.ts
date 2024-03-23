import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';

const routes: Routes = [
  {
    path: 'to-do',
    component: TodoComponent
  },
  {
    path: 'currency-converter',
    component: CurrencyConverterComponent
  },
  {
   path: '',
   pathMatch: 'full',
   redirectTo: 'to-do'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
