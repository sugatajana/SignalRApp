import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  messages: { text: string; type: 'success' | 'error' }[] = [];
  constructor() { }

  showSuccess(message: string) {
    this.messages.push({ text: message, type: 'success' });
    this.autoDismiss();
  }

  showError(message: string) {
    this.messages.push({ text: message, type: 'error' });
    this.autoDismiss();
  }

  private autoDismiss() {
    setTimeout(() => {
      this.messages.shift();
    }, 3000);
  }
}
