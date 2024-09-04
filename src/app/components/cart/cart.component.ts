import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { Order } from '../../interfaces/order.interface';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

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

  constructor(
    private orderService: OrderService, 
    private authService: AuthService,    
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig
  ) {}

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
    this.orders = [];
    this.sum = 0;
    this.ref.close();
  }

  onClear() {
    this.orderService.clearOrders();
    this.orders = [];
    this.sum = 0;
  }

}
