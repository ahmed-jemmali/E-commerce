import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '@app/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  token: any;
  resetPasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.token = this.activatedRoute.snapshot.paramMap.get('token');
    console.log('token : ', this.token);

    this.resetPasswordForm = this.formBuilder.group(
      {
        password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@])\S{6,12}$/)]],
        confirmPwd: [null, [Validators.required]]
      },
      {
        validators: this.mustMatch('password', 'confirmPwd')
      }
    );
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  reset(data: any) {
    console.log('this is my object : ', data);
    this.userService.resetPassword(data, this.token)
      .subscribe(value => {
        this.router.navigate(['/', 'auth', 'login']);
        console.log('Information : ', value);
      });
  }

}
