import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const authGuard: CanActivateFn = () => {
    const router = inject(Router); // Inject the Router
    const token = localStorage.getItem('token'); // Get JWT token from local storage
    
    if (!token) {
        router.navigate(['/login']); // Redirect to Login if no token
        return false; // Prevent navigation
    }

    return true; // Allow navigation
};