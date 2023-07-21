import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
      <h5>Buscar</h5>
      <input type="text"
      class="form-control"
      placeholder="Buscar gifs..."
      #txtTagInput
      (keyup.enter)="searchTag()"

      >
  `
})

export class SearchBoxComponent {

  /*
      @ViewChild nos sirve para poder tomar una referencia local de un elemento html
      @ViewChildren de igual manera sirve para tomar referencia local, pero es un arreglo de todos los elementos html que le indiquemos
  */
  // Referencia directa al input del html con el identificador local que definimos previamente en el input del html
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  // Inyeccion de dependencias del GifsService
  constructor(private gifsService: GifsService) { }

  searchTag():void{
    // this.tagInput.nativeElement.value; con nativeElement podemos acceder a todas las propiedades del input, en este caso estamos accediendo a la propiedad value
    const newTag = this.tagInput.nativeElement.value;

    // Hacemos uso del método searchTag de la instancia unica del servicio GifsService 'gifsService'
    this.gifsService.searchTag(newTag);

    // Limpiamos el input
    this.tagInput.nativeElement.value = '';
  }
}
