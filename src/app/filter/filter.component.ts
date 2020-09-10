import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {HttpService} from '../shared/services/http.service';
import {Menu, selectedCategories} from '../shared/interfaces';
import {FormArray, FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs';
import {element} from 'protractor';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Output() onFiltersApplied = new EventEmitter<number>()

  drinks$: Observable<Menu>
  menu: Menu
  form: any
  selectedCategories: selectedCategories[]
  disabled = false


  constructor(private httpService: HttpService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      drinks: new FormArray([])
    })
  }

  ngOnInit(): void {
    this.httpService.selectedCategories.subscribe(arr => this.selectedCategories = arr)
    this.httpService.getCategories()
      .subscribe(
        menu => {
          this.menu = menu
          this.form = this.fb.group({
            drinks: this.addControls()
          })
          this.onSubmit()
        }
      )
  }

  addControls() {
    if (this.menu) {
      const arr = this.menu.drinks.map(element => {
        return this.fb.control(true)
      })
      return this.fb.array(arr)
    } else {
      setTimeout(this.addControls, 1000)
    }
  }

  get drinksArr() {
    return <FormArray>this.form.get('drinks')
  }

  getSelectedCategories() {
    this.selectedCategories = []
    this.drinksArr.controls.forEach((control, i) => {
      this.selectedCategories.push({catName: this.menu.drinks[i].strCategory, selected: control.value})
    })
  }

  onSubmit() {
    this.disabled = true
    this.getSelectedCategories()
    this.httpService.updateArr(this.selectedCategories)
    const arr = this.selectedCategories.filter(element => element.selected === true)
    this.onFiltersApplied.emit(arr.length)
    setTimeout((() => this.disabled = false), 2000)
  }
}
