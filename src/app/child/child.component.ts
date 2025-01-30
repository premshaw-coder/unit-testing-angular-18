import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss'
})
export class ChildComponent {
  @Input() message: string = '';
  @Input() count: number = 0;
  @Output() userData: EventEmitter<{ [key: string]: string | number }> = new EventEmitter();

  onUser() {
    let user: { [key: string]: string | number } = { name: "prem", email: "prem@gmail.com", age: 25 };
    this.userData.emit(user);
  }
}
