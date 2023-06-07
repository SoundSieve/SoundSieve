import { Component } from '@angular/core';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent {

  public noBtn: boolean = false;
  public hasImage: boolean = true;
  public signinUrl: string = '/auth/sign-in';

}
