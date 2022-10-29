import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {UserService} from '@app/services/user.service';
import {BehaviorSubject} from 'rxjs';
import {mergeMap, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllUsersComponent implements OnInit {

  users$ = new BehaviorSubject([]);
  searchValue: string;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getAllUsers()
      .subscribe(value => {
        this.users$.next(value);
        console.log(value);
      });
  }

  deleteUser(id: any) {
    // const dialogConfig = new MatDialogConfig;
    // dialogConfig.width = '550px';
    // this.dialog.open(RegisterComponent, dialogConfig);
    this.userService.deleteUser(id)
      .pipe(switchMap(value => this.userService.getAllUsers()))
      .subscribe(value => {
        this.users$.next(value);
      });
  }

  changeStatus(user: any, active: boolean) {
    console.log(active);
    this.userService.changeStatus({...user, active})
      .pipe(mergeMap(value => this.userService.getAllUsers()))
      .subscribe(value => {
        this.users$.next(value);
      });
  }

}
