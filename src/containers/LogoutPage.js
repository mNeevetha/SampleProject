import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import {logout} from '../store/logOut/actions'
import {Logout} from './components/Logout'

class LogoutPage extends Component {

  componentWillMount() {
    debugger;
    this.props.dispatch(logout(history));
    history.push('/login');
  }

  render() {
    return <Logout />
  }
}
LogoutPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect()(LogoutPage)
