import React from 'react'
import StatusList from './StatusList'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { fetchStatuses, deleteStatus } from '../../actions/statusActions'
import { follow } from '../../actions/followerActions'
class ProfilePage extends React.Component {

  constructor(props){
    super(props)

    this.handleDeleteStatus = this.handleDeleteStatus.bind(this)
  }

  componentDidMount() {
    this.props.fetchStatuses(this.props.params.username)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.params.username !== nextProps.params.username) {
      this.props.fetchStatuses(nextProps.params.username)
    }
  }

  handleDeleteStatus(id) {
    deleteStatus(id)
    this.props.fetchStatuses(this.props.params.username)
  }

  handleFollow(username) {
    follow(username)
      .then((data) => {
        if(data.data.ok) this.context.router.push('/')
      })
      .catch(console.log)
  }

  render() {
    return (
      <div>
        <h1>{this.props.params.username}</h1>
        <button onClick={() => {this.handleFollow(this.props.params.username)}}  className="btn btn-primary btn-block">Follow</button>
        <Link to="/add"><button className="btn btn-primary btn-block">Add New Status</button></Link>
        <h2 className="header">Statuses</h2>
        <StatusList statuses={this.props.statuses} del={this.handleDeleteStatus}/>
      </div>
    )
  }
}

ProfilePage.propTypes = {
  statuses: React.PropTypes.array.isRequired,
  fetchStatuses: React.PropTypes.func.isRequired,
}

ProfilePage.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    statuses: state.statuses
  }
}

export default connect(mapStateToProps, { fetchStatuses })(ProfilePage)