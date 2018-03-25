import { connect } from 'react-redux';
import { selectTopic, fetchTopicIfNeeded, reset } from '../actions';
import Search from '../components/Search';

const mapStateToProps = (state) => ({
  topic: state.topic,
  dataByTopic: state.dataByTopic,
});

const mapDispatchToProps = {
  selectTopic: selectTopic,
  onStateClick: selectState,
  fetchStateIfNeeded: fetchStateIfNeeded,
  fetchCongressmanIfNeeded: fetchCongressmanIfNeeded,
  reset: reset,
  // onMapModification: modifyMap,
}

const MapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);

export default MapContainer;