require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';

import api from './api';

//비구조화 할당을 통해 process.env 내부 값에 대한 레퍼런스 만들기
const {PORT} = process.env;

const app = new Koa();
const router = new Router();

router.use('/api',api.routes()); //api 라우터 적용

//app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

//PORT가 지정되어 있지 않다면 4001을 사용
const port = PORT || 4000;
app.listen(port,()=>{
    console.log('Listening to port %d',port);
})