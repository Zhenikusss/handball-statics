const filterData = (teams, audience) => {
  const arrPlayers = [];

  teams.forEach((t, index) => {
    let homeMatches = 0;
    let totalViewers = 0;

    if (index + 1 > audience.length) return;

    audience.forEach((adc) => {
      if (t.value === adc.teamA) {
        homeMatches = ++homeMatches;
        totalViewers = totalViewers + Number(adc.spectators);
      }
    });

    let middleViewers = Number((totalViewers / homeMatches).toFixed(1)) || 0;

    const newObjAudience = {
      team: t.value,
      homeMatches: homeMatches,
      totalViewers: totalViewers,
      middleViewers: middleViewers,
    }

    arrPlayers.push(newObjAudience);
  });

  arrPlayers.sort((a, b) => {
    if (a.middleViewers < b.middleViewers) {
        return 1;
    } else if (a.middleViewers > b.middleViewers) {
        return -1;
    } else {
        return 0;
    }
  });

  return arrPlayers;
};

export default filterData;
