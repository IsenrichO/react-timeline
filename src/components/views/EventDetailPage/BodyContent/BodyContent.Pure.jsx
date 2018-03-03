// @flow
import React, { Component }                       from 'react';
import PropTypes                                  from 'prop-types';
import { classes, ClassNamesPropType }            from 'aesthetic';
import isEmpty                                    from 'lodash/isEmpty';
import LayoutTemplate                             from '../LayoutTemplate';
import LayoutTemplatePreview                      from '~/components/Atomic/LayoutTemplatePreview';
import { keyFormatter }                           from '~/util/ComponentHelpers';
import { eventLayoutPropTypes, tlEventPropTypes } from '~/util/TypeChecking';

/* FLOW TYPES */
type Props = {
  layout: string,
  theme?: string,
};

export default class BodyContentPure extends Component<Props> {
  static displayName = 'EDP_BodyContent';

  static propTypes = {
    classNames: ClassNamesPropType.isRequired,
    event: tlEventPropTypes.isRequired,
    layout: eventLayoutPropTypes,
    theme: PropTypes.string,
    updateEvent: PropTypes.func.isRequired,
  };

  static defaultProps = {
    layout: null,
    theme: 'base',
  };

  constructor(props) {
    super(props);

    this.squareBlockConfig = {
      fractions: 2,
      isSquare: true,
      weights: [1, 1],
    };
    this.fullWidthBlockConfig = {
      fractions: 1,
      weights: [1],
    };
    this.tripartiteBlockConfig = {
      fractions: 3,
      weights: [1, 2, 1],
    };

    this.layoutTemplateConfigs = [{
      caption: 'Defer to the default event page layout.',
      config: Array.from({ length: 2 }, (_, index) => this.squareBlockConfig),
      label: 'Grid',
    }, {
      caption: 'Something in-between, this mixes the Grid and Modern views.',
      config: [this.fullWidthBlockConfig, this.squareBlockConfig, this.fullWidthBlockConfig],
      label: 'Hybrid',
    }, {
      caption: 'A fresh layout built with text-laden pages in mind.',
      config: [this.tripartiteBlockConfig, this.fullWidthBlockConfig, this.squareBlockConfig],
      label: 'Modern',
    }];

    this.handleTemplateSelection = ::this.handleTemplateSelection;
  }

  /**
   * Function-returning class method. By necessity, it is constructed as a closure so that the
   * function returned by its invocation has access to the layout template type that is ultimately
   * fed to the `updateEvent` action creator.
   * @param {String} templateType   One of `grid`, `hybrid` or `modern`
   * @returns {function(*): *}      The function whose subsequent call updates the event layout
   */
  handleTemplateSelection(templateType = 'grid') {
    const {
      event: { uuid },
      updateEvent,
    } = this.props;

    return (evt) => updateEvent({
      layout: templateType.toLowerCase(),
      uuid,
    });
  }

  /**
   * Class method that iterates over the `layoutTemplateConfigs` defined in the `constructor` of
   * the class, for each, renders its particular `LayoutTemplatePreview`. This method only gets
   * called upon EDPs for which there is no extant `layout` defined.
   * @returns {Element} Array of templated layout preview React elements
   */
  renderLayoutPreviews = () => this.layoutTemplateConfigs
    .map(({ config, label, ...rest }, index) => (
      <LayoutTemplatePreview
        key={keyFormatter(label, `layoutTemplateConfig${index}__`)}
        handleTemplateSelection={this.handleTemplateSelection(label)}
        label={label}
        templateConfig={config}
        {...rest}
      />
    ));

  render() {
    const { classNames, layout } = this.props;

    const hasLayout = !isEmpty(layout);
    const selectedLayoutConfig = hasLayout && this.layoutTemplateConfigs
      .find(({ label }) => label.toLowerCase() === layout);

    return (
      <main
        className={classes(
          classNames.bodyContainer,
          hasLayout
            ? classNames.bodyContainerWithContent
            : classNames.layoutTemplatePreviewsContainer,
        )}
      >
        {hasLayout
          ? (
            <LayoutTemplate
              template={selectedLayoutConfig}
            />
          )
          : this.renderLayoutPreviews()
        }
      </main>
    );
  }
}
