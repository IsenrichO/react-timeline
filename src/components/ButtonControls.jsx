'use strict';
import React from 'react';


const ButtonControls = ({ toggleModal }) => (
  <button
    className="btn-controls"
    type="button"
    name="mainControlBtn"
    onClick={ toggleModal }>
  </button>
);

export default ButtonControls;
