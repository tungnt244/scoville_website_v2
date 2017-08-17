import React, {Component} from 'react';
import Link from 'react-router-dom/Link';
import Route from 'react-router-dom/Route';
import { renderRoutes } from 'react-router-config';

class Layout extends Component {
  render() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <main className="mdl-layout__content">
          {renderRoutes(this.props.route.routes)}
        </main>
      </div>
    );
  }
}

export default Layout;
