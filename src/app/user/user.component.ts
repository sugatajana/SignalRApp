import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserModel } from '../Models/Requests/UserModel';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { Constants } from '../Utils/Constants';
@Component({
  selector: 'app-user',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  providers: [DatePipe]
})
export class UserComponent implements OnInit {

  userId: number | null = null;

  userForm: FormGroup;
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router,
    private toastr: ToastService, private route: ActivatedRoute, private datePipe: DatePipe
  ) {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      dateOfBirth: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }
  ngOnInit(): void {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe({
        next: (response) => {
          if (response.isValid) {
            this.userForm.patchValue(response.data || {})
          }
        },
        error: (error) => {
          this.toastr.showError(Constants.GenericError);
        }
      })
    }

  }
  onSubmit() {
    if (this.userForm.valid) {
      const userRequest: UserModel = {
        userName: this.userForm.value.userName,
        email: this.userForm.value.email,
        phoneNumber: '+91' + this.userForm.value.mobileNumber,
        dateOfBirth: this.userForm.value.dateOfBirth,
        role: this.userForm.value.role

      }

      if (this.userId) {
        this.userService.update(userRequest, this.userId).subscribe({
          next: (response) => {
            if (response.isValid) {
              this.toastr.showSuccess(response.successMessage);
              setTimeout(() => {
                this.router.navigate(['/dashboard']);
              }, 3000);
            }
          },
          error: (error) => {
            console.error('Error: ', error);
          }
        })
      }
      else {
        this.userService.create(userRequest).subscribe({
          next: (response) => {
            if (response.isValid) {
              this.toastr.showSuccess(response.successMessage);
              setTimeout(() => {
                this.router.navigate(['/dashboard']);
              }, 3000);
            }
          },
          error: (error) => {
            console.error('Error: ', error);
          }
        });
      }


    }
  }

}
