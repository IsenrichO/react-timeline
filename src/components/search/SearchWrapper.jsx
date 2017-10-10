import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import SearchSidebar from './SearchSidebar';
import { fetchSeedData } from '../../actions/asyncActions';
import { fetchAllCloudinary, fetchCloudinaryImageData } from '../../state/cloudinaryImageStore';
import { updateSingleEvent } from '../../state/sourceEventData';
import Utils from '../../util';


@connect(
  ({ cloudinaryState, searchEvents, seedDataAggregator }) => ({
    cloudinaryImageStore: cloudinaryState,
    searchEvents,
    seedDataAggregator,
  }),
  (dispatch) => bindActionCreators({
    fetchAllCloudinary,
    fetchCloudinaryImageData,
    fetchSeedData,
    // push,
    updateSingleEvent,
  }, dispatch),
)
export default class SearchWrapper extends Component {
  static displayName = 'SearchRouteWrapper';

  static propTypes = {
    children: PropTypes.node,
    cloudinaryImageStore: PropTypes.arrayOf(PropTypes.object),
    fetchAllCloudinary: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    push: PropTypes.func,
    searchEvents: PropTypes.func.isRequired,
    seedDataAggregator: PropTypes.arrayOf(PropTypes.object),
    updateSingleEvent: PropTypes.func.isRequired,
  };

  static defaultProps = {
    children: null,
    cloudinaryImageStore: [],
    push,
    seedDataAggregator: [],
  };

  constructor(props) {
    super(props);

    this.updateSingleEvent = ::props.updateSingleEvent;
  }

  componentDidMount() {
    const { fetchAllCloudinary, fetchSeedData } = this.props;
    console.log({ fetchAllCloudinary, fetchSeedData });

    fetchSeedData();
    fetchAllCloudinary();

    return new Promise((resolve, reject) => resolve(fetchSeedData()))
      .then((data) => fetchAllCloudinary());
  }

  // componentDidMount() {
  //   this.props.fetchAllCloudinary();
  // }

  delegateAsyncCallback(path) {
    const pathRoute = path.replace(/^\/search\//, '');
    return this.props.searchEvents;
  }

  render() {
    const {
      children,
      cloudinaryImageStore,
      location: { pathname },
      push: reduxPush,
      seedDataAggregator,
    } = this.props;

    return (
      <div>
        <SearchSidebar reroute={(path) => reduxPush(`${path}`)} />
        <main id="search-main">
          {'HI'}
        </main>
      </div>
    );
  }
}
          // {cloneElement(children, {
          //   addEventToFavorites: (evt) => Utils.addEventToFavorites(updateSingleEvent, evt),
          //   eventsStore: seedDataAggregator,
          //   imageStore: cloudinaryImageStore,
          //   key: pathname,
          //   searchEvents: this.delegateAsyncCallback(pathname),
          //   updateSingleEvent: this.updateSingleEvent,
          // })}
