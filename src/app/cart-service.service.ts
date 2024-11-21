import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  private allItems: any[] = JSON.parse(localStorage.getItem('cartItems')||'[]');
  constructor() { }
  addToCart(product:any){
    // let item = this.allItems.find((i)=> i.id === product.id);
    // item.quantity = 1;

    this.allItems.push({...product, quantity: 1});
    localStorage.setItem('cartItems', JSON.stringify(this.allItems));
    // console.log(this.allItems)
  }
  getAllCartItems(){
    return this.allItems;
  }
  increamentQuantity(id:number){
    let item = this.allItems.find((i)=> i.id === id);
    if(item){
      item.quantity++;
    }
    localStorage.setItem('cartItems', JSON.stringify(this.allItems));
  }
  decreamentQuantity(id:number){
    let item = this.allItems.find((i)=> i.id === id);
    if(item.quantity > 1){
      item.quantity--;
    }
    localStorage.setItem('cartItems', JSON.stringify(this.allItems));
  }
  deleteItem(id:number){
    this.allItems = this.allItems.filter((item)=> item.id !== id);
    localStorage.setItem('cartItems', JSON.stringify(this.allItems));
  }
  totalPrice(){
    return this.allItems.reduce((acc, item) =>{
      return acc + item.price * item.quantity;
    },0);
  }
}
