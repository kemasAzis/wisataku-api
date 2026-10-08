import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 50,          // 50 pengguna virtual mengakses bersamaan
  duration: '30s',
};

export default function () {
  const res = http.get('http://localhost:3000/destinasi');
  check(res, { 'status 200': (r) => r.status === 200 });
  sleep(1);
}