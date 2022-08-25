const filterData = (teams, audience) => {
  const arrPlayers = [];

  if (audience.length > teams.length) {
    teams.forEach((t, index) => {
      let homeMatches = 0;
      let totalViewers = 0;
  
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
  } else if (audience.length < teams.length) {
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
  
      arrPlayers.push(newObjAudience);
    });
  }



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
