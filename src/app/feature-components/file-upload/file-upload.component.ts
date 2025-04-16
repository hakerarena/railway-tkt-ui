import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GenerateInviteService } from '../../services/generate-invite.service';
import { ResponsePopupComponent } from '../response-popup/response-popup.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  imports: [FormsModule, CommonModule, ResponsePopupComponent, HeaderComponent],
  standalone: true,
})
export class FileUploadComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;

  selectedFile: File | null = null;
  email: string = '';
  isEmailValid: boolean = false;
  fileError: string = '';
  isLoading: boolean = false;
  showPopup: boolean = false;
  popupMessage: string = '';
  isSuccess: boolean = false;

  constructor(private generateInviteService: GenerateInviteService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      if (file.type === 'application/pdf') {
        this.selectedFile = file;
        this.fileError = '';
      } else {
        this.selectedFile = null;
        this.fileError = 'Only PDF files are allowed.';
      }
    } else {
      this.selectedFile = null;
      this.fileError = 'Please select a file.';
    }
  }

  validateEmail(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.isEmailValid = emailRegex.test(this.email);
  }

  onUpload(): void {
    if (this.selectedFile && this.isEmailValid) {
      this.isLoading = true;
      this.generateInviteService
        .uploadFile(this.selectedFile, this.email)
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            this.isSuccess = response.success;
            this.popupMessage = response.message;
            this.showPopup = true;
          },
          error: (error) => {
            this.isLoading = false;
            this.isSuccess = false;
            this.popupMessage = 'An error occurred. Please try again.';
            this.showPopup = true;
          },
        });
    } else {
      alert('Please select a valid file and enter a valid email address.');
    }
  }

  closePopup(): void {
    this.showPopup = false;
    this.resetForm();
  }

  resetForm(): void {
    this.selectedFile = null;
    this.email = '';
    this.isEmailValid = false;
    this.fileError = '';

    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
}
