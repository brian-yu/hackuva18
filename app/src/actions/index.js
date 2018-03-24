import fetch from 'cross-fetch';

/*
 * action types
 */
 
export const SEARCH_TOPIC = 'SELECT_TOPIC'
 
/*
 * action creators
 */
 
export function selectTopic(id) {
  return {
    type: SELECT_TOPIC,
    id
  }
}

/*
* Async request/receieve/invalidate for state info
*/

export const REQUEST_TOPIC = 'REQUEST_TOPIC';
export const RECEIVE_TOPIC = 'RECEIVE_TOPIC';
export const INVALIDATE_TOPIC = 'INVALIDATE_TOPIC';

export function invalidateTopic(id) {
  return {
    type: INVALIDATE_TOPIC,
    id
  }
}


export function requestTopic(id) {
	return {
    	type: REQUEST_TOPIC,
    	id
  	}
}

export function receiveTopic(id, json) {
	console.log(json);
  return {
    type: RECEIVE_TOPIC,
    id,
    data: json,
    receivedAt: Date.now()
  }
}

export function fetchTopic(id) {
 	// Thunk middleware knows how to handle functions.
 	// It passes the dispatch method as an argument to the function,
  	// thus making it able to dispatch actions itself.
 
	return function (dispatch) {
		// First dispatch: the app state is updated to inform
		// that the API call is starting.
	 
		dispatch(requestTopic(id))
	 
		// The function called by the thunk middleware can return a value,
		// that is passed on as the return value of the dispatch method.
		 
		// In this case, we return a promise to wait for.
		// This is not required by thunk middleware, but it is convenient for us.

		return fetch(`/api/topic/${id}`)
			.then(response => response.json())
			.then(json => dispatch(receiveTopic(id, json)))
	}
}

function shouldFetchTopic(state, id) {
	const data = state.dataByTopic[id]
	if (!data) {
		return true
	} else if (data.isFetching) {
		return false
	} else {
		return data.didInvalidate
	}
}

export function fetchTopicIfNeeded(stateAbbrev) { 
  return (dispatch, getTopic) => {
    if (shouldFetchTopic(getTopic(), stateAbbrev)) {
      // Dispatch a thunk from thunk!
      return dispatch(fetchTopic(stateAbbrev))
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve()
    }
  }
}

/*
* Async request/receieve/invalidate for congressman info
*/

export const REQUEST_CONGRESSMAN = 'REQUEST_CONGRESSMAN';
export const RECEIVE_CONGRESSMAN = 'RECEIVE_CONGRESSMAN';
export const INVALIDATE_CONGRESSMAN = 'INVALIDATE_CONGRESSMAN';

export function invalidateCongressman(bid) {
  return {
    type: INVALIDATE_CONGRESSMAN,
    bid
  }
}


export function requestCongressman(bid) {
  return {
      type: REQUEST_CONGRESSMAN,
      bid
    }
}

export function receiveCongressman(bid, json) {
  console.log(json);
  return {
    type: RECEIVE_CONGRESSMAN,
    bid,
    data: json,
    receivedAt: Date.now()
  }
}

export function fetchCongressman(bid) {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.
 
  return function (dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.
   
    dispatch(requestCongressman(bid))
   
    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.
     
    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return fetch(`/api/congressman/${bid}`)
      .then(response => response.json())
      .then(json => dispatch(receiveCongressman(bid, json)))
  }
}

function shouldFetchCongressman(state, bid) {
  const data = state.dataByCongressman[bid]
  if (!data) {
    return true
  } else if (data.isFetching) {
    return false
  } else {
    return data.didInvalidate
  }
}

export function fetchCongressmanIfNeeded(bid) { 
  return (dispatch, getTopic) => {
    if (shouldFetchCongressman(getTopic(), bid)) {
      // Dispatch a thunk from thunk!
      return dispatch(fetchCongressman(bid))
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve()
    }
  }
}