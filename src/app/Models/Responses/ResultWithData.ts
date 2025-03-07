export interface ResultWithData<T> {
    isValid: boolean;
    successMessage: string;
    data?: T;
    errorMessage: string;
    list?: T[];
}