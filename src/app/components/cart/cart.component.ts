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


  constructor(private orderService: OrderService, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(res=>{
      this.orders = res;
    });
  }

  toString(input: any) {
    return JSON.stringify(input);
  }

  onSubmit() {}

  onClear() {}

}
