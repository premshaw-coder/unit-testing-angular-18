import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('myParagraph', { static: true }) myParagraph!: ElementRef; // Non-null assertion (!)
  changeText() {
    this.myParagraph.nativeElement.textContent = 'Text changed!';
  }
}
