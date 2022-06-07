import React from 'react';

function Popup (props) {
    if (props.save) {
        return (
            <div className='popup-window'>
                <div>Ваша таблица успешно сохранена</div>
            </div>
        )
    } else {
        return (
            <div className='popup-window'>
                <div>Ошибка. Таблица не сохранена</div>
            </div>
        )
    }

    
}

export default Popup;