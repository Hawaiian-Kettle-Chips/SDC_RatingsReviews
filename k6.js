import http from 'k6/http';
import { sleep } from 'k6';
import {htmlReport} from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
export const options = {
  // vus: 10,
  // duration: '30s',
  // stages: [
  //   {duration: '2m', target: 100},
  //   {duration: '5m', target: 100},
  //   {duration: '2m', target: 200},
  //   {duration: '5m', target: 200},
  //   {duration: '2m', target: 300},
  //   {duration: '5m', target: 300},
  //   {duration: '2m', target: 400},
  //   {duration: '5m', target: 500},
  //   {duration: '10m', target: 0},
  // ]
  stages: [
    { duration: '30s', target: 10 },
    { duration: '30s', target: 150 },
    { duration: '30s', target: 10},
  ],
};

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function () {
  let randomID = String(getRandomIntInclusive(1, 1000011))
  http.get('http://localhost:8080/getReview', {product_id: randomID});
  sleep(1);
}

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  }
}