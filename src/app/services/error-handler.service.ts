import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    if (error instanceof HttpErrorResponse) {
      console.error(`HTTP Error: ${error.status} - ${error.message}`);
      alert(`An HTTP error occurred: ${error.status} - ${error.message}`);
    } else {
      console.error('Unexpected error:', error);
      alert(`An unexpected error occurred: ${error.message}`);
    }
  }
}
