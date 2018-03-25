import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import brands from '@fortawesome/fontawesome-free-brands'
import solids from '@fortawesome/fontawesome-free-solid'
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
		const typeMap = {
  		github: ["fab", "github"],
  		reddit: ["fab", "reddit"],
  		wiki: ["fab", "wikipedia-w"],
  		video: ["fas", "video"],
  		"free book": "book"
  	}

  	const faname = typeMap[props.type] ? typeMap[props.type] : "external-link-alt";
  	console.log(faname);
  	const Icon = () => {
  		return <FontAwesomeIcon icon={faname}/>;
  	}

  	return (
  		<li>
  			<Icon/>
  			<a href={props.url}>{props.text}</a>
  		</li>
  	);
	}

	ListLink = (props) => { 
  	return (
  		<li>
  			<FontAwesomeIcon icon="link"/>
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
  			<img src={props.image} alt={props.name}/>
  			<h5>{props.name}</h5>
  		</li>
  	);
	}

	ResourceList = (props) => {
	  const resources = props.data.resources.resources;
	  var i = 0;
	  return (
	  	<div id="resources">
		  	<h3>Resources</h3>
		    <ul>
		      {resources.map((resource) =>
		        <this.ListURL key={i++}
		                  text={resource.text}
		                  url={resource.url}
		                  type={resource.category}/>

		      )}
		    </ul>
	    </div>
	  );
	}

	RelatedList = (props) => {
		const related = props.data.resources.related;
		var i = 0;
	  return related.length === 0 ? null : (
	  	<div id="related">
	  		<h3>Related</h3>
		    <ul>
		      {related.map((topic) =>
		        <this.ListLink key={i++}
		                  text={topic.text}
		                  id={topic.id}/>

		      )}
		    </ul>
	    </div>
	  );
	}

	CompanyList = (props) => {
		const companies = props.data.companies;
		var i = 0;
	  return companies === "" ? null : (
	  	<div id="companies">
	  		<h3>Companies</h3>
		    <ul>
		      {companies.map((company) =>
		        <this.CompanyItem key={i++}
		                  image={company.image}
		                  name={company.name}/>

		      )}
		    </ul>
	    </div>
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
	    		<this.ResourceList data={this.props.dataByTopic[this.props.topic].data}/>
	    		<this.RelatedList data={this.props.dataByTopic[this.props.topic].data}/>
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