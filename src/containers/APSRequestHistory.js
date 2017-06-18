import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { apsRequestHistory } from '../store/apsRequestHistory/actions';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';


class APSRequestHistory extends Component{
    componentWillMount() {
      const { currentUser } = this.props;
      console.log("CDm")
      console.log(currentUser.id)
        this.props.dispatch(apsRequestHistory(currentUser));
    }


displayAPSRequestHistory() {
    const {list} = this.props;
    
    return list.map((history, index) => {
      console.log(history)
      return (
      <TableRow key={index}>
          <TableColumn>{history.ipAddress}</TableColumn>
          <TableColumn>{history.updatedDate}</TableColumn>
          <TableColumn>{history.dataRetrieved}</TableColumn>
        </TableRow>
       );
    });
  }

  render() {
    return (
      <DataTable plain>
        <TableHeader>
          <TableRow>
            <TableColumn>IP Address</TableColumn>
            <TableColumn>Created Date</TableColumn>
             <TableColumn>Data Retrieved
             </TableColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
           {this.displayAPSRequestHistory()}
        </TableBody>
      </DataTable>

    );
  }
}

APSRequestHistory.propTypes = {
  currentUser:PropTypes.object,
  dispatch: PropTypes.func,
  list: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    currentUser: state.user.currentUser,
    list: state.apsRequestHistory.list,
  };
}
export default connect(mapStateToProps)(APSRequestHistory);