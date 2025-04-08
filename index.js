// server 모듈화
// server.js를 모듈화하여 import 
// require() nodejs 모듈 뿐만 아니라 우리가 만든 파일도
// 모듈처럼 사용할 수 있음
const server = require('./server');

const router = require('./router');

const requestHandler = require('./requestHandler');

const mariadb = require('./DB/connect/mariadb');

// DB 연동 설정
mariadb.connect();

// 현재는 node js가 실행되는 순간 자동으로 http 서버가 구동
// 서버가 구동시키는 코드를 작성하여 node js 실행되지만
// 우리가 원할 때만 server를 실행시킬 수 있도록 설정 

//메소드를 인자로 사용이 가능 (route 메소드)
server.start(router.route, requestHandler.handle);

//URL(Uniform Resource Locater)
//인터넷 상에서 웹 페이지가 어디있는지 "위치"를 알려주는 주소

