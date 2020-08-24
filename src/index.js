import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

ReactDOM.render(<App />,
  document.getElementById('main'));

  // function ShoppingList (props) {
  //   return (
  //     <div className="shopping-list">
  //       <h1>Список покупок для {props.name}</h1>
  //       <ul>
  //         <li>Instagram</li>
  //         <li>WhatsApp</li>
  //         <li>Oculus</li>
  //       </ul>
  //     </div>
  //   );
  // }


  // const ShoppingList = (props) => {
    
  //   return (
  //     <div className="shopping-list">
  //       <h1>Список покупок для {props.name}</h1>
  //       <ul>
  //         <li>Instagram</li>
  //         <li>WhatsApp</li>
  //         <li>Oculus</li>
  //       </ul>
  //     </div>
  //   );
  // }

  // class ShoppingList extends React.Component {
  //   render() {
  //     return (
  //       <div className="shopping-list">
  //         <h1>Список покупок для {this.props.name}</h1>
  //         <ul>
  //           <li>Instagram</li>
  //           <li>WhatsApp</li>
  //           <li>Oculus</li>
  //         </ul>
  //       </div>
  //     );
  //   }
  // }
  
  // ========================================

  // ReactDOM.render(
  //   <ShoppingList />,
  //   document.getElementById('main')
  // );