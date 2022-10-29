import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {RoleService} from '@app/services/role.service';
import {UserService} from '@app/services/user.service';
import {GlobalConstants} from '@app/shared/global-constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  disabled = false;
  ShowFilter = true;
  limitSelection = false;
  dropdownSettings: any = {};

  roles: any;
  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private roleService: RoleService) {
  }


  ngOnInit() {
    this.signupForm = this.formBuilder.group(
      {
        firstName: [null, [Validators.required, Validators.pattern(GlobalConstants.firstNameRegex)]],
        lastName: [null, [Validators.required, Validators.pattern(GlobalConstants.lastNameRegex)]],
        address: [null, [Validators.required]],
        phone: [null, [Validators.required, Validators.pattern(GlobalConstants.contactNumberRegex)]],
        username: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
        email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
        password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@])\S{6,12}$/)]],
        confirmPwd: [null, [Validators.required]],
        active: [false],
        role: [null, Validators.required],

      },
      {
        validators: this.mustMatch('password', 'confirmPwd')
      }
    );

    this.roleService.getAllRoles()
      .subscribe((response: any) => {
        this.roles = response;
      });

    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'role',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: this.ShowFilter
    };
  }

  onItemSelect(item: any) {
    console.log('onItemSelect', item);
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

  signup() {
    console.log('this is my object : ', this.signupForm.value);
    this.userService.signup(this.signupForm.value)
      .subscribe((data: any) => {
        this.router.navigate(['/']);
      });
  }

}
