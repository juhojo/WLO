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
        const lesson = new Lesson(lessonLengths[k]);
        if (newOption.lessons.length > 0) {
          for (let l=0; l<newOption.lessons.length; l++) {
            if (lesson.getLesson().day === newOption.lessons[l].day && l !== k) {
              if (lessonsOverlap(lesson.getLesson(), newOption.lessons[l])) {
                lesson.setSafeStartTime(newOption.lessons);
              }
            }
          }
        }
        newOption.lessons.push(lesson.getLesson());
      }
      courses.push(newOption);
    }
  }

  return courses;
}

function Lesson(length) {
  this.startTime = rand(8,16);
  this.lesson = {
    day: rand(5),
    startTime: this.startTime,
    endTime: this.startTime + length
  };

  this.getLesson = function() { return this.lesson; }
  this.setSafeStartTime = function(lessons) {
    let days = [1, 2, 3, 4, 5];
    for (let i = 0; i<lessons.length; i++) {
      days.splice(days.indexOf(lessons[i].day), 1);
    }
    this.lesson.day = days[0];
  }

}

function findEdges(courses){
  courses=courses.slice(0);
  // Let's compare each course with one-other:
  for(let i=0; i<courses.length; i++){
    for(let j=i; j<courses.length; j++){ // Only check the ones in the future
      checkEdge(i,j);
    }
  }

  // This function takes in two values, selects the courses corresponding to that values and check if any of the lessons associated to the courses overlap.
  // If not, the index of each object in the courses array is stored in the other course's edges property, to indicate that they don't conflict with eachother.
  function checkEdge(a,b){
    //if "b" is not already in the edges of "a" and if courses a and b don't overlap:
    if( // NOTE: Tää vaikuttaa nyt siltä, että ei toimi vaikka pitäis. Tarviskohan jotain lisävalidaatiota vielä?
      !~courses[a].edges.indexOf(b) && //skip if edge already found
      !coursesOverlap(courses[a],courses[b]) //skip if conflict
    ){
      if (coursesOverlap(courses[a], courses[b])) console.log("checkEdge if statement does not work", courses[a], courses[b]);
      if (courses[a].edges.indexOf(b) >= 0) console.log("checkEdge if statement does not work", courses[a], courses[b]);
      courses[a].edges.insert(b);
      courses[b].edges.insert(a);
    }
  }

  return courses;
}

//This compares each of the lessons associated with a course with the lessons of the other course to see if there is any overlapping in the schedule:
//returns true if there is overlapping, otherwise false
function coursesOverlap(c1, c2){
  if(c1.name == c2.name) return true;
  if(c1.period != c2.period) return false;
  for(let i in c1.lessons){
    for(let j in c2.lessons){
      if(lessonsOverlap(c1.lessons[i], c2.lessons[j])){
        console.log(`"Courses overlap:"`, c1, c2);
        return true;
      }
    }
  }
  return false;
}

//compares two lessons to see if their schedules overlap
//returns true if there is overlapping, otherwise false
function lessonsOverlap(l1, l2){ // NOTE: Välillä sekoilee
  if(l1.day !== l2.day) return false;
  const t = [l1,l2].sort((a, b) => {
    if(a.startTime>b.startTime) return 1;
    if(a.startTime<b.startTime) return -1;
    return 0;
  });
  if(t[1].startTime !== t[0].startTime &&
     t[1].startTime >= t[0].endTime) return false;
  console.log(`"Lessons overlap"`,l1, l2);
  return true;
}

function pickMoreValuable(c1,c2){
  return c1.worth>c2.worth?c1:c2;
}

const courses = findEdges(generateCourses());

export default courses;
