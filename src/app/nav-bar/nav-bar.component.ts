
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
    public router: Router,
    public snackBar: MatSnackBar,
    public toolBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  /**
  * @method logoutUser()
  * clears local storage and logs the user out
  */

  logoutUser(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
    this.snackBar.open("You've been logged out", "OK", {
      duration: 2000,
    });
  }

}
