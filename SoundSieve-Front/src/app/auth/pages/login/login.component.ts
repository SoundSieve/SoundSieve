import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  myForm: FormGroup = this._fb.group({
    email: ['test1@email.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  })

  constructor( private _fb: FormBuilder,
    private _router: Router,
    private _authService: AuthService ) {

  }

  login() {
    const { email, password } = this.myForm.value;

    this._authService.login( email, password )
    .subscribe(ok => {
      if( ok === true ) {
        this._router.navigateByUrl('/browse');
      } else {
        Swal.fire('Error', ok.error.msg, 'error');  
      }
    });
  }

}
