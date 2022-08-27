const getDataForTable = (players, data) => {
  const arrPlayers = [];

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

  const arrFinish = [];
  const arrAllPlayers = [];

  arrPlayers.forEach((item) => {
    arrAllPlayers.push(item.name);
  });

  const arrPlayersUnique = arrAllPlayers.filter((item, pos) => {
    return arrAllPlayers.indexOf(item) === pos;
  })

  arrPlayersUnique.forEach((item1) => {
    let allGoals = 0;
    let allGames = 0;
    let name = item1;
    let team = '';

    arrPlayers.forEach((item2) => {
      if (name === item2.name) {
        allGoals = allGoals + item2.score;
        allGames = allGames + item2.games;
        team = item2.team;
      }
    })

    let allGoalsInMatch = (allGoals / allGames).toFixed(1);
  
    if (allGoalsInMatch == '0.0' || isNaN(allGoalsInMatch)) {
      allGoalsInMatch = 0;
    }

    const newObjPlayer = {
      name: name,
      team: team,
      score: allGoals,
      games: allGames,
      middleScore: Number(allGoalsInMatch),
    }

    arrFinish.push(newObjPlayer);
  })

  arrFinish.sort((a, b) => {
    if (a.score < b.score) {
        return 1;
    } else if (a.score > b.score) {
        return -1;
    } else {
        return 0;
    }
  });

  arrFinish.map((item, idx) => {
    item.place = idx + 1;
  });

  return arrFinish;
};

export default getDataForTable;
