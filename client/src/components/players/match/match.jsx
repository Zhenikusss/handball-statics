import React from 'react';
import { Controller } from 'react-hook-form';
import { 
  TextField,
  FormControl
} from '@material-ui/core';

function Match (props) {
    const { control } = props;
    const classForSignature = `players-match__signature ${props.color}`;
    const handleChangeInfo = props.handleChangeInfo;
    const tableInfo = props.tableInfo;

    return (
        
        <div className = 'players-match__block'>

            <div className = 'tr'>
              Командный тайм-аут
              <Controller 
                as={
                  <FormControl>
                    <TextField label="Т-А №1" value={tableInfo['timeOut1' + props.team]} name={'timeOut1' + props.team} onChange={(event) => handleChangeInfo(event)} />
                  </FormControl>
                }
                name={'timeOut1' + props.team}
                control={control} 
              />
              <Controller 
                as={
                  <FormControl>
                    <TextField label="Т-А №2" value={tableInfo['timeOut2' + props.team]} name={'timeOut2' + props.team} onChange={(event) => handleChangeInfo(event)} />
                  </FormControl>
                }
                name={'timeOut2' + props.team}
                control={control} 
              />
              <Controller 
                as={
                  <FormControl>
                    <TextField label="Т-А №3" value={tableInfo['timeOut3' + props.team]} name={'timeOut3' + props.team} onChange={(event) => handleChangeInfo(event)} />
                  </FormControl>
                }
                name={'timeOut3' + props.team}
                control={control} 
              />
            </div>
            <div className = 'tr'>
              <Controller 
                as={
                  <FormControl>
                    <TextField label="Кол-во 7 м" type="number" value={tableInfo['num7m' + props.team]} name={'num7m' + props.team} onChange={(event) => handleChangeInfo(event)} />
                  </FormControl>
                }
                name={'num7m' + props.team}
                control={control} 
              />
              <Controller 
                as={
                  <FormControl>
                    <TextField label="Кол-во голов" type="number" value={tableInfo['numGoals' + props.team]} name={'numGoals' + props.team} onChange={(event) => handleChangeInfo(event)} />
                  </FormControl>
                }
                name={'numGoals' + props.team}
                control={control} 
              />
            </div>
            <div className = {classForSignature}>Подпись представителя команды {props.team} (оф.А)</div>

          </div>
        
    )
}

export default Match;