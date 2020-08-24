import React from 'react';

import './account.scss';

const Account = (props) => {
  
    return (
      <div className="shopping-list">
        <h1>Список покупок для {props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }  
  
  export default Account;