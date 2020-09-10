export interface Menu {
  drinks: [
    {
      strCategory: string
    }
  ]
}
export interface drinkMenu {
  catName: string
  drinks: Drink[]
}
export interface Drink {
  idDrink: string,
  strDrink: string,
  strDrinkThumb: string
}
export interface selectedCategories {
  catName: string,
  selected: boolean
}
