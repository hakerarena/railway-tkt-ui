import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  imports: [FormsModule, HttpClientModule],
})
export class FileUploadComponent {
  selectedFile: File | null = null;
  email: string = '';

  constructor(private http: HttpClient) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    if (this.selectedFile && this.email) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('email', this.email);

      this.http
        .post(
          'https://railway-ticket-calendar-invite.onrender.com/invite/generate/v2',
          formData
        )
        .subscribe({
          next: (response) => alert('Invite sent successfully!'),
          error: (error) => alert('Error: ' + error.message),
        });
    } else {
      alert('Please select a file and enter an email address.');
    }
  }
}
