import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { NewGameParams } from '../interfaces/new-game-params.interface';
import { Category } from '../interfaces/category.interface';
import { Question } from '../interfaces/question.interface';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private readonly url: string = 'https://opentdb.com/api.php';
  constructor(private http: HttpClient) {}

  public getCategories(): Observable<any> {
    const url = 'https://opentdb.com/api_category.php';
    return this.http
      .get<{ trivia_categories: Category }>(url)
      .pipe(map((res) => res.trivia_categories));
  }

  public getQuestions(params: NewGameParams): Observable<Question[]> {
    const url = `${this.url}?${this.parseParams(params)}`;
    return this.http
      .get<{ results: Question[] }>(url)
      .pipe(map((res) => res.results));
  }

  private parseParams(params: NewGameParams): string {
    return Object.keys(params).reduce(
      (stringifiedParams, paramName) =>
        `${stringifiedParams}&${paramName}=${params[paramName]}`,
      ''
    );
  }
}
