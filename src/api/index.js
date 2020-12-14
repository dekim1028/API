import Router from 'koa-router';
import mylog from './mylog';

const api = new Router();

api.use('/mylog',mylog.routes());

//라우터를 내보냅니다.
export default api;