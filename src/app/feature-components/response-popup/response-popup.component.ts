import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-response-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './response-popup.component.html',
  styleUrl: './response-popup.component.scss',
})
export class ResponsePopupComponent {
  @Input() isSuccess: boolean = false; // To determine success or failure
  @Input() message: string = ''; // Message to display in the popup
  @Output() close = new EventEmitter<void>(); // Event to notify parent to close the popup

  onClose(): void {
    this.close.emit(); // Emit the close event
  }
}
