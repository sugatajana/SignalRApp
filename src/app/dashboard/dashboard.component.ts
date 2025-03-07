import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { UserService } from '../services/user.service';
import { UserDetails } from '../Models/Responses/UserDetails';
import { Constants } from '../Utils/Constants';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  users: UserDetails[] = [];


  constructor(private router: Router, private toastr: ToastService,
    private userService: UserService) { }

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
}
