import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Topic extends Component {
	render() {
		return (
			<div class="navbar">
        <Link to="/"><span class="brand">Delve</span></Link>
    	</div>
    )
	}
}

export default Topic;