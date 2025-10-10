import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/components/header/header.component";
import { AngularMaterialComponentsModule } from './shared/material/material-components.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent,AngularMaterialComponentsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'PJV';
}
