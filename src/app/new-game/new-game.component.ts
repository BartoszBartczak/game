import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Category } from '../interfaces/category.interface';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss'],
})
export class NewGameComponent implements OnInit {
  public categories: Category[];
  public amount: number[] = [].constructor(50);
  public difficulties: string[] = ['easy', 'medium', 'hard'];

  public newGameOptions: FormGroup = new FormGroup({
    category: new FormControl(null, Validators.required),
    amount: new FormControl(null, Validators.required),
    difficulty: new FormControl(null, Validators.required),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gameOptionsService: GameService
  ) {}

  ngOnInit(): void {
    this.categories = this.route.snapshot.data.categories;
  }

  public startGame(): void {
    this.gameOptionsService.setGameOptions(this.newGameOptions.value);
    this.router.navigate(['on_game']);
  }
}
