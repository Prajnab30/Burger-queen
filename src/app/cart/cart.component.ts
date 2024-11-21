import { Component } from '@angular/core';
import { CartServiceService } from '../cart-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  allCartItems: any[]=JSON.parse(localStorage.getItem('cartItems')||'[]');
  constructor(public cartService:CartServiceService){
  }
  ngOnInit(){
    this.getCartDetails()
  }
  getCartDetails(){
    this.allCartItems = this.cartService.getAllCartItems()
  }
  submitOrder(){
    console.log(this.allCartItems);
  }
  deleteCartItem(prodId: number){
    this.allCartItems=JSON.parse(localStorage.getItem('cartItems')||'[]');
    this.cartService.deleteItem(prodId);
  }
}
