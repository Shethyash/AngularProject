import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  validationMessages = {
    fullName: {
      required: 'Full Name is required.',
      minlength: 'Full Name must be greater than 2 characters.',
      maxlength: 'Full Name must be less than 10 characters.'
    },
    email: {
      required: 'Email is required.'
    },
    phone: {
      required: 'Phone is required.'
    },
    skillName: {
      required: 'Skill Name is required.',
    },
    experienceInYears: {
      required: 'Experience is required.',
    },
    proficiency: {
      required: 'Proficiency is required.',
    },
  };

  formErrors = {
    fullName: '',
    email: '',
    phone: '',
    skillName: '',
    experienceInYears: '',
    proficiency: ''
  };
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // form builder class
    this.employeeForm = this.fb.group ({
      fullName: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(2)]],
      email: ['', Validators.required],
      phone: [''],
      skills: this.fb.group({
        skillName: ['', Validators.required],
        experienceInYears: ['', Validators.required],
        proficiency: ['', Validators.required]
      })
    });

    // formGroup and formControll
    // this.employeeForm =new FormGroup({
    //   fullName: new FormControl(),
    //   email:new FormControl(),
    //   skills:new FormGroup({
    //     skillName:new FormControl(),
    //     experienceInYears: new FormControl(),
    //     proficiency: new FormControl()
    //   })
    // });

    // on change event on single field
    // this.employeeForm.get('fullName').valueChanges.subscribe(
    //   (value: string) => {
    //     console.log(value);
    //   });

    // on change event on entire form
    // this.employeeForm.valueChanges.subscribe(
    //   (value: string) => {
    //     console.log(JSON.stringify(value));
    //   });

    this.employeeForm.valueChanges.subscribe(
      data => {
        this.logValidationErrors(this.employeeForm);
      });
  }

  onSubmit(): void {
    console.log(this.employeeForm);
  }

  onLoadDataClick(): void {
    // setValue method
    // this.employeeForm.setValue({
    //   fullName: 'Yash Sheth',
    //   email:'ysheth@codal.com',
    //   skills:{
    //     skillName:'angular',
    //     experienceInYears: '1',
    //     proficiency: 'beginner'
    //   }
    // })

    // patchValue method
    // this.employeeForm.patchValue({
    //   fullName: 'Yash Sheth',
    //   email: 'ysheth@codal.com',
    //   skills: {
    //     skillName: 'angular',
    //     experienceInYears: '1',
    //     proficiency: 'beginner'
    //   }
    // });

    // this.logValidationErrors(this.employeeForm);
    // console.log(this.formErrors);
  }

  logValidationErrors(group: FormGroup = this.employeeForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      } else {
        this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid
          && (abstractControl.touched || abstractControl.dirty)) {
          const messages = this.validationMessages[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    });
  }
}
