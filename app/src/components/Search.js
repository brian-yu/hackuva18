import React, { Component } from 'react';
import {Jumbotron} from 'reactstrap';
import './Search.css';
import fetch from 'cross-fetch';
import Select from 'react-select';
import {Redirect} from 'react-router';

class Search extends Component {

	constructor(props) {
    super(props);
    this.state = {
      query: "",
      topic: ""
    };
    console.log(this.state)
    this.handleInputChange = this.handleInputChange.bind(this);
  }

	handleInputChange(item) {
    console.log(item)
    this.props.selectTopic(item.id)
    this.props.fetchTopicIfNeeded(item.id)
  }

  getTopics(input) {
		if (!input) {
			return Promise.resolve({ options: [] });
		}

		return fetch(`/api/topic/name/${input}`)
			.then(response => response.json())
			.then(json => {
				return { options: json.slice(0, 5)}
			});
	}

  render() {
    return (
    	<div>
    		<div id="splash">
    		<div>Teach me about</div>
    		<form onSubmit={this.handleSubmit} style={{display: "inline-block"}} style={{ display: 'inline-block'}}>
{/*    			<input
          	id="search"
          	name="query"
          	value={this.state.query}
            onChange={this.handleInputChange}
            size={this.state.query.length > 5 ? this.state.query.length : 5}
          />*/}
          <Select.Async
          	value={this.state.query}
          	onChange={this.handleInputChange}
          	valueKey="id"
          	labelKey="key"
          	loadOptions={this.getTopics}
          	searchPromptText=""
          	autosize={this.state.query.length >= 5 ? true : false}
					/>
          {/*<span>.</span>*/}
	          
{/*	          <InputGroupAddon addonType="prepend"><Button type="submit"><FontAwesomeIcon icon='bolt'/></Button></InputGroupAddon>*/}

        </form>
        {this.state.topic && (
			    <Redirect to={`/${this.state.topic}`}/>
			  )}
        </div>
			</div>
    )
  }
}

export default Search;