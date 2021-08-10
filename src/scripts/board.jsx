import React, {Component} from 'react';
import { runGraphType } from './graph/graphAlgos';
import { makeGrid, generateGridWithNewNode} from './utilities';
import { Maze } from './maze/maze'
import Square from './square';
import MyNavbar from './navbar.jsx';
import SubBanner from './subbanner.jsx';
import Legend from './legend.jsx';


const NODESIZE = 34;
const NAVBARSIZE = 75;


const GRID_HEIGHT = Math.floor( (window.innerHeight - NODESIZE - NAVBARSIZE * 2 - NAVBARSIZE) / NODESIZE);
const GRID_WIDTH = Math.floor((window.innerWidth-NODESIZE*2) / NODESIZE);
const ROWEND = GRID_HEIGHT;
const COLEND = GRID_WIDTH;

let NODEROWSTART = Math.floor(GRID_HEIGHT / 2);
let NODECOLSTART = Math.floor(GRID_WIDTH / 2 / 2);
let NODEROWEND = NODEROWSTART;
let NODECOLEND = NODECOLSTART * 3;

let last_clicked_i = -1;
let last_clicked_j = -1;

let timeouts = []

window.onresize = () => { window.location.reload(); };

export default class Board extends Component {
    constructor() {
      super();
      this.state = {
        grid: [],
        downClick: false,
        startClicked: false,
        endclicked: false,
        strategy: "BFS"
      };
    }

    componentDidMount() {
      const grid = makeGrid(ROWEND, COLEND, NODEROWSTART, NODECOLSTART, NODEROWEND, NODECOLEND);
      this.setState({ 
        grid: grid,
      });
    }

    componentWillUnmount() {
      if (timeouts.length > 0) {
        for (let i = 0; i < timeouts.length; i++) {
          clearTimeout(timeouts[i])
        }
      }
      timeouts = []
    }
    
    resetState = (algo, fromWall) => {
      if (timeouts.length > 0) {
        
        for(let i = 0; i < timeouts.length; i++) {
          clearTimeout(timeouts[i])
        }
        timeouts = []
      }
      for(let i = 0; i < ROWEND; i++) {
        for(let j = 0; j < COLEND; j++) {
          if (i === NODEROWSTART && j === NODECOLSTART || i === NODEROWEND && j === NODECOLEND) {
            continue;
          }
          const id = String(i) + '-' + String(j);
          if(fromWall) {
            this.state.grid[i][j].wall = false;
          }
          if (!this.state.grid[i][j].wall) {
            document.getElementById(id).className = 'square';
          }
        }
      }
      this.setState({ 
        strategy: algo
      });
    
      
      
    }

    runSelected = () => {
      this.resetState(this.state.strategy, false)
      const searchOrder = runGraphType(this.state.grid, this.state.strategy, [NODEROWSTART, NODECOLSTART], [NODEROWEND, NODECOLEND]);
      this.animate(searchOrder[0], searchOrder[1]);
    }

    animate = (searchOrder, path) => {
      for (let i = 0; i < searchOrder.length; i++) {
        let animateTimer = setTimeout(() => {
          const curSquare = searchOrder[i];
          if (curSquare.end) {
              this.animatePath(path);
          }
        
          if (!curSquare.start && !curSquare.end) {
            const id = String(curSquare.i) + '-' + String(curSquare.j);
            document.getElementById(id).className = 'square square-seen';
          }
        }, 10 * i);
        timeouts.push(animateTimer)
      }
    }
    
    animatePath = (path) => {
      for (let j = 0; j < path.length; j++) {
        let pathTimer = setTimeout(() => {
          const pathSquare = path[j];
          const id = String(pathSquare.i) + '-' + String(pathSquare.j);
          document.getElementById(id).className = 'square square-path glyphicon glyphicon-certificate';
        }, 20 * j);
        timeouts.push(pathTimer)
      }
    }

