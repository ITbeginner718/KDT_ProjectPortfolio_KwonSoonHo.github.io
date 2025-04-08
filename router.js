

function route(pathname, handle, response, productId) {
    console.log("pathname: ", pathname);

    // 잘못된 url이 접근 시 url에 해당하는 함수가 존재하지 않음 => handle[]타입이 함수가 아님

    if (typeof handle[pathname] === 'function') {
        // url 경로값 삽입
        // JS 객체 속성 접근 + 함수 호출
        // response handler에서 진행하기 위해 전달  
        handle[pathname](response, productId); // 호출!
    }

    else {
        // 만약 잘못된 url이 들어오면 예외 처리ㄴㄴ
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.write('Not Found');
        console.log("404 - No URL", pathname);
    }

}

exports.route = route;
