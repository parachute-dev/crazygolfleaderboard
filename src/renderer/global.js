
export const debugInfo = () =>{

  var details = "<h2>Club: " + state.currentClub + "</h2>";

  return details;
}

export const baseDataUrl = "https://wordpress-208309-3651545.cloudwaysapps.com/leaderboard";

export const getCurrentClub = (clubs, currentClub, localIP) => {

  if (clubs != null){
 for (var club of clubs){
    if (club.branchId == currentClub){
      return club;
    }
  }
}

}

export const  getCurrentClubName = (clubs, currentClub, localIP) =>{
  var club = getCurrentClub(clubs, currentClub, localIP);
  if(club != null){
    console.log("NAME");
    return club.name;
  }
}


export const clubs = [
  {
    "branchId": "0",
    "code": "edinburgh",
    "name": "Edinburgh",
    "courses": [
      {"id": "volcano-valley",
       "name": "Volcano Valley",
      },
      {"id": "skull-falls",
       "name": "Skull Falls",
      }
    ]
  },
  {
    "branchId": "2",
    "code": "castleford",
    "name": "Castleford",
    "courses": [
      {"id": "t-rex-trail",
       "name": "T-Rex Trail",
      },
      {"id": "volcano-valley",
       "name": "Volcano Valley",
      }
    ]
  },
  {
    "branchId": "2",
    "code": "milton-keynes",
    "name": "Milton Keynes",
    "courses": [
      {"id": "volcano-valley",
       "name": "Volcano Valley",
      },
      {"id": "coney-island",
       "name": "Coney Island",
      },
      {"id": "tropicana-beach-club",
      "name": "Tropicana Beach Club",
     },
    ]
  },
];
