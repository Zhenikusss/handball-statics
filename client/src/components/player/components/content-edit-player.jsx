import React, { useState } from "react";
import ContentEditable from 'react-contenteditable'

const ContentEditablePlayer = ({ id, info, players, setNewStatePlayer, setEditOn }) => {
  const contentEditable = React.createRef();
  // if (typeof info === 'number') {
  //   info = info.toString();
  // }
  const [state, setState] = useState(info);

  // console.log(info)

  const handleChange = (evt) => {
    const stringIDEdit = evt.currentTarget.closest('span').id;
    const value = evt.target.value;
    const newState = players.slice();

    newState.forEach((item) => {
      if (item.id === id) {
        item[stringIDEdit] = value;
      }
    });

    setEditOn(true);
    setState(value);
    setNewStatePlayer(newState);
  };

  return (
    <ContentEditable
      innerRef={contentEditable}
      html={state}
      disabled={false}
      onChange={handleChange}
    />
  );
}

export default ContentEditablePlayer;