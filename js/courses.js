import _ from 'lodash';
import {rand, add, clone} from './methods';

function generateCourses(){
  const courses=[],
        courseNames=[
    ["Matematiikan", "Fysiikan", "Tietotekniikan", "Englannin", "Ruotsin", "Japanin", "Espanjan", "Ranskan", "Tietokantojen", "Mediatekniikan", "Käyttöliittymien", "Painotekniikan", "3D", "Olio-ohjelmoinnin", "Javan", "C#", "Javascriptin", "PHP", "Mobiiliohjelmoinnin", "Peliohjelmoinnin"],
    ["alkeet","jatkokurssi","perusteet","edistynyt kurssi"]
  ];

  /* This part will generate some dummy-courses... */
  let id=0;
  for(let i=0; i<30; i++){
    const newCourse = {
      id:id++,
      name:
        courseNames[0][rand(0,courseNames[0].length-1)] + " " +
        courseNames[1][rand(0,courseNames[1].length-1)],
      credits: rand(5),
      edges: [],
    };
    // const numberOfLessons = rand(3);
    const numberOfLessons = rand(2);
    const lessonLengths=Array(numberOfLessons).fill(0).map(v=>1.25*1);
    newCourse.worth=lessonLengths.reduce(add, 0)/newCourse.credits; // time/credits
    for(let j=0; j<rand(3); j++){
      const newOption = Object.assign({}, newCourse);
      newOption.period = rand(4);
      newOption.lessons = [];
      for(let k=0; k<numberOfLessons; k++){
        const startTime = rand(8,16);
        newOption.lessons.push({
          day:rand(5),
          startTime: startTime,
          endTime: startTime + lessonLengths[k]
        });
      }
      courses.push(newOption);
    }
  }

  return courses;
}

function findEdges(courses){
  courses=courses.slice(0);
  //Let's compare each course with one-other:
  for(let i=0; i<courses.length; i++){
    for(let j=i; j<courses.length; j++){
      checkEdge(i,j);
    }
  }

  // This function takes in two values, selects the courses corresponding to that values and check if any of the lessons associated to the courses overlap.
  // If not, the index of each object in the courses array is stored in the other course's edges property, to indicate that they don't conflict with eachother.
  function checkEdge(a,b){
    //if "b" is not already in the edges of "a" and if courses a and b don't overlap:
    if(
      !~courses[a].edges.indexOf(b) && //skip if edge already found
      !coursesOverlap(courses[a],courses[b]) //skip if conflict
    ){
      courses[a].edges.insert(b);
      courses[b].edges.insert(a);
    }
  }

  return courses;
}

//This compares each of the lessons associated with a course with the lessons of the other course to see if there is any overlapping in the schedule:
//returns true if there is overlapping, otherwise false
function coursesOverlap(c1, c2){
  // console.log('hai',c1, c2, c1.name == c2.name);
  if(c1.name == c2.name) return true;
  else if(c1.period != c2.period) return false;
  let overlaps=false;
  loop1: for(let i in c1.lessons) {
    for(let j in c2.lessons){ // miksei joo
      if(lessonsOverlap(c1.lessons[i], c2.lessons[j])){
        overlaps=true; //jos yks tunti overlappaa nii koko kurssiki
        break loop1;
      }
    }
  }
  return overlaps;
}

//compares two lessons to see if their schedules overlap
//returns true if there is overlapping, otherwise false
function lessonsOverlap(l1, l2){
  if(l1.day !== l2.day) return false;
  const t = [l1,l2].sort((a, b) =>{
    if(a.startTime>b.startTime) return 1;
    if(a.startTime<b.startTime) return -1;
    return 0; //että saadaan ne alkamisjärjestyksee
  });
  if(t[1].startTime !== t[0].startTime && //TODO: tämä on vituiks
     t[1].startTime >= t[0].endTime) return false;
  // console.log(`"overlap"`,l1, l2); //tää on se mitä me äskön katottii
  return true;
}

function pickMoreValuable(c1,c2){
  return c1.worth>c2.worth?c1:c2;
}

const courses = findEdges(generateCourses());

export default courses;
