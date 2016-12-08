function manda(data, capacity) {
  let returnData = [];
  let mandatories = [];
  let freebies = [];

  data.forEach((obj) => {
    if (obj.mandatory) mandatories.push(obj);
    else freebies.push(obj);
  });
  mandatories = mandatories.sort(function(a, b){
    return a.credits > b.credits;
  });
  console.log("mandatories are: ", mandatories);
  while (capacity > 0) {
    for (let i = mandatories.length; i >= 0; i--) {
      console.log(mandatories[i]);
      // if (mandatories[i].hours < capacity) {
      //   returnData.push(mandatories[i]);
      //   capacity -= mandatories[i].capacity;
      // }
    }
    for (let i = 0; i < freebies.length; i++) {
      if (freebies[i].hours < capacity) {
        returnData.push(freebies[i]);
        capacity -= freebies[i].capacity;
      }
    }
  }
  console.log(returnData);
  return returnData;
}

export default manda;
