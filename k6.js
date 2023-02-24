import http from 'k6/http';
import {check, sleep } from 'k6';
import {htmlReport} from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
export const options = {
  // vus: 10,
  // duration: '30s',
  stages: [
    // {duration: '1m', target: 300},
    // {duration: '1m', target:1000},
    {duration: '1m', target: 1800},
    {duration: '5m', target: 2000},
    {duration: '3m', target: 3000}

    // {duration: '15s', target: 200},
    // {duration:'15s', target: 00},
    // {duration: '15s', target: 0}
  ]
  // thresholds: {
  //   http_req_duration: [{threshold: 'p(95) < 100000', abortOnFail:true}],
  //   http_req_failed: ['rate <= 0.01']
  // }
  // stages: [
  //   { duration: '30s', target: 1000 }
  //   // { duration: '30s', target: 150 },
  //   // { duration: '30s', target: 10},
  // ],
  // stages: [
  //   { duration: '30s', target: 50 },  // Ramp up from 0 to 50 VUs over 1 minute
  //   { duration: '30s', target: 50 },  // Stay at 50 VUs for 2 minutes
  //   { duration: '30s', target: 100 },  // Ramp up from 50 to 100 VUs over 1 minute
  //   { duration: '30s', target: 100 },  // Stay at 100 VUs for 2 minutes
  //   { duration: '30s', target: 150 },  // Ramp up from 100 to 150 VUs over 1 minute
  //   { duration: '30s', target: 150 },  // Stay at 150 VUs for 2 minutes
  //   { duration: '30s', target: 200 },  // Ramp up from 150 to 200 VUs over 1 minute
  //   { duration: '30s', target: 200 },  // Stay at 200 VUs for 2 minutes
  //   { duration: '30s', target: 0 },  // Ramp down from 200 to 0 VUs over 1 minute
  // ],
};

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function () {
  let randomID = String(getRandomIntInclusive(950000, 1000011))
  let res1 = http.get('http://35.91.194.135:8080/getReview', {product_id: randomID});
  // let res2 = http.get('http://localhost:8080/getMeta', {product_id: randomID})
  check(res1, {'status was 200': r => r.status == 200})
  // check(res2, {'status was 200': r => r.status == 200})
  // sleep(1);
}

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  }
}