import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isVisible = false;
  dynamicText = 'Hello, Angular!';
  userData = [
    { name: 'John', age: 25, email: 'prem0@gmail.com' }, { name: 'Doe', age: 30, email: 'prem1@gmail.com' },
    { name: 'Smith', age: 35, email: 'prem2@gmail.com' }, { name: 'Alex', age: 40, email: 'prem3@gmail.com' }
  ]
}
