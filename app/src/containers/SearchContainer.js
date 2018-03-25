import { connect } from 'react-redux';
import { selectTopic, fetchTopicIfNeeded, reset } from '../actions';
import Search from '../components/Search';

const mapStateToProps = (state) => ({
  topic: state.topic,
  dataByTopic: state.dataByTopic,
});

const mapDispatchToProps = {
  selectTopic: selectTopic,
  fetchTopicIfNeeded: fetchTopicIfNeeded,
  reset: reset,
}

const SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);

export default SearchContainer;