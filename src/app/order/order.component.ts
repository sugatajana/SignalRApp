import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { OrderResponse } from '../Models/Responses/OrderResponse';
import { CommonModule } from '@angular/common';
import { SignalrService } from '../services/signalr.service';

@Component({
  selector: 'app-order',
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit, OnDestroy {
  orders: OrderResponse[] = []; // Array to hold order details

  constructor(private orderService: OrderService, private signal: SignalrService) { }

  ngOnInit(): void {
    // Initialization logic here
    // this.loadAllOrders();
    this.getAllOrders();

    this.signal.startConnection('Orders', {
      'OrderCreated': (data: any) => {
        console.log('New order created:', data);
        const orderData = JSON.parse(data); // Parse the JSON string to an object
        this.orders.push(orderData); // Add the new order to the orders array
        console.log(this.orders); // Log the updated orders array
      },
      // 'OrderUpdated': (data: OrderResponse) => {
      //   console.log('Order updated:', data);
      //   const index = this.orders.findIndex(order => order.id === data.id);
      //   if (index !== -1) {
      //     this.orders[index] = data; // Update the existing order in the orders array
      //   }
      // },
      // 'OrderDeleted': (data: number) => {
      //   console.log('Order deleted:', data);
      //   this.orders = this.orders.filter(order => order.id !== data); // Remove the deleted order from the orders array
      // }
    });
  }

  ngOnDestroy(): void {
    // Cleanup logic here
    this.signal.stopConnection('Orders');
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
