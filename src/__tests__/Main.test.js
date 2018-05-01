import React from 'react';
import TestUtils from 'react-dom/test-utils';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Main from '../components/Main';

it('should be rendered', () => {
  let main = TestUtils.renderIntoDocument(
    <MuiThemeProvider>
      <Main/>
    </MuiThemeProvider>
  );
});

