import _ from 'lodash';
export default function solution(content) {
  // BEGIN
const data = content.split('\n')
  .slice(2)
  .map((str) => (str).split('|'))
  .map((str) => str.map((el) => el.trim()))
  .map((el) => el.filter((elt) => (elt)));
const count = data.length

const  names = data.map((el) => {
  return  el[0][0].toUpperCase() + el[0].slice(1).trim()
}).sort()

const isDangerous = data.reduce((acc, el) => { // (el[4] === 'Да') ? acc + 1 : acc);
  if (el[4] === 'Да') {
    return acc + 1;
  }
  return acc;
  }, 0)
  const notDangerousP = ((count - isDangerous) / count) * 100;
  const isDangerousP = 100 - notDangerousP;

const forestPlants = data.filter((el) => el[1].includes('Леса'));
const lifeTime = forestPlants.map((el) => el[3].split(' ')[0]);
const medianLifeTimes = lifeTime.map((el) => {
  if (!el.includes('-')) { return Number(el); }
  const minTime = Number(el.split('-')[0]);
  const maxTime = Number(el.split('-')[1]);
  return (maxTime - minTime) / 2;
})
const averragLifeTime = _.sum(medianLifeTimes) / medianLifeTimes.length;

const dangerPlants = data.filter((el) => (el[4] === 'Да'))
  .map((el) => el[1].split(', ')).flat()
  .map((el) => el.toLowerCase())
  .reduce((acc, el) => {
    acc[el] = (acc[el] || 0) + 1;
    return acc
  },{})
  
  let result;
  for (const [key, value] of Object.entries(dangerPlants)) {
    if (!result) result = key;
    if (value >  dangerPlants[result]) result = key
  }
  

  console.log(result);
  // END
}