import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '@app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any = {};
  id: any;
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null],
      password: [null],
    });
  }

  login() {
    console.log('this is my object : ', this.user);
    this.userService.login(this.user)
      .subscribe((data: any) => {
          console.log('data login :', data);
          this.router.navigate(['home']);

          // localStorage.setItem('Token', data.toString());
          this.id = data.user.id;
          console.log('id user : ', this.id);
          localStorage.setItem('userId', data.user.id);

          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          // this.userService.storeUserData(data.token, data.user);

          console.log('login information : ', data.message);
          console.log('MyToken : ', data.token);
        }
      );
  }


}
