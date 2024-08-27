import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { Order } from '../../interfaces/order.interface';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  orders: Order[] = [];

  sum: number = 0;

  constructor(private orderService: OrderService, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(res=>{
      this.orders = res;
      for (let i = 0; i < this.orders.length; i++) {
        this.sum += this.orders[i].totalPrice;
      }
    });
  }

  toString(input: any) {
    return JSON.stringify(input);
  }

  onSubmit() {
    for (let i = 0; i < this.orders.length; i++) {
      this.orderService.submitOrder(this.orders[i]).subscribe(res=>{
        console.log(res);
      })
    }
  }

  onClear() {
    this.orders = [];
    this.sum = 0;
  }

}
