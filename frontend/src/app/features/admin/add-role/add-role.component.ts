import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {RoleService} from '@app/services/role.service';
import {GlobalConstants} from '../../../shared/global-constants';
import {SnackbarService} from '../../../services/snackbar.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {

  responseMessage: any;
  addRoleForm: FormGroup;

  constructor(private fromBuilder: FormBuilder,
              private roleService: RoleService,
              private router: Router,
              private snackbarService: SnackbarService) {
  }

  ngOnInit() {
    this.addRoleForm = this.fromBuilder.group({
      role: [null, [Validators.required, Validators.minLength(3)]],
    });
  }


  addRole() {
    console.log('this is my object : ', this.addRoleForm.value);

    this.roleService.addRole(this.addRoleForm.value).subscribe(
      (response: any) => {
        this.responseMessage = response.message;
        console.log('data category : ', response);
        this.snackbarService.openSnackBar(this.responseMessage, '');
        this.router.navigate(['/allRoles']);
      },
      (error: any) => {
        console.log('Error :', error);

        if (error.error.message) {
          this.responseMessage = error.error.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    );
  }

}
