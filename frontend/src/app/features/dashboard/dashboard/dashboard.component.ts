import {Component, OnInit} from '@angular/core';
import {DashboardService} from '@app/services/dashboard.service';
import {UserService} from '@app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data: any;
  id: any;
  roles: any = [];

  constructor(private dashboardService: DashboardService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.dashboardService.getDetails()
      .subscribe(value => {
        this.data = value;
        console.log(this.data);
      });

    this.id = this.userService.getUserId();
    this.userService.getUserById(this.id)
      .subscribe((data) => {
        this.roles = data.role;
        console.log(this.roles);
      });
  }

  checkRole(expected: string[], roles: any[]): boolean {
    const result = roles.find(roleElement => expected.indexOf(roleElement.role) >= 0);
    return result != null;
  }
}
