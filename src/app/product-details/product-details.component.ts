import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Burgers } from '../burger-data';
import { CartServiceService } from '../cart-service.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  currentProduct:any;
  id:any;
  itemsInCart: any[]=[];
  productQuantity:number = 0;
  constructor(private activatedRoute: ActivatedRoute, public cartService: CartServiceService){}
ngOnInit(){
  let products = Burgers.burgers;
  this.itemsInCart = JSON.parse(localStorage.getItem('cartItems')||'[]');
  this.id = this.activatedRoute.snapshot.paramMap.get("id");
  products.forEach(prod=>{
    if(prod.id==this.id){
      this.currentProduct = prod;
    }
  })
  this.itemsInCart.forEach(product => {
    if(product.id == this.currentProduct.id && product.quantity>0){
      this.productQuantity = product.quantity;
    }
  });
  
  // console.log(this.currentProduct)
}
increment(product:any){
  // if(this.productQuantity ==0){
  //   this.cartService.addToCart(product)
  // } else {
    this.cartService.increamentQuantity(product.id);
  // }
  this.productQuantity ++;

}
decrement(id:any){
  this.productQuantity --;
  this.cartService.decreamentQuantity(id);
}
}
