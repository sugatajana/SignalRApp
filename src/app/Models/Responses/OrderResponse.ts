import { UserDetails } from './UserDetails'; // Adjust the path as necessary

export interface OrderResponse {
    orderId: number;
    orderDescription: string;
    orderNumber: string;
    orderStatus: string;
    orderDate: string;
    userId: number;
    user: UserDetails;
    highlight?: boolean; // Optional property for highlighting
}