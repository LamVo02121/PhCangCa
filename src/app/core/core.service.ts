import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageComponent } from '../message/message.component';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string = 'ok') {
    this.snackBar.open(message, action, {
      duration: 1000,
      verticalPosition: 'top',
    });
  }
  
  openSnackBarLog(message: string) {
    this.snackBar.openFromComponent(MessageComponent, {
      data: message,
      duration: 6000*5,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}