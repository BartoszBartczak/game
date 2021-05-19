import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { FinishComponent } from './finish/finish.component';
import { NewGameComponent } from './new-game/new-game.component';
import { OnGameComponent } from './on-game/on-game.component';
import { CategoriesResolve } from './resolvers/categories.resolver';

const routes: Routes = [
  {
    path: 'new_game',
    component: NewGameComponent,
    resolve: { categories: CategoriesResolve },
  },
  { path: 'on_game', component: OnGameComponent },
  { path: 'finish', component: FinishComponent },
  { path: 'error', component: ErrorComponent },
  { path: '', pathMatch: 'full', redirectTo: 'new_game' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
