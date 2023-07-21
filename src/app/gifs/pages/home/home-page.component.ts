import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',

})
export class HomePageComponent {

  // Inyectamos el GifsService
  constructor(private gifsService : GifsService){

  }

  // Creamos un get para obtener la lista de gifs que proviene del GifsService
  get gifs() : Gif[]{
    return this.gifsService.gifList;
  }

}
