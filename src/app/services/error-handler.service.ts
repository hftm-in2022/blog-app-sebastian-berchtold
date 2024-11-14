import { HttpErrorResponse } from '@angular/common/http'
import { ErrorHandler, Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})

export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    if (error instanceof HttpErrorResponse) {
      alert(`HTTP Error: ${error.status} - ${error.message}`);
    } else {
      alert(`An unexpected error occurred: ${error.message}`);
    }
    console.error('Error:', error);
  }
}
