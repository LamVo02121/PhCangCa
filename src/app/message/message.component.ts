import { Component, Inject, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  snackBarRef = inject(MatSnackBarRef);
  constructor(@Inject(MAT_SNACK_BAR_DATA) public message: any) {}

  
}
