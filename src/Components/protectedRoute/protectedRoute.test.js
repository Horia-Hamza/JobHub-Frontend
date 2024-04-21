import React from 'react';
import ReactDOM from 'react-dom';
import ProtectedRoute from './ProtectedRoute';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProtectedRoute />, div);
  ReactDOM.unmountComponentAtNode(div);
});