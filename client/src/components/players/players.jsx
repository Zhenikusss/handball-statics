import React from 'react';
import Match from './match';
import Info from './info';
import Referee from './referee';

function Players (props) {
    const { control } = props;
    const handleChangeInfo = props.handleChangeInfo;
    const tableInfo = props.tableInfo;
    const playersA = props.playersTeamA;
    const playersB = props.playersTeamB;

    return (
        <div className = 'table-players table__row'>

            <div className = 'table-players__team'>
                <div className = 'players-all team-1'>
                    <div className = 'players-match tr'>
                        <Match color={'green'} team = {'A'} control = {control} handleChangeInfo={handleChangeInfo} tableInfo={tableInfo} />
                    </div>
                    <div className = 'players-info'>
                        <Info color={'green'} playersTeam = {playersA} team = {'A'} control = {control} handleChangeInfo={handleChangeInfo} tableInfo={tableInfo} />
                    </div>
                </div>

               <div className = 'players-all team-2'>
                    <div className = 'players-match tr'>
                        <Match color={'blue'} team = {'B'} control = {control} handleChangeInfo={handleChangeInfo} tableInfo={tableInfo} />
                    </div>
                    <div className = 'players-info'>
                        <Info color={'blue'} playersTeam = {playersB} team = {'B'} control = {control} handleChangeInfo={handleChangeInfo} tableInfo={tableInfo} />
                    </div>
                </div>
            </div>
            
            <div className = 'referee-right'>
                <Referee handleChangeInfo={handleChangeInfo} tableInfo={tableInfo} control = {control} />
            </div>
        </div>
    )
}

export default Players;