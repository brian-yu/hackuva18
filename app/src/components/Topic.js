import React, { Component } from 'react'

class Topic extends Component {
  render() {
    return (
    	<div>
    		{this.props.match.params.topic}
    	</div>
    )
  }
}

export default Topic;