import {Component, OnInit} from '@angular/core';
import {UserService} from '@app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  id: any;
  roles: any = [];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    // todo get role
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

  /*toggle() {
    const links = document.querySelectorAll('a');
    console.log(links);
    links.forEach(link => {
      link.addEventListener('click', () => {
        links.forEach(li => {
          li.classList.add('collapsed');
        });
        link.classList.remove('collapsed');
      });
    });
  }*/
}
