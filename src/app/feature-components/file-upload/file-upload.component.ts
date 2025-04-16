import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GenerateInviteService } from '../../services/generate-invite.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class FileUploadComponent {
  @ViewChild('fileInput') fileInput!: ElementRef; // Reference to the file input element

  selectedFile: File | null = null;
  email: string = '';
  isEmailValid: boolean = false;
  fileError: string = ''; // To store file validation error
  isLoading: boolean = false; // To track loading state
  showPopup: boolean = false; // To control popup visibility
  popupMessage: string = ''; // Message to display in the popup
  isSuccess: boolean = false; // To track success or failure

  constructor(private generateInviteService: GenerateInviteService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      if (file.type === 'application/pdf') {
        this.selectedFile = file;
        this.fileError = ''; // Clear any previous error
      } else {
        this.selectedFile = null;
        this.fileError = 'Only PDF files are allowed.';
      }
    }
  }

  validateEmail(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.isEmailValid = emailRegex.test(this.email);
  }

  onUpload(): void {
    if (this.selectedFile && this.isEmailValid) {
      this.isLoading = true; // Show loader
      this.generateInviteService
        .uploadFile(this.selectedFile, this.email)
        .subscribe({
          next: (response) => {
            this.isLoading = false; // Hide loader
            this.isSuccess = response.success; // Use success from backend
            this.popupMessage = response.message; // Use message from backend
            this.showPopup = true; // Show popup
          },
          error: (error) => {
            this.isLoading = false; // Hide loader
            this.isSuccess = false; // Treat as failure
            this.popupMessage = 'An error occurred. Please try again.';
            this.showPopup = true; // Show popup
          },
        });
    } else {
      alert('Please select a valid file and enter a valid email address.');
    }
  }

  closePopup(): void {
    this.showPopup = false; // Close the popup
    this.resetForm(); // Reset the form fields
  }

  resetForm(): void {
    this.selectedFile = null;
    this.email = '';
    this.isEmailValid = false;
    this.fileError = '';

    // Reset the file input element
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
}
