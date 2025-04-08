import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { OrderResponse } from '../Models/Responses/OrderResponse';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  orders: OrderResponse[] = []; // Array to hold order details

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    // Initialization logic here
    // this.loadAllOrders();
    this.getAllOrders();
  }

  getAllOrders() {
    // Logic to fetch order details
    this.orderService.getAllOrders().subscribe({
      next: (response) => {
        if (response.isValid) {
          console.log(response.list);
          this.orders = response.list || []; // Assign the fetched orders to the component's orders property
        } else {
          console.error('Error fetching order details:', response.errorMessage);
        }
      },
      error: (error) => {
        console.error('Error fetching order details:', error);
      }
    });
  }

}
