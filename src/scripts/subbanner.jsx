import React, {Component} from 'react';
import Legend from './legend.jsx';
import '../css/subbanner.css';

export default class SubBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: props.selected
        }
    }

    getText() {
        let begin = "You've Chosen"
        console.log(this.props.selected)
        if(this.props.selected == "BFS") {
            return begin + " Breadth-First Search";
        } else if(this.props.selected == "DFS") {
            return begin + " Depth-FirstSearch";
        } else if(this.props.selected == "ASTAR") {
            return begin + " A*Star Search"
        } else {
            return begin + " Breadth-First Search";
        }
    }

    render() {
        return(
            <div >
                <div class="subbanner">{this.getText()}</div>
                <div>
                    <Legend></Legend>
                </div>
            </div>
        )
    }
}