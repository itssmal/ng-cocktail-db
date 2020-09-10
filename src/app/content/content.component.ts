import { Component, OnInit } from '@angular/core';
import {HttpService} from '../shared/services/http.service';
import {selectedCategories} from '../shared/interfaces';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  selectedCategories: selectedCategories[]
  content = []
  loading: boolean

  constructor(public httpService: HttpService) {
  }

  ngOnInit(): void {
    this.httpService.selectedCategories.subscribe(arr => {
      this.selectedCategories = arr
      this.logTest(this.selectedCategories)
    })
  }

  async logTest(arr) {
    this.content = []
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].selected) {
        await this.httpService.getDrinks(arr[i].catName)
          .toPromise().then(drinkMenu => {
            drinkMenu.catName = arr[i].catName
            this.content.push(drinkMenu)
          })
      }
    }
  }
}
