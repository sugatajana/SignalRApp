import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { UserService } from '../services/user.service';
import { UserDetails } from '../Models/Responses/UserDetails';
import { Constants } from '../Utils/Constants';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  users: UserDetails[] = [];
  showOrderModal: boolean = false;
  selectedUser: UserDetails | null = null;
  orderForm!: FormGroup;

  constructor(private router: Router, private toastr: ToastService,
    private userService: UserService, private fb: FormBuilder,
    private orderService: OrderService) {
    this.orderForm = fb.group({
      orderDescription: [''],
      orderStatus: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();
  }
  getAll(): void {
    this.userService.getAll().subscribe({
      next: (response) => {
        if (response.isValid) {
          this.users = response.list || [];
          // console.log(response.list);
        }
      },
      error: (error) => {
        this.toastr.showError(Constants.GenericError);
      }
    })
  }
  addUser() {
    this.router.navigate(['/user']);
  }

  editUser(user: any) {
    this.router.navigate(['/user', user.userId])
  }

  async deleteUser(user: any) {
    var isConfirmed = confirm(`Do you want to delete ${user.userName}`)
    if (isConfirmed) {
      this.userService.delete(user.userId).subscribe({
        next: (response) => {
          if (response.isValid) {
            this.toastr.showSuccess(response.successMessage);
            setTimeout(() => {
              this.getAll();
            }, 3000);
          }
          else {
            this.toastr.showError(response.ErrorMessage);
          }
        },
        error: (error) => {
          this.toastr.showError(Constants.GenericError);
        }
      });
    }
  }

  createOrder(user: any) {
    // Logic to create an order for the user
    this.selectedUser = user;
    this.showOrderModal = true;
    this.orderForm.reset(); // Reset the form when creating a new order
    this.orderForm.get('orderStatus')?.setValue(''); // Set default value for order status
    // alert(`Create order for ${user.userName}`);
  }

  submitOrder(user: any) {
    // Logic to submit the order for the user 
    this.selectedUser = user;
    if (this.orderForm.valid) {
      const orderData = {
        ...this.orderForm.value,
        userId: this.selectedUser?.userId // Assuming you have a userId field in the form
      };
      this.orderService.createOrder(orderData).subscribe({
        next: (response) => { 
          console.log(response);
          if (response.isValid) {
            this.toastr.showSuccess(response.successMessage);
            setTimeout(() => {
              this.getAll();
            }, 3000);
          }
          else {
            this.toastr.showError(response.errorMessage);
          }
          // console.log(response);
         },
        error: (error) => { this.toastr.showError(Constants.GenericError); },
      });
      // Handle the order submission logic here
    }
    this.showOrderModal = false;
  }

  closeOrderModal() {
    this.showOrderModal = false;
    this.selectedUser = null;
  }

  viewOrder(orders: any[], selectedUser: any) {
    // Logic to view orders for the user
    this.router.navigate(['/orders/user/', this.selectedUser?.userId], {
      state: { orders: orders } // Pass the orders to the next component if needed
    });
  }
}

