import { Component, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/shared/services/user/user.service';


declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {

  public auth2: any;

  myForm: FormGroup = this._fb.group({
    email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
    remember: [false]
  })

  errors: Map<string,string> = new Map<string,string>();

  constructor( private readonly _fb: FormBuilder,
               private readonly _router: Router,
               private readonly _userService: UserService,
               private readonly _ngZone: NgZone ) { }

  ngAfterViewInit(): void {
    // this.renderButton();
  }

  public login() {
    this._userService.login( this.myForm.value )
    .subscribe({
      next: () => {
        if ( this.myForm.get('remember').value ){ 
          localStorage.setItem('email', this.myForm.get('email').value );
        } else {
          localStorage.removeItem('email');
        }
          // Navegar al Dashboard
          this._router.navigateByUrl('/browse');
      }, error: (err) => {
        // Si sucede un error
        if(err.errors) {
          let keys = Object.keys(err.errors);
          for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            this.errors.set(key, err.errors[key].msg);
          }
          };
        if(err.error) {
          Swal.fire('Error', err.error.msg, 'error');
        }
      }});
  }

  // renderButton() {
  //   gapi.signin2.render('my-signin2', {
  //     'scope': 'profile email',
  //     'width': 320,
  //     'height': 40,
  //     'longtitle': true,
  //     'theme': 'flat',
  //   });

  //   this.startApp();

  // }

  // async startApp() {
  //   await this._userService.googleInit();
  //   this.auth2 = this._userService.auth2;

  //   this.attachSignin( document.getElementById('my-signin2') );
  // };

  // attachSignin(element) {
  //   this.auth2.attachClickHandler( element, {},
  //       (googleUser) => {
  //           const id_token = googleUser.getAuthResponse().id_token;
  //           this._userService.loginGoogle( id_token )
  //             .subscribe( resp => {
  //               this._ngZone.run( () => {
  //                 this._router.navigateByUrl('/browse');
  //               })
  //             });
  //       }, (error) => {
  //           alert(JSON.stringify(error, undefined, 2));
  //       });
  // }

}
