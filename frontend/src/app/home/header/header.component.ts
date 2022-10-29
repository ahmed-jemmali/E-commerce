import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '@app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  id: any;
  user: any = {};
  opened = false;

  constructor(private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
    this.id = this.userService.getUserId();
    this.userService.getUserById(this.id)
      .subscribe(value => {
          this.user = value;
        }
      );
  }

  toggleSideBar() {
    document.body.classList.toggle('toggle-sidebar');
  }

  searchBarShow() {
    document.getElementById('search-bar-show').classList.toggle('search-bar-show');
  }

  logout() {
    this.userService.logout();
  }

}
