import { Component, OnInit } from '@angular/core';
import {Burgers} from '../burger-data';
import { Router } from '@angular/router';
import { CartServiceService } from '../cart-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  burgerData: any[]=[];
  itemsInCart: any[]=[];
  isProductAdded: boolean = false;
  constructor(private router: Router, public cartService: CartServiceService){

  }
  ngOnInit() {
    this.burgerData = Burgers.burgers;
    this.itemsInCart = JSON.parse(localStorage.getItem('cartItems')||'[]');
    if(this.itemsInCart?.length ==0){
      this.burgerData.forEach(burger =>{
        if(burger.quantity>0){
          burger.quantity = 0;
        }
      })
    } 
    // console.log(this.burgerData);
  }
  productDetails(product: any, index: number){ 
      this.router.navigate(['productDetails', product.id]);
  }
  productAdded(product: any, index: number){
    if(product.quantity > 0){
      this.cartService.deleteItem(product.id);
      this.burgerData[index].quantity = 0;
    } else {
      this.cartService.addToCart(product);
      this.burgerData[index].quantity = 1;
    }
  }
}
