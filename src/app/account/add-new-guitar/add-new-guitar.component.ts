import { ItemStatus } from './../../shared/models/baseItem';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-guitar',
  templateUrl: './add-new-guitar.component.html',
  styleUrls: ['./add-new-guitar.component.scss']
})
export class AddNewGuitarComponent implements OnInit {
  addNewForm: FormGroup;
  isSubmitting = false;

  constructor(private formBuilder: FormBuilder) { }

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
      imagePath: [{value: 'An image can be uploaded later', disabled: true}],
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
}
