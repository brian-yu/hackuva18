import { connect } from 'react-redux';
import { selectTopic, fetchTopicIfNeeded, reset } from '../actions';
import Topic from '../components/Topic';
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

const TopicContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Topic));

export default TopicContainer;

// export default withRouter(connect(mapStateToProps)(Something))