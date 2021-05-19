import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category.interface';
import { QuizService } from '../services/quiz.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesResolve implements Resolve<Category[]> {
  constructor(private quizService: QuizService) {}

  resolve(): Observable<Category[]> {
    return this.quizService.getCategories();
  }
}
