const getDataForTable = (players, data) => {
  const arrPlayers = [];

  if (data.length > players.length) {
    players.forEach((p, index) => {
      let allGoals = 0;
      let allGames = 0;
    
      data.forEach((ds) => {
        if (p.name === ds.player) {
          allGoals = allGoals + Number(ds.countGoals);
          allGames = ++allGames;
        }
      });
  
      let allGoalsInMatch = (allGoals / allGames).toFixed(1);
  
      if (allGoalsInMatch == '0.0' || isNaN(allGoalsInMatch)) {
        allGoalsInMatch = 0;
      }
  
      const newObjPlayer = {
        name: p.name,
        team: p.team,
        score: allGoals,
        games: allGames,
        middleScore: Number(allGoalsInMatch),
      }
  
      arrPlayers.push(newObjPlayer);
    });
  } else if (data.length < players.length) {
    data.forEach((p, index) => {
      let allGoals = 0;
      let allGames = 0;
    
      players.forEach((ds) => {
        if (ds.name === p.player) {
          allGoals = allGoals + Number(p.countGoals);
          allGames = ++allGames;
        }
      });
  
      let allGoalsInMatch = (allGoals / allGames).toFixed(1);
  
      if (allGoalsInMatch == '0.0' || isNaN(allGoalsInMatch)) {
        allGoalsInMatch = 0;
      }
  
      const newObjPlayer = {
        name: p.player,
        team: p.team,
        score: allGoals,
        games: allGames,
        middleScore: Number(allGoalsInMatch),
      }
  
      arrPlayers.push(newObjPlayer);
    });
  }

  arrPlayers.sort((a, b) => {
    if (a.score < b.score) {
        return 1;
    } else if (a.score > b.score) {
        return -1;
    } else {
        return 0;
    }
  });

  arrPlayers.map((item, idx) => {
    item.place = idx + 1;
  });

  return arrPlayers;
};

export default getDataForTable;
