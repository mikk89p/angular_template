import { NgModule } from '@angular/core';
import {MatInputModule,
  MatMenuModule,
  MatIconModule,
  MatToolbarModule,
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatTableModule,
  MatSortModule,
  MatSliderModule,
  MatSelectModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatAutocompleteModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatSnackBarModule,
  MatRadioModule,
  MatTooltipModule,
  MatSlideToggleModule,
  MatListModule,
  MatChipsModule} from '@angular/material';

  const modules = [
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatSliderModule,
    MatSelectModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatRadioModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatListModule,
    MatChipsModule
  ];


@NgModule({
  imports: [modules],
  exports: [modules],
})
export class MaterialModule { }
