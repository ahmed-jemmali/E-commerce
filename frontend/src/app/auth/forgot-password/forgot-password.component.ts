import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '@app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {

  user: any = {};
  forgotPasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {
  }

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: [null]
    });
  }

  forgotPassword() {
    console.log('this is my object : ', this.user);
    this.userService.forgotPassword(this.user)
      .subscribe(value => {
        console.log('response : ', value);
      });
  }

}
