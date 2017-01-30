'use strict';
import React, { Component } from 'react';


const NoteItem = ({ params: { noteID } }) => (
  <h1>Note ID: { noteID }</h1>
);

export default NoteItem;
