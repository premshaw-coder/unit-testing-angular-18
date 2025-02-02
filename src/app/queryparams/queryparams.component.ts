import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-queryparams',
  standalone: true,
  imports: [],
  templateUrl: './queryparams.component.html',
  styleUrl: './queryparams.component.scss'
})
export class QueryparamsComponent {
  queryParam!: Params | string;
  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute?.queryParams?.subscribe(params => {
      console.log(params);
      this.queryParam = JSON.stringify(params);
    });
  }
}
