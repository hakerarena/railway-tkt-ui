import { Component } from '@angular/core';
import { FileUploadComponent } from './feature-components/file-upload/file-upload.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [FileUploadComponent],
})
export class AppComponent {
  title = 'railway-tkt-ui';
}
