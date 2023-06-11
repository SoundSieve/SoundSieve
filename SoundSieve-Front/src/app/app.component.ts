import { Component, computed, effect, inject } from '@angular/core';
import { UserService } from './shared/services/user/user.service';
import { AuthStatus } from './auth/interfaces/auth.interface';
import { Router } from '@angular/router';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

}
