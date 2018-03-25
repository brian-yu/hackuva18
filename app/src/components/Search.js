import React, { Component } from 'react';
import './Search.css';
import fetch from 'cross-fetch';
import Select from 'react-select';
import {Redirect} from 'react-router';

class Search extends Component {

	constructor(props) {
    super(props);
    this.state = {
      query: "",
      searched: false,
    };
    console.log("state:", this.state)
    this.handleInputChange = this.handleInputChange.bind(this);
  }

	handleInputChange(item) {
    this.props.selectTopic(item.id)
    this.props.fetchTopicIfNeeded(item.id)
    this.setState({
    	searched:true
    })
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
  	console.log("props:", this.props)
  	if (this.state.searched) {
  		console.log("switch")
  		return (<Redirect to={`/topic/${this.props.topic}`}/>)
  	}
    return (
    	<div>
    		<div id="splash">
    		<div>Teach me about</div>
    		<form onSubmit={this.handleSubmit} style={{ display: 'inline-block'}}>
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
        </div>
			</div>
    )
  }
}

export default Search;