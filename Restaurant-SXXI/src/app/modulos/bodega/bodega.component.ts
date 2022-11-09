import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bodega',
  templateUrl: './bodega.component.html',
  styleUrls: ['./bodega.component.scss']
})
export class BodegaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  cerrarSesion(){
    this.router.navigate(['/login'])
  }

}
