import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ValidatorService } from 'src/app/shared/validators/validator.service';
import { RegisterBody, CheckboxOpt } from '../../interfaces/register.interface';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/shared/services/user/user.service';
import { RegisterForm } from 'src/app/shared/interfaces/RegisterForm.interface';

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

  private bodyRequest: RegisterForm = {
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    newsletter: false,
    terms: false,
  };

  public isDisabledField: boolean = false;

  constructor( private readonly _fb: FormBuilder,
               private readonly _authService: AuthService,
               private readonly _userService: UserService,
               private readonly _router: Router,
               private readonly _validatorService: ValidatorService ) {}

  ngOnInit(): void {
    this.step1Form = this._fb.group({
      email: ['test1@email.com', [Validators.required, Validators.email]],
    });
    
    this.step2Form = this._fb.group({
      username: ['MayDoubt', [Validators.required, Validators.minLength(3)]],
      firstName: ['Fernando', [Validators.required, Validators.minLength(3)]],
      lastName: ['Pérez', [Validators.required, Validators.minLength(3)]],
    });

    this.step3Form = this._fb.group({
      password: ['123456', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['123456', [Validators.required, Validators.minLength(6)]],
      newsletter: [''],
      terms: [this.checkbox],
    }, {
      validators: this.samePasswords('password', 'passwordConfirm')
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

  checkPassMatches() {
    const pass1 = this.step3Form.get('password').value;
    const pass2 = this.step3Form.get('passwordConfirm').value;

    if( pass1 === pass2 ) {
      return false;
    } else {
      return true;
    }
  }

  samePasswords(pass1: string, pass2: string) {
    return ( formGroup: FormGroup ) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if( pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({passwordsDoNotMatch: true})
      }
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
          this.bodyRequest.username = this.step2Form.controls['username'].value;
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
      if (!this.step3Form.invalid && this.isChecked) {
        this.bodyRequest.password = this.step3Form.controls['password'].value;
        this.bodyRequest.newsletter = this.step1Form.controls['newsletter']?.value;
        this.bodyRequest.terms = this.step3Form.controls['terms'].value;
        this._userService.newUser(this.bodyRequest)
          .subscribe({
            next: () => {
                // Navegar al Dashboard
                this._router.navigateByUrl('/browse');
            }, error: (err) => {
              // Si sucede un error
                Swal.fire('Error', err.msg, 'error');
            }});
        }
      }
    }
}
