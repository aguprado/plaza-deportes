import { Cell } from "./cell";

export class Grid {
    cells: Cell[]; //set of cells of the grid
    mines: number; //quantity of mines in the grid
    rows: number; //rows size of the grid
    columns: number; //columns size of the grid

    constructor(data) {
        this.mines = data.mines;
        this.rows = data.rows;
        this.columns = data.columns;
        this.cells = data.cells || [];
        this.setCells();
    }

    //open all the mined cells in the grid
    openMines = () => {
        this.cells.filter(x => {return x.mined == true}).map(x => x.status = true);
    }

    //creates cells and sets mines
    private setCells = () => {
        if (this.cells.length) {
            //if cells passed by parameter in a loaded game, just create the cells objects from the input cells
            this.cells = this.cells.map(cell => {
                return new Cell(cell);
            });
        } else {
            for (let row = 0; row < this.rows; row++) {
                for (let column = 0; column < this.columns; column++) {
                    this.cells.push(new Cell({row: row, column: column, mined: false}))
                }
            }
            //set the mines in the grid
            this.setMines();
            //set the quantity of mines neighbors for each cell in the grid
            this.setNeighbors();
        }
    }

    //place the <this.mines> mines into random cells
    private setMines = () => {
        let placed = this.mines;
        while (placed > 0) {
            let row = Math.floor(Math.random() * this.rows);
            let column =  Math.floor(Math.random() * this.columns);
            let cell = this.cells.find(x => {return x.row == row && x.column == column});
            if (!cell.mined) {cell.mined = true; placed -= 1}
        }
    }

    //set the quantity of mines neighbors for each cell in the grid
    private setNeighbors = () => {
        let mined = this.cells.filter(x => {return x.mined});
        this.cells.filter(x => {return !x.mined}).map(cell => {
            mined.forEach(mined => { 
                if (cell.isNeighbor(mined)) { 
                    cell.minedNeighbors += 1;
                    cell.setColor();
                }
            });
        });
    }

}
