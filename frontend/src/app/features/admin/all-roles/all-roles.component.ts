import {Component, OnInit} from '@angular/core';
import {RoleService} from '@app/services/role.service';
import {SnackbarService} from '@app/services/snackbar.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {mergeMap, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-all-roles',
  templateUrl: './all-roles.component.html',
  styleUrls: ['./all-roles.component.css']
})
export class AllRolesComponent implements OnInit {

  roles$ = new BehaviorSubject([]);
  role$ = new BehaviorSubject({});

  addRoleForm: FormGroup;

  constructor(private roleService: RoleService,
              private snackbarService: SnackbarService,
              private fromBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.roleService.getAllRoles()
      .subscribe((response: any) => {
        this.roles$.next(response);
        console.log('Here all roles from BE', response);
      });

    this.addRoleForm = this.fromBuilder.group({
      role: [null, [Validators.required]],
    });
  }

  addRole() {
    this.roleService.addRole(this.role$.value)
      .pipe(mergeMap(value => this.roleService.getAllRoles()))
      .subscribe(value => {
        this.roles$.next(value);
      });
  }

  deleteRole(id: any) {
    this.roleService.deleteRole(id)
      .pipe(switchMap(value => this.roleService.getAllRoles()))
      .subscribe(value => {
        this.roles$.next(value);
      });
  }

}
