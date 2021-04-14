import { AccountService } from 'src/app/account/account.service';
import { Observable, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mimeType as mimeTypeValidator } from '../../shared/helpers/mime-type.validator';
import { fileSize as fileSizeValidator } from '../../shared/helpers/file-size.validator';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { catchError, takeUntil } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import { doc } from 'rxfire/firestore';
import { StorageService } from '../storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-guitar',
  templateUrl: './add-new-guitar.component.html',
  styleUrls: ['./add-new-guitar.component.scss']
})
export class AddNewGuitarComponent implements OnInit {
  addNewForm: FormGroup;
  imagePreview: string;
  isSubmitting = false;
  fileUploadTouched = false;
  maxFileUploadSize: string;
  downloadURL: string;
  uploadProgress$: Observable<number>;
  destroy$: Subject<null> = new Subject();
  currentFirebaseAuthPlayer$: Observable<firebase.User | null>;
  currentUserId: string;
  currentUserDisplayName: string;
  currentUserProfileImage: string;

  constructor(
    private formBuilder: FormBuilder, 
    public sanitizer: DomSanitizer, 
    private firestore: AngularFirestore,
    private accountService: AccountService,
    private storageService: StorageService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    const fileSizeLimit = environment.maxFileUploadSize || 5000000;
    this.maxFileUploadSize = this.formatBytes(fileSizeLimit, 0);
    this.createAddNewForm();
    this.getCurrentFirebaseAuthPlayer();
  }

  getCurrentFirebaseAuthPlayer() {
    this.currentFirebaseAuthPlayer$ = this.accountService.getPlayer();

    this.currentFirebaseAuthPlayer$
      .subscribe((user: firebase.User) => {
        const userId = user.uid;
        const playerDocRef = firebase.firestore().doc(`players/${userId}`);

        doc(playerDocRef).subscribe(snapshot => {
          this.currentUserId = snapshot.id;

          const data = snapshot.data();
          this.currentUserDisplayName = data.displayName;
          this.currentUserProfileImage = data.profileImagePath;
        });
      });
  }

  // getter to simplify the template validation code
  get anf() { return this.addNewForm.controls; }

  createAddNewForm() {
    this.addNewForm = this.formBuilder.group({
      manufacturer: ['', [Validators.required]],
      modelName: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(250)]],
      itemStatus: ['1', [Validators.required]],
      yearMade: ['', [Validators.max(2050), Validators.min(1900)]],
      imagePath: ['', [Validators.required], [ mimeTypeValidator, fileSizeValidator ]],
      numStrings: ['', [Validators.max(8), Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.addNewForm.value) {
      this.isSubmitting = true;

      const formValues = this.addNewForm.value;
      const { manufacturer, modelName, description, itemStatus, yearMade, imagePath, numStrings } = formValues;

      // first, upload the image
      const path = 'images/'; // folder in the Firebase Storage bucket

      const { downloadUrl$, uploadProgress$ } = this.storageService.uploadFileAndGetMetadata(
        path,
        imagePath,
      );
  
      this.uploadProgress$ = uploadProgress$;

      downloadUrl$
        .pipe(
          takeUntil(this.destroy$),
          catchError((error) => {
            console.log(error);
            this.snackBar.open('Sorry, there was a problem uploading the image', 'Dismiss', { duration: 5000 });
            return null;
          }),
        )
        .subscribe((downloadUrl: string) => {
          this.isSubmitting = false;
          this.downloadURL = downloadUrl;

          // save the new guitar to the 'guitars' collection in Firestore 
          // (including the new image url in Firebase Storage)
          const newGuitar = {
            manufacturer, 
            modelName, 
            description,
            ownerId: this.currentUserId,
            ownerName: this.currentUserDisplayName,
            ownerImagePath: this.currentUserProfileImage,
            itemStatus, 
            yearMade, 
            imagePath: this.downloadURL, 
            numStrings,
            createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
          };

          this.firestore
            .collection('guitars')
            .add(newGuitar)
          .catch(error => {
              console.log('Something went wrong when adding the guitar to firestore: ', error);
              this.snackBar.open('Sorry, there was a problem saving this guitar', 'Dismiss', { duration: 5000 });
              this.isSubmitting = false;
          })

          this.snackBar.open('Guitar added successfully!', 'Go to My Collection', { duration: 5000 });
          this.router.navigateByUrl('/account/collection');
        });
    };
  }

  onImageSelected(event: Event) {
    this.fileUploadTouched = true;
    const file = (event.target as HTMLInputElement).files[0];

    if (file !== null && file !== undefined) {
      this.addNewForm.patchValue({ imagePath: file });
      this.addNewForm.get('imagePath').updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  }

  private formatBytes(bytes: number, decimals = 0): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

}
