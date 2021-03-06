import { connect } from 'react-redux';
import { selectTopic, fetchTopicIfNeeded, reset } from '../actions';
import Search from '../components/Search';
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state) => ({
  topic: state.topic,
  dataByTopic: state.dataByTopic,
});

const mapDispatchToProps = {
  selectTopic: selectTopic,
  fetchTopicIfNeeded: fetchTopicIfNeeded,
  reset: reset,
}

const SearchContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Search));

export default SearchContainer;

// export default withRouter(connect(mapStateToProps)(Something))