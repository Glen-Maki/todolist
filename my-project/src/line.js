const line_notify_token = "S34eZYHJy8NemqQ3BZkiEjh9M6ZZYBA8EJXChYyB0Og";
const axios = require('axios');
const qs = require('qs');

const Line = function () {};
/**
 * LINE Notify実行
 * @param {String} text メッセージ
 */
Line.prototype.notify = function(text) {
  if(line_notify_token == undefined || line_notify_token == null){
    console.error('undefined token.');
    return;
  }
  console.log(`notify message : ${text}`);
  axios(
    {
      method: 'post',
      url: 'https://notify-api.line.me/api/notify',
      headers: {
        Authorization: `Bearer ${line_notify_token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        message: text,
      }),
    }
  )
  .then( function(res) {
    console.log(res.data);
  })
  .catch( function(err) {
    console.error(err);
  });
}; 

module.exports = Line;
