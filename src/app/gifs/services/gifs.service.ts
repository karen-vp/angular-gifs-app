import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {

  // Va a contener todos la lista de los gifs que estaremos mostrando en el momento
  public gifList: Gif[] = [];
  // Hacemos privada la propiedad para evitar que se modifique desde cualquier lado de la app
  private _tagsHistory: string[] = [];
  private apiKey: string = 'dID4rUP8ts8tCcBaB4d0GQPEsMhObgSJ';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs Service Ready');
  }

  get tagsHistory() {
    // usamos el operador spread para crear una copia de ese arreglo, y no trabajar sobre el original
    return [...this._tagsHistory];
  }
  // Metodo que agrega los tags al arreglo de tagsHistory
  searchTag(tag: string): void {
    if (tag.length == 0) {
      return;
    }

    this.organizeHistory(tag)

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((res) => {
        this.gifList = res.data;
      })

  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      // filter devuelve un nuevo arreglo con los elementos que cumplan la condicion especificada en la funcion flecha, en este caso solo los tags que sean diferentes al tag original los vamos a dejar pasar.
      this._tagsHistory = this._tagsHistory.filter((oldTag) => { return oldTag !== tag });
    }
    // insertamos el nuevo tag al inicio del arreglo
    this._tagsHistory.unshift(tag);
    // El splice, el primer argumento indica desde qué posición empieza, en este caso la 0, es decir, la primera. El segundo argumento indica cuantos elementos queremos eliminar. Es decir, desde la posición 0 queremos coger 10 elementos y eliminarlos. Esto se hizo para no tener un historial tan grande y limitarlo a 10 registros.
    this._tagsHistory = this.tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    // Validación para ver si el localstorage tiene data
    if (!localStorage.getItem('history')) return;
    // Si tiene data guarda lo que hay en el localStorage en el _tagsHistory
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    if (this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }
}


