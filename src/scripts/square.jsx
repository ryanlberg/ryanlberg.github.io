import React, {Component} from 'react';


export default class Square extends Component {
    constructor(props) {
      super(props);
      this.state = {
        row: props.row,
        col: props.col,
        start: props.start,
        end: props.end,
        wall: props.wall,
        handleDown: props.handleClick,
        handleMove: props.handleMove,
        handleUp: props.handleUp,
      };
    }
  
    
    render() {
      let classname = '';
      let cls = '';
      if (this.props.start) {
        classname = ' square-start';
        cls = 'glyphicon glyphicon-play-circle';
      } else if (this.props.end) {
        classname = ' square-end'
        cls = 'glyphicon glyphicon-stop'
      } else if (this.props.wall) {
        classname = ' square-wall'
        
      } else {}
      return (
          <div id={String(this.props.row) + "-" + String(this.props.col)} className={`square` + classname} onMouseDown={() => this.props.handleDown(this.props.row, this.props.col)} onMouseUp={() => this.props.handleUp()} onMouseMove={() => this.props.handleMove(this.props.row, this.props.col)}>
            <div className={cls}></div>
          </div>
      )  
      
    }
  }