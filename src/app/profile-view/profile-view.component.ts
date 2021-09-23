import { Component, OnInit } from '@angular/core';

// Fetch API data
import { FetchApiDataService } from '../fetch-api-data.service';

// Angular Material
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

// Form control
import { FormControl, Validators } from '@angular/forms';

// Components
import { UpdateViewComponent } from '../update-view/update-view.component';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  user: any = {};
  movies: any = {};
  favorites: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router,
  ) { }

  /**
   * Gets user info on initialization.
   */

  ngOnInit(): void {
    this.getUserData();
  }

  /**
    * @method getUserData()
    * Calls getUser() from the API which returns the user. 
    * Then calls getFvoriteMovies(), which has logic to return the user's favorite movies.
    */

  getUserData(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      this.getFavoriteMovies();
    });
  }

  /**
   * @method getFavoriteMovies()
   * Calls getAllMovies() which returns all movies, then calling filterFavorites(), which returns the user's favorite movies.
   */

  getFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      this.filterFavorites();
    });
  }

  /**
  * @method filterFavorites()
  * Filters movie list against the user's favorite movies. 
  * @returns Array of user's favorite movies.
  */

  filterFavorites(): void {
    this.favorites = this.movies.filter((movie: any) => this.user.FavoriteMovies.includes(movie._id));
    return this.favorites;
  }

  /**
   * @method openUpdateViewDialog()
   * Opens the Update view component when the "update" button is clicked on the user profile
   */

  openUpdateViewDialog(): void {
    this.dialog.open(UpdateViewComponent, {
      width: '400px',
    });
  }

  /**
   * @method deleteProfile()
   * deletes the user's data permanently
   */

  deleteProfile(): void {
    if (confirm('Are you sure? This cannot be undone.')) {
      this.fetchApiData.DeleteUserProfile().subscribe(() => {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open('Account Deleted', 'OK', {
          duration: 3000
        });
      });
    }
  }

  /**
   * Method that removes movie from user's list of favorite movies.
   * @param _id movie._id
   * @param title movie._title
   */

  removeFromFavorites(_id: string, title: string): void {
    this.fetchApiData.RemoveFromFavoriteMovies(_id).subscribe(() => {
      this.snackBar.open(
        `${title} has been removed`, 'OK', {
        duration: 2000,
      }
      );
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    });
  }
}