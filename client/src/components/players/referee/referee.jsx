import React from 'react';
import { Controller } from 'react-hook-form';
import { 
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormControl
 } from '@material-ui/core';

function Referee (props) {
    const { control } = props;
    const handleChangeInfo = props.handleChangeInfo;
    const tableInfo = props.tableInfo;

    return (
        <div className = 'players-referee__block'>

        <div className = 'players-referee__spectators'>
    
          <div className = 'tr'>
            <Controller 
              as={
                <FormControl>
                  <TextField label="Кол-во зрителей" type="number" value={tableInfo.spectators} name="spectators" onChange={(event) => handleChangeInfo(event)} />
                </FormControl>
              }
              name="spectators" 
              control={control} 
            />
          </div>
    
          <div className = 'tr'>
            <Controller 
              as={
                <FormControl>
                  <TextField label="Вместимость зала" type="number" value={tableInfo.hallCapacity} name="hallCapacity" onChange={(event) => handleChangeInfo(event)} />
                </FormControl>
              }
              name="hallCapacity" 
              control={control} 
            />
          </div>
    
        </div>
    
        <div className = 'protests table__rul tr'>
          <div>Подача протестов</div>
          <Controller
            as={
              <FormControl>
                <RadioGroup aria-label="protests" value={tableInfo.protests} name="protests" onChange={(event) => handleChangeInfo(event)}>
              
                  <div className = 'protests__yes'>
                   <FormControlLabel
                     value="Yes"
                     control={<Radio />}
                     label="Да"
                   />
                  </div>
              
                  <div className = 'protests__no'>
                   <FormControlLabel
                     value="No"
                     control={<Radio />}
                     label="Нет"
                   />
                  </div>
              
                </RadioGroup>
              </FormControl>
              }    
              name="protests"
              control={control}
            />
        </div>
    
        <div className = 'players-referee__comments tr'>
          <Controller 
            as={
              <FormControl>
                  <TextField placeholder="Замечания" multiline variant="outlined" type="number" value={tableInfo.comments} name="comments" onChange={(event) => handleChangeInfo(event)} />
              </FormControl>
            } 
            name="comments" 
            control={control} 
          />
          
        </div>
    
        <div className = 'players-referee__num'>
          <div className = 'tr yellow'>
            <Controller 
              as={
                <FormControl>
                  <TextField label="Судья 1" placeholder="Фамилия, город" name="referee1" value={tableInfo.referee1} name="referee1" onChange={(event) => handleChangeInfo(event)} />
                </FormControl>
              }
              name="referee1" 
              control={control} 
            />
          </div>
    
          <div className = 'players-referee__signature tr'>Подпись</div>
    
          <div className = 'tr yellow'>
            <Controller 
              as={
                <FormControl>
                  <TextField label="Судья 2" placeholder="Фамилия, город" value={tableInfo.referee2} name="referee2" onChange={(event) => handleChangeInfo(event)} />
                </FormControl>
              }
              name="referee2" 
              control={control} 
            />
          </div>
          <div className = 'players-referee__signature tr'>Подпись</div>
    
          <div className = 'tr yellow'>
            <Controller 
              as={
                <FormControl>
                  <TextField label="Инспектор" placeholder="Фамилия, город" value={tableInfo.inspector} name="inspector" onChange={(event) => handleChangeInfo(event)} />
                </FormControl>
              }
              name="inspector" 
              control={control} 
            />
          </div>
    
          <div className = 'players-referee__signature tr'>Подпись</div>
    
          <div className = 'tr yellow'>
            <Controller 
              as={
                <FormControl>
                  <TextField label="Главный судья" placeholder="Фамилия, город" value={tableInfo.mainReferee} name="mainReferee" onChange={(event) => handleChangeInfo(event)} />
                </FormControl>
              }
              name="mainReferee" 
              control={control} 
            />
          </div>
          <div className = 'players-referee__signature tr'>Подпись</div>
    
        </div>
    
      </div>
    )
}

export default Referee;