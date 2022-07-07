import { configureStore } from '@reduxjs/toolkit'
import searchReducer from '../features/search/searchSlice'
import drinksReducer from '../features/drinks/drinksByCategorySlice'
import drinkReducer from '../features/drink/drinkSlice'
import ingredientReducer from '../features/ingredient/ingredientSlice'
import pdfReducer from '../features/pdf/pdfSlice'


export const store = configureStore({
  reducer: {
    search: searchReducer,
    drinks: drinksReducer,
    drink: drinkReducer,
    ingredient: ingredientReducer,
    pdf: pdfReducer
  },
});