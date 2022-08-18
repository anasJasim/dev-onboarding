import {idGeneratorService} from '../application/idGeneratorService';

function idGeneratorAdapter() {
  return Math.floor(Math.random() * 10000000000000).toString();
}
export function getRandomInt(max: number = Number.MAX_VALUE) {
  return Math.floor(Math.random() * max);
}
export default idGeneratorAdapter as idGeneratorService;
