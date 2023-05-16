import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  myForm: FormGroup = this._fb.group({
    email: ['test1@email.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  })

  constructor( private _fb: FormBuilder,
    private _router: Router,
    private _authService: AuthService ) {

  }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  private googleInit(){
    google.accounts.id.initialize({
      client_id: '1027260749299-6s5bhbp6tu6lqeo9bqsess82dale8of8.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse( response )
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "flat", size: "large", width: 300 }  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  }

  handleCredentialResponse( response: any) {
    this._authService.googleLogin( response.credential )
      .subscribe( resp => {
        this._router.navigateByUrl('/browse');
      });
  }

  public login() {
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
