import { Component, Input, OnInit } from '@angular/core';

// Fetch API
import { FetchApiDataService } from '../fetch-api-data.service';

// Angular Material
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-update-view',
  templateUrl: './update-view.component.html',
  styleUrls: ['./update-view.component.scss']
})
export class UpdateViewComponent implements OnInit {

  @Input() userData = { UserName: '', Password: '', Email: '', Birthday: '' }

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UpdateViewComponent>,

  ) { }

  ngOnInit(): void {
  }

  /**
   * @method updateUserData()
   * calls EditUserProfile with PUT method to update the user's data
   */

  updateUserData(): void {
    this.fetchApiData.EditUserProfile(this.userData).subscribe((response) => {
      this.dialogRef.close();
      localStorage.setItem('user', response.UserName);
      this.snackBar.open('Profile updated', 'OK', {
        duration: 2000,
      });
    }, (response) => {
      this.snackBar.open(response, 'OK', {
        duration: 2000,
      });
    });
    setTimeout(function () {
      window.location.reload();
    }, 1250);
  }

  /**
   * @method cancel()
   * Closes dialog.
   */

  cancel(): void {
    this.dialogRef.close();
  }

}