import React, { useEffect, useState, Fragment } from 'react';
import logo from '../../assets/img/logo.svg';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, TextField, Tooltip, Snackbar, Slide, CircularProgress } from '@material-ui/core';
import $ from 'jquery-ajax';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

import { requestUrl } from '../../const/const';

const Season = () => {
  const [seasons, setSeasons] = useState([]);
  const [modal, setModal] = useState({
    open: false,
    Transition: Slide,
  });

  const [loading, setLoading] = useState({
    loading: true,
  })

  useEffect(() => {
    $.ajax ({      
      type:'GET',
      url: `${requestUrl}/seasons`,
      dataType:'json',
      success: function(data) {
        data.map((item) => {
          setSeasons(prevState => {
            return [
              ...prevState, 
              {
                id: item.id,
                value: item.value,
                name: item.name,
              }
            ];
          });
        });
        setLoading({loading: false});
        document.querySelector('.seasons__block').classList.add('show');
      }
    });
  }, []);

  const saveSeason = () => {
    $.ajax ({
      type:'POST',
      url: `${requestUrl}/seasons`,
      dataType:'json',
      data: { seasons },
      success: function() {
        setModal({
          ...modal,
          open: true,
        });
      },
      error: function(xhr, ajaxOptions, thrownError) {
      }
    });
  }

  const handleCloseModal = () => {
    setModal({
      ...modal,
      open: false,
    });
  };

  const addSeason = () => {
    const seasonValue = document.querySelector('.seasons__season input').value;
    const year = seasonValue.split('-')[0];

    if (seasons.length === 0) {
      setSeasons([
        ...seasons,
        {
          id: 1,
          value: year,
          name: seasonValue,
        }
      ])
    } else {
      if (seasonValue != '') {
        setSeasons([
          ...seasons,
          {
            id: seasons[seasons.length - 1].id + 1,
            value: year,
            name: seasonValue,
          }
        ])
      }
    }
    document.querySelector('.seasons__season input').value = '';
  }

  const deleteSeason = (id) => {
    setSeasons(prevState => {
      return prevState.filter(season => season.id !== id);
    })
  }

  return(
    <Fragment>
      <div className="header">
        <div className="header__logo">
          <img src={logo} alt={logo} />
        </div>
      </div>

      <div className="seasons">
        <h3>
          Список сезонов
        </h3>

        { loading.loading && <div className="account__loading"><CircularProgress /></div> }
 
        <List className="seasons__block">  
          {seasons.map((option) => (
            <ListItem className="seasons__item" button key={option.value} value={option.value}>
              <ListItemText>
                {option.name}
                <Tooltip title='Кликните, чтобы удалить' key={option.value}>
                  <DeleteOutlinedIcon className="seasons__icon" onClick={() => deleteSeason(option.id)} />
                </Tooltip>
              </ListItemText>
            </ListItem>
          ))}  
        </List>

        <div className="seasons__save">
          <TextField className="seasons__season" label="Добавить сезон" />
          <button onClick={addSeason}>Добавить</button>
        </div>
        

        <div className="seasons__buttons">    
          <Link className="seasons__link" to="/account"><button className="button seasons__button seasons__button--back">Назад</button></Link>
          <button onClick={saveSeason} className="button seasons__button--save">Сохранить</button>
        </div>

      </div>

      <Snackbar
        open={modal.open}
        autoHideDuration={1500}
        onClose={handleCloseModal}
        TransitionComponent={modal.Transition}
        message="Сезоны сохранены"
        key={modal.Transition.name}
      />
    </Fragment>
  )
}

export default Season;