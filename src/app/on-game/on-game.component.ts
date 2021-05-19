import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { QuizService } from '../services/quiz.service';
import { NewGameParams } from '../interfaces/new-game-params.interface';
import { Router } from '@angular/router';
import { Question } from '../interfaces/question.interface';

@Component({
  selector: 'app-on-game',
  templateUrl: './on-game.component.html',
  styleUrls: ['./on-game.component.scss'],
})
export class OnGameComponent implements OnInit {
  private gameOptions: NewGameParams;
  private goodAnswersCounter = 0;
  private gameFinishState = false;
  public questions: Question[];

  public currentQuestionIndex = 0;
  public currentQuestion: string;
  public currentQuestionAnswers: any[];

  constructor(
    private router: Router,
    private gameService: GameService,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.gameOptions = this.gameService.gameOptions;
    this.gameFinishState = this.gameService.getGameFinishState();
    if (!this.gameOptions) {
      this.handleRestoringGame();
    } else {
      this.quizService
        .getQuestions(this.gameOptions)
        .subscribe((questions: Question[]) => {
          this.questions = questions;
          this.gameService.saveGameQuestions(questions);
          this.prepareNextQuestion();
        });
    }
  }

  public handleQuestionAnswer(answer: any): void {
    this.checkQuestion(answer, this.currentQuestionIndex);
    this.checkNextQuestions(this.currentQuestionIndex);
  }

  public checkQuestion(answer: any, questionIndex: number): void {
    if (this.questions[questionIndex].correct_answer === answer) {
      this.goodAnswersCounter += 1;
      this.gameService.saveCurrentResult(this.goodAnswersCounter);
    }
  }

  public checkNextQuestions(questionIndex: number): void {
    if (questionIndex + 1 === this.questions.length) {
      this.gameService.setGameResults(this.goodAnswersCounter);
      this.gameService.saveGameFinishState(true);
      this.router.navigate(['finish']);
    } else {
      this.currentQuestionIndex = questionIndex + 1;
      this.gameService.saveCurrentQuestionIndex(this.currentQuestionIndex);
      this.prepareNextQuestion();
    }
  }

  private handleRestoringGame(): void {
    this.questions = this.gameService.restoreGameQuestions();
    this.currentQuestionIndex = this.gameService.restoreCurrentQuestionIndex();
    this.goodAnswersCounter = this.gameService.restoreCurrentResult();
    if (!this.questions) {
      this.router.navigate(['new_game']);
    } else if (this.gameFinishState) {
      this.gameService.setGameResults(this.goodAnswersCounter);
      this.router.navigate(['finish']);
    } else {
      this.prepareNextQuestion();
    }
  }

  private prepareNextQuestion(): void {
    const answers: any[] = [
      ...this.questions[this.currentQuestionIndex].incorrect_answers,
      this.questions[this.currentQuestionIndex].correct_answer,
    ];
    this.currentQuestion = this.questions[this.currentQuestionIndex].question;
    this.currentQuestionAnswers = this.shuffle(answers);
  }

  /*
    Fisher-Yates shuffle
  */
  private shuffle(array: any[]): any[] {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  }
}
