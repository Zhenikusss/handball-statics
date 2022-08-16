const getDataForTable = (players, data) => {
  const arrPlayers = [];

  players.forEach((p, index) => {
    let allGoals = 0;
    let allGames = 0;

    if (index + 1 > data.length) return;

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
