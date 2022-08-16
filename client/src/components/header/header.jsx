import React, { Fragment } from 'react';
import logo from '../../assets/img/logo.svg';

const Header = () => {
  return (
    <Fragment>
      <div className="header">
        <div className="header__logo">
          <img src={logo} alt={logo} />
        </div>
      </div>
    </Fragment>
  )
}

export default Header;
