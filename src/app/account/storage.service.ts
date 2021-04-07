import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { switchMap } from 'rxjs/operators';

export interface FilesUploadMetadata {
  uploadProgress$: Observable<number>;
  downloadUrl$: Observable<string>;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: AngularFireStorage) { }

  uploadFileAndGetMetadata(imageFolderPath: string, fileToUpload: File,): FilesUploadMetadata {
    const { name } = fileToUpload;
    const filePath = `${imageFolderPath}/${new Date().getTime()}_${name}`;

    const uploadTask: AngularFireUploadTask = this.storage.upload(
      filePath,
      fileToUpload,
    );

    return {
      uploadProgress$: uploadTask.percentageChanges(),
      downloadUrl$: this.getDownloadUrl$(uploadTask, filePath),
    };
  }

  private getDownloadUrl$(uploadTask: AngularFireUploadTask, path: string,): Observable<string> {
    return from(uploadTask).pipe(
      switchMap((_) => this.storage.ref(path).getDownloadURL()),
    );
  }
  
}
