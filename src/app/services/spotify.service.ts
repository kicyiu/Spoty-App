import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log("Spotify Service Listo");
  }

  getQuery( query: string ) {
    
    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQBiIZWKwo-GMlLXl0PiV9QetnnwKPK5Gwy5LUT64PXjZyGpLTFKTcAT9urTu7P1yg2Vf16WgKKnumcWZ-g'
    });

    return this.http.get(url, { headers });
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases?limit=20')
              .pipe(map( data => {    //map es una funcion que se aplica a cada elemento del arreglo, es parecido a filter
                return data['albums'].items;
              }));
  }

  getArtistas( termino: string) {
    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
              .pipe(map( data => data['artists'].items ));
  }
  
  getArtista( id: string) {
    return this.getQuery(`artists/${ id }`);
  }
  
  getTopTracks( id: string) {
    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
              .pipe(map( data => data['tracks'] ));
  }

}
