import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar'; 
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const angularMaterialComponents = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatBadgeModule,
  MatMenuModule,
  MatSidenavModule,
  MatListModule,
  MatGridListModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatSnackBarModule,
  RouterModule,ReactiveFormsModule,
  
];

@NgModule({
  imports: [angularMaterialComponents],
  exports: [angularMaterialComponents]
})
export class AngularMaterialComponentsModule {}