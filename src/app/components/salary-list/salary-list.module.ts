import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalaryListComponent } from './salary-list.component';
import { ApiService } from 'src/app/service/api.service';

import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [SalaryListComponent],
  exports: [SalaryListComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatDividerModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [
    ApiService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SalaryListModule { }
