import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  constructor( private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router ) {}

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
      newsletter: [true],
      terms: [true, [Validators.required]],
    });
  }

  get step1() { return this.step1Form.controls; }
  get step2() { return this.step2Form.controls; }
  get step3() { return this.step3Form.controls; }

  next(){
    switch(this.step) {
      case 1:
        this.step_1 = true;
        if (!this.step1Form.invalid) {
          this.step++;
          this.step_1 = false;
        }
        break;
      case 2:
        this.step_2 = true;
        if (!this.step2Form.invalid) {
          this.step++;
          this.step_2 = false;
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
      if (this.step3Form.invalid) { return }
    }
  }
}
