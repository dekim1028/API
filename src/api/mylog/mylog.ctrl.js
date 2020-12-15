import xml2js from 'xml2js';
import request from 'request-promise-native';
import moment from 'moment';

/*
    GET /api/mylog/getCorona
*/
export const getCorona = async ctx =>{
    const apiURL = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson';
    var queryParams = '?' + encodeURIComponent('ServiceKey') + '=MH4N1%2Bb5X9dVEx3Wl7wRhT81Q41sSvnKaHgKcK3AbSVTQxbMm5KdYiFDNZD7xnTy9lnZuVwVaG%2FBDNdspFRLtg%3D%3D'; /* Service Key*/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* */
    queryParams += '&' + encodeURIComponent('startCreateDt') + '=' + encodeURIComponent(moment().add(-7, 'd').format('YYYYMMDD')); /* 7일 전 날짜 */
    queryParams += '&' + encodeURIComponent('endCreateDt') + '=' + encodeURIComponent(moment().format('YYYYMMDD')); /* 오늘날짜 */

    const url = new URL(apiURL+queryParams);

    try{
        let coronaData = null;
        await request({
            url,
            method: 'GET'
        }).then((value)=>{
            xml2js.parseString(value,function(err,result){
                coronaData = result.response.body[0].items[0].item;
            });
        });

        ctx.body=coronaData;
    }catch(e){
        ctx.throw(500,e);
    }
};