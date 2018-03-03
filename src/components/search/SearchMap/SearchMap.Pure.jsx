// @flow
import React, { Component }                      from 'react';
import { connect }                               from 'react-redux';
import { ClassNamesPropType }                    from 'aesthetic';
import update                                    from 'immutability-helper';
import transform                                 from 'lodash/transform';
import { eq, size, takeWhile }                   from 'lodash';
import Button                                    from 'material-ui/Button';
import Stepper, { Step, StepContent, StepLabel } from 'material-ui/Stepper';
import GMap                                      from '~/components/partials/GMap';
import { SourceEventDataStatePropTypes }         from '~/state/sourceEventData';
import { keyFormatter }                          from '~/util/ComponentHelpers';

/* FLOW TYPES */
type Props = {
  theme?: string,
};

type State = {
  isFinished: boolean,
  stepIndex: number,
};

/* TRUE CONSTANTS */
const [NEXT, PREV] = ['NEXT', 'PREVIOUS'];

@connect(
  ({ seedDataAggregator }) => ({ seedDataAggregator }),
  null,
)
export default class SearchMapPure extends Component<Props, State> {
  static displayName = 'SearchMapPure';

  static propTypes = {
    classNames: ClassNamesPropType.isRequired,
    seedDataAggregator: SourceEventDataStatePropTypes.isRequired,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    const { seedDataAggregator } = props;

    this.handleNext = ::this.handleStepNavigation(NEXT);
    this.handlePrevious = ::this.handleStepNavigation(PREV);

    this.allLocations = Object
      .values(seedDataAggregator)
      .reduce((acc, { location }) => acc.concat(location), []);

    this.transformedData = transform(
      seedDataAggregator,
      (acc, { date, description, location, uuid }, key) => {
        acc.push({ date, description, location, uuid });
      }, []);
  }

  state = {
    isFinished: false,
    stepIndex: 0,
  };

  handleStepNavigation = (direction = NEXT) => (evt) => {
    const { stepIndex } = this.state;

    if (![NEXT, PREV].includes(direction)) throw new Error(`Unrecognized direction ${direction} provided.`);

    return this.setState(update(this.state, {
      isFinished: { $set: stepIndex >= 2 },
      stepIndex: { $apply: (indexVal) => indexVal + (direction === NEXT ? 1 : -1) },
    }));
  };

  renderStepActions(stepCount) {
    const { classNames } = this.props;
    const { stepIndex } = this.state;

    return (
      <div
        key={keyFormatter(stepCount, 'StepCountNumber')}
        className={classNames.stepActionsContainer}
      >
        <Button
          // primary
          raised
          label={stepIndex === (size(this.allLocations) - 1) ? 'Finish' : 'Next'}
          onClick={this.handleNext}
          style={{ marginRight: 12 }}
        />
        <Button
          label="Back"
          disabled={eq(stepIndex, 0)}
          onClick={this.handlePrevious}
        />
      </div>
    );
  }

  renderStepContent() {
    const { stepIndex } = this.state;
    const { seedDataAggregator } = this.props;

    return this.transformedData
      .sort(({ date: date1 }, { date: date2 }) => date2 - date1)
      .map(({ date, description, location, uuid }, index) => (
        <Step key={keyFormatter(uuid, 'StepItem')}>
          <StepLabel>{location}</StepLabel>
          <StepContent>
            {[
              description.map((para, paraIndex) => (
                <p key={keyFormatter(paraIndex + 1, `StepItem__${uuid}-ParagraphNumber`)}>
                  {para}
                </p>
              )),
              this.renderStepActions(index),
            ]}
          </StepContent>
        </Step>
      ));
  }

  render() {
    const { classNames } = this.props;
    const { isFinished, stepIndex } = this.state;

    return (
      <div className={classNames.atlasViewContainer}>
        <GMap
          withFullSizeView
          location={this.transformedData[stepIndex].location}
          markers={this.allLocations}
        />
        <div className={classNames.stepperContainer}>
          <Stepper
            activeStep={stepIndex}
            orientation="vertical"
          >
            {this.renderStepContent()}
          </Stepper>
        </div>
      </div>
    );
  }
}

// {isFinished && (
//   <p style={{margin: '20px 0', textAlign: 'center'}}>
//     <a
//       href="#"
//       onClick={(evt) => {
//         evt.preventDefault();

//         return this.setState({
//           isFinished: false,
//           stepIndex: 0,
//         });
//       }}
//     >
//       Click here
//     </a> to reset the example.
//   </p>
// )}
