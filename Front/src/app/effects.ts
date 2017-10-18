import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { AppState, LoadGameCompleteAction } from './reducers';
import { ApiService } from './services/apiService';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class Effects {

  //effect to load a game from the api by the id given in the action payload
  @Effect()
  loadGame: Observable<Action> = this.actions$
    .ofType('LOAD_GAME')
    .switchMap((action) => {
      return this.apiService.loadGame(action.payload)
      .then((response) => {
        //we call LoadGameCompleteAction with the game data from the endpoint
        return new LoadGameCompleteAction(response)
      });
    });

    constructor(private actions$: Actions, private apiService: ApiService, private store: Store<AppState>) { }
}