// http 프로토콜 설정
// require:Node.js의 다양한 모듈을 사용할 수 있게 해주는 메소드
// http를 사용할 수 있는 모듈을 불러온 것
const http = require('http');

// url 모듈 import
const url = require('url');


const PORT = 8888;

//HTTP 프로토콜 템플릿
//head
/*
통신 상태 정보를 가지고 있음
200: 정상
404: 클라이언트에서 요청한 url이 서버에 존재하지 않음
500: 서버 자체에 문제
 */

//body
/*
클라이언트에게 전달할 데이터
 */


//Server 주소 localhost:8888

//포트 번호(port number)
//CS 대화를 하기위한 무전기 주파수 같은 것

function start(route, handle) {
    console.log(`Server is Listening for ${PORT}`);
    // request, response 매개변수 값은 Node.js에서 자동으로 넘겨줌 
    // onRequest:클라이언트에게 요청이 왔을 때 처리하는 것을 의미 
    function onRequest(request, response) {

        // 클라이언트에서 요청받은 url 받아오기
        // const pathname = url.parse(request.url).pathname;
        const pathname = new URL(request.url, 'http://localhost:8888').pathname;

        // 버튼이 클릭되면 해당 변수값을 던져준다???? 
        const queryData = url.parse(request.url, true).query;

        console.log("queryData.productId:", queryData.productId);

        // index 파일에서 route 메소드를 받아서 사용
        // index 파일에서 handle 메소드를 받아서 사용
        // response를 handler에 전달
        route(pathname, handle, response, queryData.productId);
    }

    // server 생성(우리가 만든 함수를 가지고 서버를 실행)
    http.createServer(
        // 설정한 서버 실행
        onRequest
    ).listen(PORT);//port 번호 설정
}


// 다른 파일에서도 start 함수를 start라는 이름으로 사용할 수 있게 설정
exports.start = start;

/*
exports 설정을 하지 않으면 다른 파일에서 start 함수를 쓸 때 다음과 같은 에러 발생
 server.start is not a function
 */