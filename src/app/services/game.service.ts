import { Injectable } from '@angular/core';
import { NewGameParams } from '../interfaces/new-game-params.interface';
import { Question } from '../interfaces/question.interface';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private _gameResult: number;
  public gameOptions: NewGameParams;
  public get gameResult(): number {
    return this._gameResult !== undefined
      ? this._gameResult
      : JSON.parse(localStorage.getItem('gameResults'));
  }

  public setGameOptions(gameOptions: NewGameParams): void {
    this.gameOptions = gameOptions;
  }

  public setGameResults(result: number): void {
    this._gameResult = result;
    localStorage.setItem('gameResults', JSON.stringify(this.gameResult));
  }

  public restoreGameQuestions(): Question[] {
    return JSON.parse(localStorage.getItem('gameQuestions'));
  }

  public restoreCurrentQuestionIndex(): number {
    return JSON.parse(localStorage.getItem('currentGameQuestionIndex'));
  }

  public restoreCurrentResult(): number {
    return JSON.parse(localStorage.getItem('currentGameResult'));
  }

  public getGameFinishState(): boolean {
    return JSON.parse(localStorage.getItem('gameFinishState'));
  }

  public saveGameQuestions(questions: Question[]): void {
    localStorage.setItem('gameQuestions', JSON.stringify(questions));
  }

  public saveCurrentQuestionIndex(currentQuestionIndex: number): void {
    localStorage.setItem(
      'currentGameQuestionIndex',
      JSON.stringify(currentQuestionIndex)
    );
  }

  public saveCurrentResult(currentResult: number): void {
    localStorage.setItem('currentGameResult', JSON.stringify(currentResult));
  }

  public saveGameFinishState(isFinished: boolean): void {
    localStorage.setItem('gameFinishState', JSON.stringify(isFinished));
  }

  public clearGameState(): void {
    localStorage.clear();
  }
}
