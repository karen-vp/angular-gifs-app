import { Component, ElementRef } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  // Inyección de dependencia del GifService
  constructor(private gifsService : GifsService){

  }

  get tagsHistory() : string []{
    return this.gifsService.tagsHistory;
  }

  // Creamos un nuevo metodo para hacer la busqueda de gifs
  searchTag(tag : string) : void {
    // Estamos usando el método searchTag de la instancia de GifsService
    this.gifsService.searchTag(tag);
  }



}
