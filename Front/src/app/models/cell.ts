import { Grid } from "./grid";

export class Cell {
    row: number; //coords
    column: number; //coords
    mined: boolean; //set to true if cell is a mine is 
    flag: boolean; //flag feature 
    color: string; //color for the content of the cell
    minedNeighbors: number; //number of mined neighbors
    status: boolean; //false means closed, true means opened

    constructor(data) {
        this.row = data.row; 
        this.column = data.column;
        this.mined = data.mined; 
        this.flag = data.flag;
        this.color = data.color;
        this.minedNeighbors = data.minedNeighbors || 0;
        this.status = data.status;
    }

    //returns Cell[] set of neighbors
    getNeighbors = (cells:Cell[]) => { return cells.filter(x => {return this.isNeighbor(x)}) };
    
        //open the cell's neighbors and moves on recursively if the neighbor has no mined neighbors 
        openNeighbors = (cells:Cell[]) => {
            if (this.status == true || this.mined ) { return };
            this.status = true;
            this.getNeighbors(cells).filter(x => {return !x.status}).forEach(neighbor => {
                if (neighbor.flag) { return };
                if (neighbor.minedNeighbors > 0) { return neighbor.status = true };
                return neighbor.openNeighbors(cells);
            });
        };
        
    //opens the cell
    open = () => { this.status = true };

    //sets cell color according with minedNeighbors quantity 
    setColor = () => { 
        switch (this.minedNeighbors) {
            case 1:
              this.color = 'blue';
              break;
            case 2:
              this.color =  'green';
              break;
            case 3:
              this.color =  'red';
              break;
            case 4:
              this.color =  'violet';
              break;
            case 5:
              this.color =  'orange';
              break;
            case 6:
              this.color =  'yellow';
              break;
            case 7:
              this.color =  'red';
              break;
            case 8:
                this.color =  'red';
                break;
            default:
                this.color =  '#333';
                break;
          }    
    };

    //returns true if cell is neighbor of the current cell (this)
    //this can be done in a single line with && but is more readable this way
    isNeighbor = (cell:Cell) => {
        /* Neighbors:
                    (x-1,y-1) - (x,y-1) - (x+1,y-1)
                    (x-1,y)   - (x,y)   - (x+1,y)
                    (x-1,y+1) - (x,y+1) - (x+1,y+1)
        */
        if (cell.row == this.row) {
            return (cell.column == this.column+1 ||  cell.column == this.column-1);
        }
        if (cell.row+1 == this.row || cell.row-1 == this.row) {
            return (cell.column == this.column || cell.column == this.column+1 || cell.column == this.column-1);
        }
    }
}
