import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterableTableComponent } from './components/filterable-table/filterable-table.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SecuritiesListComponent } from './components/securities-list/securities-list.component';
import { FilterBarComponent } from './components/filter/filter-bar/filter-bar.component';
import { MatInputModule } from '@angular/material/input';
import { InputFilterComponent } from './components/filter/filter-components/input-filter/input-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiselectFilterComponent } from './components/filter/filter-components/multiselect-filter/multiselect-filter.component';
import { MatSelectModule } from '@angular/material/select';
import { CheckboxFilterComponent } from './components/filter/filter-components/checkbox-filter/checkbox-filter.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    FilterableTableComponent,
    SecuritiesListComponent,
    FilterBarComponent,
    InputFilterComponent,
    MultiselectFilterComponent,
    CheckboxFilterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
