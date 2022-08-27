const filterData = (teams, audience) => {
  const arrTeams = [];

  audience.forEach((t, index) => {
    let homeMatches = 0;
    let totalViewers = 0;

    teams.forEach((adc) => {
      if (adc.value === t.teamA) {
        homeMatches = ++homeMatches;
        totalViewers = totalViewers + Number(t.spectators);
      }
    });
  
    let middleViewers = Number((totalViewers / homeMatches).toFixed(1)) || 0;

    const newObjAudience = {
      team: t.teamA,
      homeMatches: homeMatches,
      totalViewers: totalViewers,
      middleViewers: middleViewers,
    }

    arrTeams.push(newObjAudience);
  });

  const arrFinish = [];
  const arrAllTeams = [];

  arrTeams.forEach((item) => {
    arrAllTeams.push(item.team);
  });

  const arrTeamsUnique = arrAllTeams.filter((item, pos) => {
    return arrAllTeams.indexOf(item) === pos;
  })

  arrTeamsUnique.forEach((item1) => {
    let homeMatches = 0;
    let totalViewers = 0;
    let name = item1;

    arrTeams.forEach((item2) => {
      if (name === item2.team) {
        homeMatches = homeMatches + item2.homeMatches;
        totalViewers = totalViewers + item2.totalViewers;
      }
    })

    let middleViewers = Number((totalViewers / homeMatches).toFixed(1)) || 0;

    const newObjAudience = {
      team: name,
      homeMatches: homeMatches,
      totalViewers: totalViewers,
      middleViewers: middleViewers,
    }

    arrFinish.push(newObjAudience);
  })

  arrFinish.sort((a, b) => {
    if (a.middleViewers < b.middleViewers) {
        return 1;
    } else if (a.middleViewers > b.middleViewers) {
        return -1;
    } else {
        return 0;
    }
  });

  return arrFinish;
};

export default filterData;
