import { Component } from '@angular/core';
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
  selectedFile: File | null = null;
  email: string = '';
  isEmailValid: boolean = false;
  fileError: string = ''; // To store file validation error

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
      this.generateInviteService
        .uploadFile(this.selectedFile, this.email)
        .subscribe({
          next: () => alert('Invite sent successfully!'),
          error: (error) => alert('Error: ' + error.message),
        });
    } else {
      alert('Please select a valid file and enter a valid email address.');
    }
  }
}
