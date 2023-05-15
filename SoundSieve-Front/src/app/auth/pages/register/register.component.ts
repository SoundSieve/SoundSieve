import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ValidatorService } from 'src/app/shared/validators/validator.service';
import { RegisterBody, CheckboxOpt } from '../../interfaces/register.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  step1Form!: FormGroup;
  step2Form!: FormGroup;
  step3Form!: FormGroup;
  step_1 = false;
  step_2 = false;
  step_3 = false;
  step = 1;

  public isChecked: boolean = false;

  public checkbox: CheckboxOpt = {
    id: false,
    value: 'not-selected'
  }

  private bodyRequest: RegisterBody = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    terms: false,
  };

  public isDisabledField: boolean = false;

  constructor( private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _validatorService: ValidatorService ) {}

  ngOnInit(): void {
    this.step1Form = this._fb.group({
      email: ['test1@email.com', [Validators.required, Validators.email]],
    });
    
    this.step2Form = this._fb.group({
      firstName: ['Fernando', [Validators.required, Validators.minLength(3)]],
      lastName: ['Pérez', [Validators.required, Validators.minLength(3)]],
    });

    this.step3Form = this._fb.group({
      password: ['123456', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['123456', [Validators.required, Validators.minLength(6)]],
      newsletter: [''],
      terms: [this.checkbox],
    });
  }

  get step1() { return this.step1Form.controls; }
  get step2() { return this.step2Form.controls; }
  get step3() { return this.step3Form.controls; }

  isValidField(form: FormGroup, field: string) {
    return this._validatorService.isValidField(form, field);
  }

  checkTOS(event:any){
    this.isChecked = (event.target.checked===true) ? true : false;
    if(this.isChecked) {
      this.step3Form.controls['terms'].setValue({
        id: true,
        value: 'terms'
      })
    } else {
      this.step3Form.controls['terms'].setValue({
        id: false,
        value: 'terms'
      });
    }
  }

  next(){
    switch(this.step) {
      case 1:
        this.step_1 = true;
        if (!this.step1Form.invalid) {
          this.step++;
          this.step_1 = false;
          this.bodyRequest.email = this.step1Form.controls['email'].value;
        }
        break;
      case 2:
        this.step_2 = true;
        if (!this.step2Form.invalid) {
          this.step++;
          this.step_2 = false;
          this.bodyRequest.firstName = this.step2Form.controls['firstName'].value;
          this.bodyRequest.lastName = this.step2Form.controls['lastName'].value;
        }
        break;
    }
  }

  previous(){
    this.step--
    switch(this.step) {
      case 1:
        this.step_1 = false;
        break;
      case 2:

        this.step_2 = false;
        break;
    }
  }
  

  submit(){
    if(this.step==3){
      this.step_3 = true;
      console.log(!this.step3Form.invalid && this.isChecked);
      if (!this.step3Form.invalid && this.isChecked) {
        this.bodyRequest.password = this.step3Form.controls['password'].value;
        this.bodyRequest.newsletter = this.step1Form.controls['newsletter']?.value;
        this.bodyRequest.terms = this.step3Form.controls['terms'].value;
        this._authService.register(this.bodyRequest)
          .subscribe(ok => {
            if( ok === true ) {
              this._router.navigateByUrl('/browse');
            } else {
              Swal.fire('Error', ok.error.msg, 'error');  
            }
        });;
      }
    }
  }
}
