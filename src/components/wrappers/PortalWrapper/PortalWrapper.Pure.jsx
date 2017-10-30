import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ClassNamesPropType } from 'aesthetic';

export default class PortalWrapperPure extends Component {
  static displayName = 'PortalWrapper';

  static propTypes = {
    children: PropTypes.node.isRequired,
    classNames: ClassNamesPropType.isRequired,
    theme: PropTypes.string,
  };

  static defaultProps = {
    theme: 'base',
  };

  constructor(props) {
    super(props);

    this.containingElement = document.createElement('DIV');
    this.modalRoot = null;
  }

  componentWillMount() {
    this.modalRoot = document.getElementById('modal-root');
  }

  // Append the element into the DOM on mount. We'll render into the modal container element:
  componentDidMount() {
    const { containingElement, modalRoot } = this;
    return modalRoot.appendChild(containingElement);
  }

  // Remove the element from the DOM when we unmount:
  componentWillUnmount() {
    const { containingElement, modalRoot } = this;
    return modalRoot.removeChild(containingElement);
  }

  render() {
    const { children, classNames } = this.props;

    return (
      <div className={classNames.portalWrapper}>
        {createPortal(
          children,
          this.containingElement,
        )}
      </div>
    );
  }
}
