import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Topic.css'

class Topic extends Component {

	constructor(props) {
    super(props);
    this.props.selectTopic(this.props.match.params.topic)
    this.props.fetchTopicIfNeeded(this.props.match.params.topic)
  }

  titleCase(str) {
  	return str.split(' ')
   .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
   .join(' ')
  }


	ListURL = (props) => {
  // Correct! There is no need to specify the key here:
  	return <li><a href={props.url}>{props.text}</a></li>;
	}

	ListLink = (props) => {
  // Correct! There is no need to specify the key here:
  	return (
  		<li>
  			<Link to={`/topic/${props.id}`} onClick={(props)=> {
  				this.props.selectTopic(props.id)
    			this.props.fetchTopicIfNeeded(props.id)
  			}}>{props.text}</Link>
  		</li>
  	);
	}

	CompanyItem = (props) => {
		return (
  		<li>
  			<img src={props.image}/>
  		</li>
  	);
	}

	ResourceList = (props) => {
	  const resources = props.data.resources.resources;
	  var i = 0;
	  return (
	    <ul>
	      {resources.map((resource) =>
	        <this.ListURL key={i++}
	                  text={resource.text}
	                  url={resource.url}/>

	      )}
	    </ul>
	  );
	}

	RelatedList = (props) => {
		const related = props.data.resources.related;
		var i = 0;
	  return (
	    <ul>
	      {related.map((topic) =>
	        <this.ListLink key={i++}
	                  text={topic.text}
	                  id={topic.id}/>

	      )}
	    </ul>
	  );
	}

	CompanyList = (props) => {
		const companies = props.data.companies;
		var i = 0;
	  return (
	    <ul>
	      {companies.map((company) =>
	        <this.CompanyItem key={i++}
	                  image={company.image}
	                  name={company.name}/>

	      )}
	    </ul>
	  );
	}

  render() {
  	if (this.props.dataByTopic[this.props.topic] && !this.props.dataByTopic[this.props.topic].isFetching) {
  		document.title = `Delve into ${this.titleCase(this.props.dataByTopic[this.props.topic].data.name)}`;
  		return (
	    	<div id="topic">
	    		<h1>{this.titleCase(this.props.dataByTopic[this.props.topic].data.name)}</h1>
	    		<p>
	    			{this.props.dataByTopic[this.props.topic].data.wiki}
	    		</p>
	    		<h3>Resources</h3>
	    		<this.ResourceList data={this.props.dataByTopic[this.props.topic].data}/>
	    		<h3>Related</h3>
	    		<this.RelatedList data={this.props.dataByTopic[this.props.topic].data}/>
	    		<h3>Companies</h3>
	    		<this.CompanyList data={this.props.dataByTopic[this.props.topic].data}/>

	    	</div>
    	)
  	}
    return (
    	<div id="topic">
    		<h1>Loading...</h1>
    	</div>
    )
  }
}

export default Topic;