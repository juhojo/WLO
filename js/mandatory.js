/**
 * Manda algorithm (Short for mandatory)
 * Prioritieses mandatory courses over optional courses.
 * First populates the courses with as many mandatory
 * courses as possible and then fills all
 * the remaining capacity with optional ones.
 *
 * Starts with the largest mandatory course,
 * because if a course is mandatory and there is
 * capacity for it it should be picked.
 */

function manda(data, capacity) {
  let returnData = {
    maxValue: 0,
    set: [],
  };
  let mandatories = [];
  let freebies = [];

  data.forEach((obj) => {
    if (obj.mandatory) mandatories.push(obj);
    else freebies.push(obj);
  });
  mandatories = mandatories.sort(function(a, b){
    return a.credits > b.credits;
  });

  while (capacity > 0 && returnData.set.length < data.length) {
    for (let i = mandatories.length - 1; i >= 0; i--) {
      if (mandatories[i].hours <= capacity) {
        returnData.set.push(mandatories[i]);
        capacity = capacity - mandatories[i].hours;
      } else break;
    }
    for (let i = 0; i < freebies.length; i++) {
      let pos = []; // Short for possible
      for (let j = i; j < freebies.length; j++) {
        if (capacity > freebies[j].hours && returnData.set.indexOf(freebies[j]) < 0) pos.push(freebies[j]);
      }
      if (pos.length > 0) {
        let mostValuable = pos[0];
        let k = 0;
        while (k < pos.length - 1) { // atleast one item more.
          if ((mostValuable.credits / mostValuable.hours) < (pos[k+1].credits / pos[k+1].hours)) {
            mostValuable = pos[i+1];
          }
          k++;
        }
        if (mostValuable.hours <= capacity) {
          returnData.set.push(mostValuable);
          capacity = capacity - mostValuable.hours;
        } else break;
      } else break;
    }
    break; // Can not fit anymore so quit.
  }
  returnData.set.forEach((item) => returnData.maxValue += item.credits);
  return returnData;
}

export default manda;
