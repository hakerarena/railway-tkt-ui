import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GenerateInviteService } from '../../services/generate-invite.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  imports: [FormsModule],
  standalone: true,
})
export class FileUploadComponent {
  selectedFile: File | null = null;
  email: string = '';

  constructor(private generateInviteService: GenerateInviteService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  onUpload(): void {
    if (this.selectedFile && this.email) {
      this.generateInviteService
        .uploadFile(this.selectedFile, this.email)
        .subscribe({
          next: () => alert('Invite sent successfully!'),
          error: (error) => alert('Error: ' + error.message),
        });
    } else {
      alert('Please select a file and enter an email address.');
    }
  }
}
