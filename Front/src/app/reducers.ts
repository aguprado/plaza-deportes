import { ActionReducer, Action } from '@ngrx/store';
import { Grid } from './models/grid';
import { Cell } from './models/cell';

// defines the app state structure
export interface AppState {
    grid: Grid;
    status: number; // 0: Game Not started, 1: Game in Progress, 2: Game Won, 3: Game Lost
    seconds: number; // time elapsed
    created: number; //miliseconds from 1970 that identifies the game to save & load
}

//sets the inital state of the app
const initialState: AppState = {
    grid: new Grid({mines: 0, rows: 0, columns: 0}),
    status: 0,
    seconds: 0,
    created: 0
};

//defines the constants of possible actions to dispatch
const START_GAME = 'START_GAME';
const OPEN_CELL = 'OPEN_CELL';
const RIGHT_CLICK_CELL = 'RIGHT_CLICK_CELL';
const LOAD_GAME = 'LOAD_GAME';
const LOAD_GAME_COMPLETE = 'LOAD_GAME_COMPLETE';

//defines and exports the actions of possible actions to dispatch
export class StartGameAction implements Action {
    readonly type = START_GAME;
    constructor(public payload: any) { }
}

export class OpenCellAction implements Action {
    readonly type = OPEN_CELL;
    constructor(public payload: Cell) { }
}

export class RightClickCellAction implements Action {
    readonly type = RIGHT_CLICK_CELL;
    constructor(public payload: Cell) { }
}

export class LoadGameAction implements Action {
    readonly type = LOAD_GAME;
    constructor(public payload: any) { }
}

export class LoadGameCompleteAction implements Action {
    readonly type = LOAD_GAME_COMPLETE;
    constructor(public payload: any) { }
}

//here we do most of the logic handling thea app state
export function reducer(state: AppState = initialState, action: Action) {
    let cell, grid;
	switch (action.type) {        
        //when starting the game we set the next state by all the parameters sent in action payload
        case START_GAME:
            return {
                grid: action.payload.grid,
                status: action.payload.status,
                seconds: action.payload.status,
                created: action.payload.created
            };
        case OPEN_CELL:
            cell = action.payload;
            //Clone the grid cos we will modify it, so we leave current state immutable
            grid = Object.assign({}, state.grid);
            if (cell.mined) { //if a mine was clicked => game lost
                //set clicked cell to red
                grid.cells.find(x => {return x.row === cell.row && x.column === cell.column}).color = 'red';
                //opens all the mines
                grid.openMines();
                //returns the new grid with opened mines and status 3 (lost)
                return {
                    grid: grid,
                    status: 3,
                    seconds: state.seconds,
                    created: state.created
                };
            }            
            if (cell.minedNeighbors) { //if the clicked cell has minedNeighbors => open just that cell
                grid.cells.find(x => {return x.row === cell.row && x.column === cell.column}).open();
                let status = state.status;
                //if all the cell without mines are open, game is won (status = 2)
                if (grid.cells.filter(x =>{ return x.status == true}).length === grid.rows*grid.columns-grid.mines) {
                    status = 2;
                    //here we set all the mines to green because the game is won
                    grid.cells.filter(x => { return x.mined }).map(x => {
                        x.status = true; x.color = 'green'; return x;
                    });
                }
                //return the new state with <grid, status> modified
                return {
                    grid: grid,
                    status: status,
                    seconds: state.seconds,
                    created: state.created
                };
            }
            //if clicked a mine with no minedNeighbors we open its 
            //neighbors and moves on recursively if the next neighbor has no mined neighbors 
            let status = state.status;
            grid.cells.find(x => {return x.row == cell.row && x.column == cell.column}).openNeighbors(grid.cells);
            //if all the cell without mines are open, game is won (status = 2)
            if (grid.cells.filter(x =>{ return x.status == true}).length == grid.rows*grid.columns-grid.mines) {
                status = 2;
                //here we set all the mines to green because the game is won
                grid.cells.filter(x => { return x.mined }).map(x => {
                    x.status = true; x.color = 'green'; return x;
                });
            }
            //return the new state with <grid, status> modified
            return {
                grid: grid,
                status: status,
                seconds: state.seconds,
                created: state.created
            };
        //when right clicking a cell we set it to flag mode or take flag away if already activated
        //and set the mines counter according
        case RIGHT_CLICK_CELL:
            //Clone the grid cos we will modify it, so we leave current state immutable
            grid = Object.assign({}, state.grid);
            cell = grid.cells.find(x => {return x.row === action.payload.row && x.column === action.payload.column});
            cell.flag ? grid.mines += 1 : grid.mines -= 1;
            cell.flag = !cell.flag;
            return {
                grid: grid,
                status: state.status,
                seconds: state.status,
                created: state.created
            };
        case LOAD_GAME_COMPLETE:
            //here the game was successfully loaded from server and we set the new state acording to the data
            //we create a new grid from the data returned by endpoint and set the other primitives values too
            return {
                grid: new Grid(action.payload.grid),
                status: action.payload.status,
                seconds: action.payload.seconds,
                created: action.payload.created
            };
        default:
			return state;
	}
}