    animateWall = (wall) => {
      for (let j = 0; j < wall.length; j++) {
        let pathTimer = setTimeout(() => {
          const wallSquare = wall[j];
          wallSquare.wall = true;
          const id = String(wallSquare.i) + '-' + String(wallSquare.j);
          document.getElementById(id).className = 'square square-wall';
        }, 20 * j);
        timeouts.push(pathTimer)
      }
    }
     
    handleDown = (i, j) => {
      if (i === NODEROWSTART && j === NODECOLSTART) {
        this.resetState(this.state.strategy, false);
        this.setState({
          downClick: true,
          startClicked: true
        })
      } else if (i === NODEROWEND && j === NODECOLEND) {
        this.resetState(this.state.strategy, false);
        this.setState({
          downClick: true,
          endClicked: true
        })
        
      } else {
          const updatedGrid = generateGridWithNewNode(this.state.grid, [NODEROWSTART, NODECOLSTART], [NODEROWEND, NODECOLEND], i, j, this.state.startClicked, this.state.endClicked)
          last_clicked_i = i;
          last_clicked_j = j;
          this.setState({
            grid: updatedGrid,
            downClick: true
          })
        }

    }
  
    handleMove = (i, j) => {
      //console.log("handling Move")
      const downClicked = this.state.downClick;
      const startClicked = this.state.startClicked;
      const endClicked = this.state.endClicked;
      if (downClicked && startClicked) {
        if(!(i === NODEROWSTART && j === NODECOLSTART)) {
          const updatedGrid = generateGridWithNewNode(this.state.grid, [NODEROWSTART, NODECOLSTART], [NODEROWEND, NODECOLEND], i, j, startClicked, endClicked);
          NODEROWSTART = i;
          NODECOLSTART = j;
          this.setState({
            grid: updatedGrid,
          })
          
        }
      } else if (downClicked && endClicked) {
          if(!(i === NODEROWEND && j === NODECOLEND)){
            const updatedGrid = generateGridWithNewNode(this.state.grid, [NODEROWSTART, NODECOLSTART], [NODEROWEND, NODECOLEND], i, j, startClicked, endClicked)
            NODEROWEND = i;
            NODECOLEND = j;
            this.setState({
              grid: updatedGrid,
            })
          }
      } else if (downClicked && !(i == last_clicked_i && last_clicked_j == j)) {
        const updatedGrid = generateGridWithNewNode(this.state.grid, [NODEROWSTART, NODECOLSTART], [NODEROWEND, NODECOLEND], i, j, startClicked, endClicked)
        last_clicked_i = i;
        last_clicked_j = j;
        this.setState({
          grid: updatedGrid,
        })
      }
    }
  
    handleUp = () => {
      //console.log("handling up")
      this.setState({
        downClick: false,
        startClicked: false,
        endClicked: false,
        strategy: this.state.strategy
      })
    }

    mazify = (type) => {
      this.resetState(this.state.strategy, true);
      let maze = new Maze(this.state.grid, type);
      this.animateWall(maze.getMaze());
    }
   
    render() {
      //const { grid } = this.state;  
      return (
        <div>
         <MyNavbar algo={this.state.strategy} runSelected={this.runSelected} resetState={this.resetState} mazify={this.mazify}></MyNavbar>
          <SubBanner selected={this.state.strategy}></SubBanner>
          <div className='gridcol'>
            {this.state.grid.map((row, id) => {
              return (
                <div key={id}>
                  {row.map((square, rowkey) => {
                    const {i, j, start, wall, end} = square;
                    return (
                      <Square
                        key={rowkey}
                        row={i}
                        end={end}
                        wall={wall}
                        start={start}
                        col={j}
                        handleDown ={this.handleDown}
                        handleMove = {this.handleMove}
                        handleUp = {this.handleUp}
                        >
                        </Square>
                    );
                  })}
                </div>
                
              );
            })}
          </div>
        </div>
        
      )
  }
}



