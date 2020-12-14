import Router from 'koa-router';
import * as mylogCtrl from './mylog.ctrl';

const mylog = new Router();

mylog.get('/getCorona',mylogCtrl.getCorona);

export default mylog;