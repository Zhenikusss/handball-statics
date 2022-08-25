import React from 'react';
import { Controller } from "react-hook-form";
import { 
    TextField,
    FormControl,
    MenuItem,
} from '@material-ui/core';

function Info (props) {
    const { control } = props;
    const handleChangeInfo = props.handleChangeInfo;
    const tableInfo = props.tableInfo;
    const players = props.playersTeam;
    let tableRow = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}];

    function sumGoals (teamName) {
      const copyObject = tableInfo;
      let resultA = 0;
      let resultB = 0;

      for (let key in copyObject) {
        if (key.toString().slice(-1) === 'A' && key.match(/gPlayer/)) {
            let num = Number(copyObject[key]);
            resultA += num;
        } else if (key.toString().slice(-1) === 'B' && key.match(/gPlayer/)) {
            let num = Number(copyObject[key]);
            resultB += num;
        }
      }

      if (teamName === 'A') {
        return resultA;
      } else if (teamName === 'B') {
        return resultB;
      } else {
        return '-';
      } 
    }
    
    return (
            <div className = 'info-players__block'>

                <table className = 'info-players__table' border="1">
                <tbody>
                    <tr className={props.color}>
                        <th>{props.team}</th>
                        <th colSpan = '9'>Фамилия, имя игроков и официальных лиц (Оф. А-Г)</th>
                    </tr>
                    <tr className={props.color}>
                        <th>№</th>
                        <th>Команда {props.team}</th>
                        <th>Г</th>
                        <th>П</th>
                        <th>2`</th>
                        <th>2`</th>
                        <th>2`</th>
                        <th>Д</th>
                        <th>ДР</th>
                        <th>КШ</th>
                    </tr>

                    {tableRow.map((num, index) =>

                        <tr key={index}>
                            <td className='tableNumber'>
                                <Controller
                                    as={
                                      <FormControl>
                                        <TextField
                                          type="number"
                                          label=""
                                          value={tableInfo['player' + (index+1) + props.team]}
                                          // value='18'
                                          name={'player' + (index+1) + props.team}
                                          onChange={(event) => handleChangeInfo(event)}
                                        />
                                      </FormControl>
                                    }
                                    name={'player' + (index+1) + props.team}
                                    control={control} 
                                />
                            </td>
                            <td className='tableName'>
                                <Controller 
                                    as={
                                      <FormControl>
                                        <TextField
                                          select
                                          label="" 
                                          value={tableInfo['teamPlayer' + (index+1) + props.team]} 
                                          name={'teamPlayer' + (index+1) + props.team} 
                                          onChange={(event) => {
                                            handleChangeInfo(event);
                                          }}
                                        >

                                        <MenuItem divider={true} value="">
                                          <em>Пусто</em>
                                        </MenuItem>

                                        {players.map((option) => {
                                          return (
                                            <MenuItem divider={true} key={option.id} value={option.name}>
                                              {option.name}
                                            </MenuItem>
                                          )}
                                        )}
                                        </TextField>
                                      </FormControl>
                                    }
                                    name={'teamPlayer' + (index+1) + props.team}
                                    control={control} 
                                />
                            </td>
                            <td>
                                <Controller 
                                    as={
                                      <FormControl>
                                        <TextField type="number" label="" value={tableInfo['gPlayer' + (index+1) + props.team]} name={'gPlayer' + (index+1) + props.team} onChange={(event) => handleChangeInfo(event)} />
                                      </FormControl>
                                    }
                                    name={'gPlayer' + (index+1) + props.team}
                                    control={control} 
                                />
                            </td>
                            <td>
                                <Controller 
                                    as={
                                      <FormControl>
                                        <TextField type="number" label="" value={tableInfo['pPlayer' + (index+1) + props.team]} name={'pPlayer' + (index+1) + props.team} onChange={(event) => handleChangeInfo(event)} />
                                      </FormControl>
                                    }
                                    name={'pPlayer' + (index+1) + props.team}
                                    control={control} 
                                />
                            </td>
                            <td>
                                <Controller 
                                    as={
                                      <FormControl>
                                        <TextField label="" value={tableInfo['t1Player' + (index+1) + props.team]} name={'t1Player' + (index+1) + props.team} onChange={(event) => handleChangeInfo(event)} />
                                      </FormControl>
                                    }
                                    name={'t1Player' + (index+1) + props.team}
                                    control={control} 
                                />
                            </td>
                            <td>
                                <Controller 
                                    as={
                                      <FormControl>
                                        <TextField label="" value={tableInfo['t2Player' + (index+1) + props.team]} name={'t2Player' + (index+1) + props.team} onChange={(event) => handleChangeInfo(event)} />
                                      </FormControl>
                                    }
                                    name={'t2Player' + (index+1) + props.team}
                                    control={control} 
                                />
                            </td>
                            <td>
                                <Controller 
                                    as={
                                      <FormControl>
                                        <TextField label="" value={tableInfo['t3Player' + (index+1) + props.team]} name={'t3Player' + (index+1) + props.team} onChange={(event) => handleChangeInfo(event)} />
                                      </FormControl>
                                    }
                                    name={'t3Player' + (index+1) + props.team}
                                    control={control} 
                                />
                            </td>
                            <td>
                                <Controller 
                                    as={
                                      <FormControl>
                                        <TextField type="number" label="" value={tableInfo['t4Player' + (index+1) + props.team]} name={'t4Player' + (index+1) + props.team} onChange={(event) => handleChangeInfo(event)} />
                                      </FormControl>
                                    }
                                    name={'t4Player' + (index+1) + props.team}
                                    control={control} 
                                />
                            </td>
                            <td>
                                <Controller 
                                    as={
                                      <FormControl>
                                        <TextField type="number" label="" value={tableInfo['drPlayer' + (index+1) + props.team]} name={'drPlayer' + (index+1) + props.team} onChange={(event) => handleChangeInfo(event)} />
                                      </FormControl>
                                    }
                                    name={'drPlayer' + (index+1) + props.team}
                                    control={control} 
                                />
                            </td>
                            <td>
                                <Controller 
                                    as={
                                      <FormControl>
                                        <TextField type="number" label="" value={tableInfo['kshPlayer' + (index+1) + props.team]} name={'kshPlayer' + (index+1) + props.team} onChange={(event) => handleChangeInfo(event)} />
                                      </FormControl>
                                    }
                                    name={'kshPlayer' + (index+1) + props.team}
                                    control={control} 
                                />
                            </td>
                        </tr>

                    )}

                    <tr>
                        <td>Оф. А</td>
                        <td>
                            <Controller 
                                as={
                                  <FormControl>
                                    <TextField label="" value={tableInfo['teamOfA' + props.team]} name={'teamOfA' + props.team} onChange={(event) => handleChangeInfo(event)} />
                                  </FormControl>
                                }
                                name={'teamOfA' + props.team}
                                control={control} 
                            />
                        </td>
                        <td rowSpan = '2'>
                            <Controller 
                                as={
                                  <FormControl>
                                    <TextField label=""  value={tableInfo['teamOfAPoint' + props.team]} name={'teamOfAPoint' + props.team} onChange={(event) => handleChangeInfo(event)} />
                                  </FormControl>
                                }
                                name={'teamOfAPoint' + props.team}
                                control={control} 
                            />
                        </td>
                        <td>
                            <Controller 
                                as={
                                  <FormControl>
                                    <TextField type="number" label="" value={tableInfo['teamOfA1' + props.team]} name={'teamOfA1' + props.team} onChange={(event) => handleChangeInfo(event)} />
                                  </FormControl>
                                }
                                name={'teamOfA1' + props.team}
                                control={control} 
                            />
                        </td>
                        <td>
                            <Controller 
                                as={
                                  <FormControl>
                                    <TextField type="number" label="" value={tableInfo['teamOfA2' + props.team]} name={'teamOfA2' + props.team} onChange={(event) => handleChangeInfo(event)} />
                                  </FormControl>
                                }
                                name={'teamOfA2' + props.team}
                                control={control} 
                            />
                        </td>
                        <td rowSpan = '4'>х</td>
                        <td rowSpan = '4'>х</td>
                        <td>
                            <Controller 
                                as={
                                  <FormControl>
                                    <TextField type="number" label="" value={tableInfo['teamOfA3' + props.team]} name={'teamOfA3' + props.team} onChange={(event) => handleChangeInfo(event)} />
                                  </FormControl>
                                }
                                name={'teamOfA3' + props.team}
                                control={control} 
                            />
                        </td>
                        <td>
                            <Controller 
                                as={
                                  <FormControl>
                                    <TextField type="number" label="" value={tableInfo['teamOfA4' + props.team]} name={'teamOfA4' + props.team} onChange={(event) => handleChangeInfo(event)} />
                                  </FormControl>
                                }
                                name={'teamOfA4' + props.team}
                                control={control} 
                            />
                        </td>
                        <td>
                            <Controller 
                                as={
                                  <FormControl>
                                    <TextField type="number" label="" value={tableInfo['teamOfA5' + props.team]} name={'teamOfA5' + props.team} onChange={(event) => handleChangeInfo(event)} />
                                  </FormControl>
                                }
                                name={'teamOfA5' + props.team}
                                control={control} 
                            />
                        </td>
                    </tr>

                    <tr>
                        <td>Оф. Б</td>
                        <td>
                            <Controller 
                                as={
                                  <FormControl>
                                    <TextField label="" value={tableInfo['teamOfA6' + props.team]} name={'teamOfA6' + props.team} onChange={(event) => handleChangeInfo(event)} />
                                  </FormControl>
                                }
                                name={'teamOfA6' + props.team}
                                control={control} 
                            />
                        </td>
                        <td>
                            <Controller 
                                as={
                                  <FormControl>
                                    <TextField label="" type="number" value={tableInfo['teamOfA7' + props.team]} name={'teamOfA7' + props.team} onChange={(event) => handleChangeInfo(event)} />
                                  </FormControl>
                                }
                                name={'teamOfA7' + props.team}
                                control={control} 
                            />
                        </td>
                        <td>
                            <Controller 
                                as={
                                  <FormControl>
                                    <TextField label="" type="number" value={tableInfo['teamOfA8' + props.team]} name={'teamOfA8' + props.team} onChange={(event) => handleChangeInfo(event)} />
                                  </FormControl>
                                }
                                name={'teamOfA8' + props.team}
                                control={control} 
                            />
                        </td>
                        <td>
                            <Controller 
                                as={
                                  <FormControl>
                                    <TextField label="" type="number" value={tableInfo['teamOfA9' + props.team]} name={'teamOfA9' + props.team} onChange={(event) => handleChangeInfo(event)} />
                                  </FormControl>
                                }
                                name={'teamOfA9' + props.team}
                                control={control} 
                            />
                        </td>
                        <td>
                            <Controller 
                                as={
                                  <FormControl>
                                    <TextField label="" type="number" value={tableInfo['teamOfA10' + props.team]} name={'teamOfA10' + props.team} onChange={(event) => handleChangeInfo(event)} />
                                  </FormControl>
                                }
                                name={'teamOfA10' + props.team}
                                control={control} 
                            />
                        </td>
                        <td>
                            <Controller 
                                as={
                                  <FormControl>
                                    <TextField label="" type="number" value={tableInfo['teamOfA11' + props.team]} name={'teamOfA11' + props.team} onChange={(event) => handleChangeInfo(event)} />
                                  </FormControl>
                                }
                                name={'teamOfA11' + props.team}
                                control={control} 
                            />
                        </td> 
                    </tr>

                    <tr>
                        <td>Оф. В</td>
                        <td>
                            <Controller 
                                as={
                                  <FormControl>
                                    <TextField label="" value={tableInfo['teamOfA12' + props.team]} name={'teamOfA12' + props.team} onChange={(event) => handleChangeInfo(event)} />
                                  </FormControl>
                                }
                                name={'teamOfA12' + props.team}
                                control={control} 
                            />
                        </td>
                        <td rowSpan = '2'>Итого: {sumGoals(props.team)}</td>
                        <td>
                            <Controller 
                                as={
                                  <FormControl>
                                    <TextField label="" type="number" value={tableInfo['teamOfA13' + props.team]} name={'teamOfA13' + props.team} onChange={(event) => handleChangeInfo(event)} />
                                  </FormControl>
                                }
                                name={'teamOfA13' + props.team}
                                control={control} 
                            />
                        </td>
                        <td>
                            <Controller 
                                as={
                                  <FormControl>
                                    <TextField label="" type="number" value={tableInfo['teamOfA14' + props.team]} name={'teamOfA14' + props.team} onChange={(event) => handleChangeInfo(event)} />
                                  </FormControl>
                                }
                                name={'teamOfA14' + props.team}
                                control={control} 
                            />
                        </td>
                        <td>
                            <Controller 
                                as={
                                  <FormControl>
                                    <TextField label="" type="number" value={tableInfo['teamOfA15' + props.team]} name={'teamOfA15' + props.team} onChange={(event) => handleChangeInfo(event)} />
                                  </FormControl>
                                }
                                name={'teamOfA15' + props.team}
                                control={control} 
                            />
                        </td>
                        <td>
                            <Controller 
                                as={
                                  <FormControl>
                                    <TextField label="" type="number" value={tableInfo['teamOfA16' + props.team]} name={'teamOfA16' + props.team} onChange={(event) => handleChangeInfo(event)} />
                                  </FormControl>
                                }
                                name={'teamOfA16' + props.team}
                                control={control} 
                            />
                        </td>
                        <td>
                            <Controller 
                                as={
                                  <FormControl>
                                    <TextField label="" type="number" value={tableInfo['teamOfA17' + props.team]} name={'teamOfA17' + props.team} onChange={(event) => handleChangeInfo(event)} />
                                  </FormControl>
                                }
                                name={'teamOfA17' + props.team}
                                control={control} 
                            />
                        </td>    
                    </tr>

                    <tr>
                        <td>Оф. Г</td>
                        <td>
                            <Controller 
                                as={
                                  <FormControl>
                                    <TextField label="" value={tableInfo['teamOfA18' + props.team]} name={'teamOfA18' + props.team} onChange={(event) => handleChangeInfo(event)} />
                                  </FormControl>
                                }
                                name={'teamOfA18' + props.team}
                                control={control} 
                            />
                        </td>
                        <td>
                            <Controller 
                                as={
                                  <FormControl>
                                    <TextField label="" type="number" value={tableInfo['teamOfA19' + props.team]} name={'teamOfA19' + props.team} onChange={(event) => handleChangeInfo(event)} />
                                  </FormControl>
                                }
                                name={'teamOfA19' + props.team}
                                control={control} 
                            />
                        </td>  
                        <td>
                            <Controller 
                                as={
                                  <FormControl>
                                    <TextField label="" type="number" value={tableInfo['teamOfA20' + props.team]} name={'teamOfA20' + props.team} onChange={(event) => handleChangeInfo(event)} />
                                  </FormControl>
                                }
                                name={'teamOfA20' + props.team}
                                control={control} 
                            />
                        </td>  
                        <td>
                            <Controller 
                                as={
                                  <FormControl>
                                    <TextField label="" type="number" value={tableInfo['teamOfA21' + props.team]} name={'teamOfA21' + props.team} onChange={(event) => handleChangeInfo(event)} />
                                  </FormControl>
                                }
                                name={'teamOfA21' + props.team}
                                control={control} 
                            />
                        </td>  
                        <td>
                            <Controller 
                                as={
                                  <FormControl>
                                    <TextField label="" type="number" value={tableInfo['teamOfA22' + props.team]} name={'teamOfA22' + props.team} onChange={(event) => handleChangeInfo(event)} />
                                  </FormControl>
                                }
                                name={'teamOfA22' + props.team}
                                control={control} 
                            />
                        </td>  
                        <td>
                            <Controller 
                                as={
                                  <FormControl>
                                    <TextField label="" type="number" value={tableInfo['teamOfA23' + props.team]} name={'teamOfA23' + props.team} onChange={(event) => handleChangeInfo(event)} />
                                  </FormControl>
                                }
                                name={'teamOfA23' + props.team}
                                control={control} 
                            />
                        </td>
                    </tr>
                </tbody>
                </table>    
                    
            </div>
    )
}

export default Info;