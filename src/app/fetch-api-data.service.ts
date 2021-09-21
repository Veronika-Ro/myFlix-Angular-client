import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';
import { map } from 'rxjs/operators';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';

const apiUrl = 'https://veronikas-myflix-app.herokuapp.com/';
// Get token from local storage for requests
const token = localStorage.getItem('token');
// Get username from localStorage for URLs
const username = localStorage.getItem('user');

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  constructor(private http: HttpClient) { }


  // User Registration (public service)
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails)
      .pipe(
        catchError(this.handleError)
      );
  }


  // User Login (public service)
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails)
      .pipe(
        catchError(this.handleError)
      );
  }


  // Get All Movies (private service)
  getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  // Get a single movie by Id (private service)
  getMovie(): Observable<any> {
    return this.http.get(apiUrl + 'movies/:movieId', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )

  }


  // Get a director by name (private service)
  getDirector(): Observable<any> {
    return this.http.get(apiUrl + 'directors/:name', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }


  // Get a genre by name (private service)
  getGenre(): Observable<any> {
    return this.http.get(apiUrl + 'genres/:name', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }


  // Get a User by username (private service)
  getUser(): Observable<any> {
    return this.http.get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }


  // Get the favoritemovies-array of a user (private service)
  getFavoriteMovies(_id: string): Observable<any> {
    return this.http.get(apiUrl + `users/${username}/movies/${_id}`,
      {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          }
        )
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
  }


  // Add a movie to the favoritemovies-array (private service)
  PostToFavoriteMovies(_id: string): Observable<any> {
    return this.http.post(apiUrl + `users/${username}/movies/${_id}`,
      {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          }
        )
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
  }


  // Edit user profile (private service)
  EditUserProfile(userData: any): Observable<any> {
    return this.http.put(apiUrl + `users/${username}/update`,
      {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          }
        )
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
  }


  //Delete user profile (private service)
  DeleteUserProfile(): Observable<any> {
    return this.http.delete(apiUrl + `users/${username}`,
      {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          }
        )
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
  }


  // Remove a movie from the favoritemovies-array (private service)
  RemoveFromFavoriteMovies(_id: string): Observable<any> {
    return this.http.delete(apiUrl + `users/${username}/movies/remove/${_id}`,
      {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          }
        )
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
  }

  // extract Response Data
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  // handleError Function
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    } return throwError(
      'Something unexpected happened, please try again later'
    );
  }
}