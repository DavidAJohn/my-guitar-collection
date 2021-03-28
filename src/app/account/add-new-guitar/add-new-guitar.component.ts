import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mimeType as mimeTypeValidator } from '../../shared/helpers/mime-type.validator';
import { fileSize as fileSizeValidator } from '../../shared/helpers/file-size.validator';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

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

  constructor(private formBuilder: FormBuilder, public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const fileSizeLimit = environment.maxFileUploadSize || 5000000;
    this.maxFileUploadSize = this.formatBytes(fileSizeLimit, 0);
    this.createAddNewForm();
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
      console.log(formValues);
      this.isSubmitting = false;
    }
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
