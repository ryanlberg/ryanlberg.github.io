import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'


export default class MyNavbar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        algo: props.algo,
        runSelected: props.runSelected,
        resetState: props.resetState,
        mazify: props.mazify
      }
    }

    render () {
      return (
        
      <Navbar bg="dark">
        <div className="navbar-brand-center">Algo-View</div>
       
        <Nav class="btn btn-toolbar">
          
          <Dropdown as={ButtonGroup}>
            
            <Button className='btn btn-info'>Choose an Algorithm!</Button>

            <Dropdown.Toggle className='btn btn-info'  id="dropdown-split-basic" />

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => this.state.resetState("BFS", false)}>Breadth-First Search</Dropdown.Item>
              <Dropdown.Item onClick={() => this.state.resetState("DFS", false)}>Depth-First Search</Dropdown.Item>
              <Dropdown.Item onClick={() => this.state.resetState("ASTAR", false)}>A*STAR Search</Dropdown.Item>
            </Dropdown.Menu>

          </Dropdown>
          
         
          <Dropdown class="nav-item" as={ButtonGroup}>
            
            <Button className='btn btn-info' variant="success">Maze Type!</Button>
           
            <Dropdown.Toggle className='btn btn-info'  id="dropdown-split-basic" />
           
           <Dropdown.Menu>
              <Dropdown.Item onClick={() => this.state.mazify("vertical")}>Vertical Split</Dropdown.Item>
              <Dropdown.Item onClick={() => this.state.mazify("horizontal")}>Horizontal Split</Dropdown.Item>
              <Dropdown.Item onClick={() => this.state.mazify("random")}>Random Maze</Dropdown.Item>
            </Dropdown.Menu>
          
          </Dropdown>
          
         
            <Button className="btn btn-success" id="simulate" onClick={() => this.props.runSelected() }>See it!</Button>
        
            <Button className="btn btn-danger" onClick={() => this.state.resetState(this.state.algo, true) }>RESET</Button>
          
         </Nav>
        
      </Navbar>
      )
        
    }
}