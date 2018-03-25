import React, { Component } from 'react';
import {Jumbotron, Label, Col, Row, Input, InputGroup, InputGroupAddon, Button} from 'reactstrap';
import './Search.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

class Search extends Component {

	constructor(props) {
    super(props);
    this.state = {
      query: "",
      hasEntered: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

	handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
      hasEntered: false,
    });
  }

  handleSubmit(event) {
  	if (this.state.query !== "") {
  		alert('A query was submitted: ' + this.state.query);
  	}
    event.preventDefault();
  }


  render() {
    return (
    	<div>
    		<Jumbotron id="splash">
    		Teach me about
    		<form onSubmit={this.handleSubmit}>
    			<input
          	id="search"
          	name="query"
          	value={this.state.query}
            onChange={this.handleInputChange}
            size={this.state.query.length > 5 ? this.state.query.length : 5}
          />
          <span>.</span>
	          
{/*	          <InputGroupAddon addonType="prepend"><Button type="submit"><FontAwesomeIcon icon='bolt'/></Button></InputGroupAddon>*/}

        </form>
        </Jumbotron>
			</div>
    )
  }
}

export default Search;