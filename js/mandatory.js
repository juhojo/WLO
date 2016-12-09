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
      if (freebies[i].hours <= capacity) {
        returnData.set.push(freebies[i]);
        capacity = capacity - freebies[i].hours;
      } else break;
    }
    break; // Can not fit anymore so quit.
  }
  return returnData;
}

export default manda;
