import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { OrderModel } from '../Models/Requests/OrderModel';
import { ResultWithData } from '../Models/Responses/ResultWithData';
import { Observable } from 'rxjs';
import { OrderResponse } from '../Models/Responses/OrderResponse';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiBaseUrl = environment.baseURL; // Replace with your actual API base URL

  constructor(private http: HttpClient) { }

  // Add your methods here to interact with the order-related API endpoints
  // For example, to create an order:
  createOrder(order: OrderModel): Observable<ResultWithData<OrderModel>> {
    return this.http.post<ResultWithData<OrderModel>>(`${this.apiBaseUrl}/api/orders`, order);
  }

  // To get all orders:
  getAllOrders(): Observable<ResultWithData<OrderResponse>> {
    return this.http.get<ResultWithData<OrderResponse>>(`${this.apiBaseUrl}/api/orders`);
  }

  // To get an order by ID:
  getOrderById(id: number): Observable<ResultWithData<OrderModel>> {
    return this.http.get<ResultWithData<OrderModel>>(`${this.apiBaseUrl}/api/orders/${id}`);
  }
  // To update an order:
  updateOrder(order: OrderModel, id: number): Observable<ResultWithData<OrderModel>> {
    return this.http.put<ResultWithData<OrderModel>>(`${this.apiBaseUrl}/api/orders/${id}`, order);
  }
  // To delete an order:
  deleteOrder(id: number): Observable<ResultWithData<OrderModel>> {
    return this.http.delete<ResultWithData<OrderModel>>(`${this.apiBaseUrl}/api/orders/${id}`);
  }
  // To get orders by user ID:
  getOrdersByUserId(userId: number): Observable<ResultWithData<OrderModel[]>> {
    return this.http.get<ResultWithData<OrderModel[]>>(`${this.apiBaseUrl}/api/orders/user/${userId}`);
  }

}
