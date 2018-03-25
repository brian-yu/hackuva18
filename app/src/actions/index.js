import fetch from 'cross-fetch';

/*
 * action types
 */
 
export const SELECT_TOPIC = 'SELECT_TOPIC'
export const RESET = 'RESET'
 
/*
 * action creators
 */
 
export function selectTopic(topicId) {
  return {
    type: SELECT_TOPIC,
    topicId
  }
}

export function reset() {
  return {
    type: RESET,
  }
}

/*
* Async request/receieve/invalidate for state info
*/

export const REQUEST_TOPIC = 'REQUEST_TOPIC';
export const RECEIVE_TOPIC = 'RECEIVE_TOPIC';
export const INVALIDATE_TOPIC = 'INVALIDATE_TOPIC';

export function invalidateTopic(topicId) {
  return {
    type: INVALIDATE_TOPIC,
    topicId
  }
}


export function requestTopic(topicId) {
	return {
    	type: REQUEST_TOPIC,
    	topicId
  	}
}

export function receiveTopic(topicId, json) {
	console.log(json);
  return {
    type: RECEIVE_TOPIC,
    topicId,
    data: json,
    receivedAt: Date.now()
  }
}

export function fetchTopic(topicId) {
 	// Thunk middleware knows how to handle functions.
 	// It passes the dispatch method as an argument to the function,
  	// thus making it able to dispatch actions itself.
 
	return function (dispatch) {
		// First dispatch: the app state is updated to inform
		// that the API call is starting.
	 
		dispatch(requestTopic(topicId))
	 
		// The function called by the thunk middleware can return a value,
		// that is passed on as the return value of the dispatch method.
		 
		// In this case, we return a promise to wait for.
		// This is not required by thunk middleware, but it is convenient for us.

		return fetch(`/api/topic/${topicId}`)
			.then(response => response.json())
			.then(json => dispatch(receiveTopic(topicId, json)))
	}
}

function shouldFetchTopic(state, topicId) {
	const data = state.dataByTopic[topicId]
	if (!data) {
		return true
	} else if (data.isFetching) {
		return false
	} else {
		return data.didInvalidate
	}
}

export function fetchTopicIfNeeded(topicId) { 
  return (dispatch, getTopic) => {
    if (shouldFetchTopic(getTopic(), topicId)) {
      // Dispatch a thunk from thunk!
      return dispatch(fetchTopic(topicId))
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve()
    }
  }
}