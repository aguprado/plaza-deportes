import { Component } from '@angular/core';
import { AppState, StartGameAction, LoadGameAction } from './reducers';
import { Store } from '@ngrx/store';
import { Grid } from './models/grid';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './services/apiService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private apiService: ApiService, private store: Store<AppState>) {
    //sets the observable grid to send to the mines-grid-component
    this.grid = this.store.select('grid') 
  };

  games: any[]; // list of saved games
  grid: Observable<Grid>;  //the observable grid to send to the mines-grid-component
  rows: number = 10; //rows size of the grid
  columns: number = 10; //columns size of the grid
  mines: number = 10; //mines in the grid
  
  startGame = () => {
    // if mines < this.rows*this.columns, set it to this.rows*this.columns
    if (this.mines > this.rows*this.columns) { return this.mines = this.rows*this.columns };
    //if rows || columns < 5, set them to 5
    if (this.rows < 5) { this.rows = 5 };
    if (this.columns < 5) { this.columns = 5 };
    
    //create new grid and dispatch StartGameAction
    let grid = new Grid({rows: this.rows, columns: this.columns, mines: this.mines});
    this.store.dispatch(new StartGameAction({ grid: grid, status: 1, seconds: 0, created: new Date().getTime() }));
  };
  
  // dispaches the load game action, this is handled in the reducer cos changes the app state
  loadGame = (id) => { this.store.dispatch(new LoadGameAction(id)) };

  // deletes a game from the saved game list, this is not handled in the reducers cos does not affect app state
  deleteGame = (id) => { 
    this.apiService.deleteGame(id)
    .then((response) => {
      this.games.splice(this.games.findIndex(x =>{ return x._id == id}),1);
    });
  };
  
  // shows the saved game list, this is not handled in the reducers cos does not affect app state
  showGames = () => { 
    this.apiService.showGames()
    .then((response) => {
      this.games = response;
    });
    };
  
  toUTCString = (time) => { return new Date(time).toUTCString() };

}
