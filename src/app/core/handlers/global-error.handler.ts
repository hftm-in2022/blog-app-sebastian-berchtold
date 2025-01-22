import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class GlobalErrorHandler implements ErrorHandler {
  snackBar = inject(MatSnackBar);
  router = inject(Router);

  handleError(error: Error): void {
    if (error instanceof HttpErrorResponse) {
      this.showHttpError(error);
    } else {
      console.error(error);
      this.snackBar.open(
        'Something went wrong',
        'close',
        { duration: 3000 },
      );
      this.router.navigate(['/']);
    }
  }

  showHttpError(error: HttpErrorResponse) {
    if (error.status === 404) {
      this.snackBar.open('This Resource doesn\'t exists', 'close', {
        duration: 3000,
      });
      this.router.navigate(['/']);
    } else if (error.status === 0) {
      this.snackBar.open(
        'You are offline',
        'close',
        { duration: 3000 },
      );
    } else {
      this.snackBar.open(
        'Something went wrong',
        'close',
        { duration: 3000 },
      );
    }
  }
}
