import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as FeatureConstants from '../constants.js';

@Injectable({
  providedIn: 'root',
})
export class GenerateInviteService {
  constructor(private http: HttpClient) {}

  uploadFile(file: File, email: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('email', email);

    return this.http.post(
      FeatureConstants.prodBasePath + FeatureConstants.generateApi,
      formData
    );
  }
}
