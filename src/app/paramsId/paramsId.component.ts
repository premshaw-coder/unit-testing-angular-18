import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './paramsId.component.html',
  styleUrl: './paramsId.component.scss'
})
export class paramsIdComponent {
  paramsId!: string | null;
  constructor(private ActivatedRoute: ActivatedRoute) {
    this.ActivatedRoute?.params?.subscribe(params => {
      this.paramsId = params['id'];
    })
  }
}
