import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mimeType as mimeTypeValidator } from '../../shared/helpers/mime-type.validator';
import { DomSanitizer } from '@angular/platform-browser';

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

  constructor(private formBuilder: FormBuilder, public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
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
      imagePath: ['', [Validators.required], [ mimeTypeValidator ]],
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

}
