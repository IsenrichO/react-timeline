import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ClassNamesPropType } from 'aesthetic';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Route, Redirect, withRouter } from 'react-router-dom';
// import { push } from 'react-router-redux';

import Timeline from '../../containers/Timeline';
import EditEventModal from '../EditEventModal';
import { fetchSeedData, fetchAllCloudinary } from '../../actions/asyncActions';
import styler from '../../style/styler';

import '../../../assets/styles/master.scss';

@connect(
  ({ cloudinaryImageStore, seedDataAggregator }) => ({
    cloudinaryImageStore,
    seedData: seedDataAggregator,
  }),
  (dispatch) => bindActionCreators({ fetchAllCloudinary, fetchSeedData }, dispatch),
)
@styler(({ fonts }) => ({
  hamburger: {
    cursor: 'pointer',
    font: {
      family: fonts.face.default,
      lineHeight: 1,
      size: '4rem',
      stretch: 'normal',
      style: 'normal',
      variant: 'normal',
      weight: 'lighter',
    },
    margin: ['1.5rem', '2rem'],
    position: 'fixed',
    top: 0,
  },
  tlContainer: {
    minHeight: '75vh',
  },
}))
export default class App extends Component {
  static displayName = 'App';

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node,
    ]),
    classNames: ClassNamesPropType.isRequired,
    cloudinaryImageStore: PropTypes.arrayOf(PropTypes.object),
    location: PropTypes.object.isRequired,
    seedData: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    children: null,
    cloudinaryImageStore: null,
    seedData: null,
  };

  componentWillMount() { // Alternatively, use `componentDidMount()`
    const { fetchAllCloudinary, fetchSeedData } = this.props;

    fetchSeedData();
    fetchAllCloudinary();

    return new Promise((resolve, reject) => resolve(fetchSeedData()))
      .then((data) => fetchAllCloudinary());
  }

  componentWillReceiveProps(nextProps) {  // Alternatively, use `componentDidUpdate()`
    // console.log('Component Will Receive Props');
  }

  clickHandler() {
    return (
      <Redirect
        to={{
          pathname: '/search',
          state: { from: this.props.location },
        }}
      />
    );
  }

  render() {
    const { children, classNames, cloudinaryImageStore, seedData } = this.props;

    return (
      <div className={classNames.tlContainer}>
        <Link to="/search">
          <i
            className={classNames.hamburger}
            // onClick={() => this.props.push('/search')}
            // onClick={this.clickHandler}
          >
            &#9776;
          </i>
        </Link>
        <Timeline
          seedData={seedData}
          cIS={cloudinaryImageStore}
        />
        {children}
      </div>
    );
  }
}
