import { render } from '@testing-library/react';
import React, {Component} from 'react';
import "../css/legend.css";

export default class Legend extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <div>
                <br></br>
                <ul class="ul">
                    <li>
                        <div className="start glyphicon glyphicon-play-circle"></div>
                        <br></br>
                        <div>
                            Start Node
                        </div>
                    </li>
                    <li>
                        <div className="end glyphicon glyphicon-stop"></div>
                        <br></br>
                        <div>
                            End Node
                        </div>
                    </li>
                    <li>
                        <div className="wall glyphicon"></div>
                        <br></br>
                        <div>
                            Wall
                        </div>
                    </li>
                    <li>
                        <div className="path glyphicon glyphicon-certificate" ></div>
                        <br></br>
                        <div>    
                            Path
                        </div>
                    </li>
                </ul>

            </div>
        )
    }
}