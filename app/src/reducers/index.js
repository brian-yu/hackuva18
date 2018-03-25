import { combineReducers } from 'redux';

import {
  SELECT_TOPIC,
  RESET,
  INVALIDATE_TOPIC,
  REQUEST_TOPIC,
  RECEIVE_TOPIC,
} from '../actions'

function topic(state = null, action) {
  switch (action.type) {
    case SELECT_TOPIC:
      return action.topicId
    case RESET:
      return null
    default:
      return state
  }
}


function topicData(
  state = {
    isFetching: false,
    didInvalidate: false,
    data: {}
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_TOPIC:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_TOPIC:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_TOPIC:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        data: action.data,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function dataByTopic(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_TOPIC:
    case RECEIVE_TOPIC:
    case REQUEST_TOPIC:
      return Object.assign({}, state, {
        [action.topicId]: topicData(state[action.topicId], action)
      })
    default:
      return state
  }
}


const rootReducer = combineReducers({
  topic,
  dataByTopic,
})
 
export default rootReducer