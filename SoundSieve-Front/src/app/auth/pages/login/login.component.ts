import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('googleBtn') googleBtn!: ElementRef;
  public auth2: any;

  myForm: FormGroup = this._fb.group({
    email: ['test1@email.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  })

  constructor( private _fb: FormBuilder,
    private _router: Router,
    private _authService: AuthService,
    private ngZone: NgZone ) {

  }

  ngOnInit(): void {
    this.renderButton()
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

  }

  async startApp() {
    
    await this._authService.googleInit();
    this.auth2 = this._authService.auth2;

    this.attachSignin( this.googleBtn );
    
  };

  attachSignin(element: ElementRef) {
    
    this.auth2.attachClickHandler( element, {},
        (googleUser: any) => {
            const id_token = googleUser.getAuthResponse().id_token;
            // console.log(id_token);
            this._authService.googleLogin( id_token )
              .subscribe( resp => {
                // Navegar al Dashboard
                this.ngZone.run( () => {
                  this._router.navigateByUrl('/browse');
                })
              });

        }, (error) => {
            alert(JSON.stringify(error, undefined, 2));
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
