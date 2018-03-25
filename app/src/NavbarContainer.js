import { connect } from 'react-redux';
import { reset } from '../actions';
import Navbar from '../components/Navbar';
import { withRouter } from 'react-router-dom'


const mapDispatchToProps = {
  reset: reset
}

const NavbarContainer = withRouter(connect(
  mapDispatchToProps
)(Navbar));

export default NavbarContainer;

// export default withRouter(connect(mapStateToProps)(Something))