import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';



@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,) { }

  /**
   * Runs getMovies() upon initialization and gets movie array for app. 
   */

  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * @Method getMovies() 
   * calls API with get request for a full movie list. 
   * @returns Movie array. 
   */

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * @Method openGenreViewDialog()
   * Opens genre-view with genre name and info.
   */

  openGenreViewDialog(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: { name, description },
      width: '450px'
    });
  }

  /**
   * @Method openDirectorViewDialog()
   * Opens director-view with name, bio, birth and death details.
   */

  openDirectorViewDialog(name: string, bio: string, birth: number, death: number): void {
    this.dialog.open(DirectorViewComponent, {
      data: { name, bio, birth, death },
      width: '450px'
    });
  }

  /**
   * @Method openSynopsisViewDialog()
   * Opens synopsis-view with title and description.
   */

  openSynopsisViewDialog(title: string, description: string): void {
    this.dialog.open(SynopsisViewComponent, {
      data: { title, description },
      width: '450px'
    });
  }

  /**
   * @Method addMovieToFavorites()
   * Calls Api post method PostToFavoriteMovies()
   */

  addMovieToFavorites(_id: string): any {
    this.fetchApiData.PostToFavoriteMovies(_id).subscribe((response: any) => {
      this.snackBar.open(
        'Added to favorites!', "OK", { duration: 2000, }
      );
    });
  }

}
