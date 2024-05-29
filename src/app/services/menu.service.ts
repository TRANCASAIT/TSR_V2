import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../interfaces/menu';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor( private http: HttpClient) { }

  getMenu(ut: any): Observable<Menu[]>{
    let menuType;
    if(ut === environment.roles.rol1){
      menuType = './assets/data/menu-sa.json';
    }else{
      menuType = './assets/data/menu-sa.json';
    }


    return this.http.get<Menu[]>(menuType);
  }

}
