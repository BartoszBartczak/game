import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss'],
})
export class FinishComponent implements OnInit {
  public result: number;
  constructor(private router: Router, private gameService: GameService) {}

  ngOnInit(): void {
    this.result = this.gameService.gameResult;
  }

  public startNewGame(): void {
    this.gameService.clearGameState();
    this.router.navigate(['new_game']);
  }
}
