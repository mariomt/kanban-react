import React from 'react';

import './Layout.css';

// Components
import Navbar from '../Navbar/Navbar'

function Layout(props) {
  return (
    <div className="Layout">
      <Navbar />
      <section className="Layout__content">
        {props.children}
      </section>
    </div>
  );
}

export default Layout;