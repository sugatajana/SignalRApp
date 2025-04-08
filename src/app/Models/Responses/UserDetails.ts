export interface UserDetails {
    userId: number;
    userName: string;
    email: string;
    mobileNumber: string;
    dateOfBirth: string;
    role: string;
    orders: any[]; // Assuming OrderResponse is defined in the same file or imported correctly
}