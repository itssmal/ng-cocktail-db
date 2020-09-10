import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {drinkMenu, Menu, selectedCategories} from '../interfaces';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private sharedArr = new BehaviorSubject<selectedCategories[]>([])
  selectedCategories = this.sharedArr.asObservable()

  constructor(private http: HttpClient) {
  }

  getCategories() {
    return this.http.get<Menu>('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
  }
  getDrinks(category) {
      return this.http.get<drinkMenu>(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
  }
  updateArr(array: selectedCategories[]) {
      this.sharedArr.next(array)
  }
}
