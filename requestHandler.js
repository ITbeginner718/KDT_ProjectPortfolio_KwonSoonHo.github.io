//URL Controller
//url 경로가 지정이 되었을 때 실행할 코드

//html 파일을 불러오는 코드 
const fs = require('fs');
//thml 파일 불러오기
const main_view = fs.readFileSync('./HTML/main.html', 'utf-8');
const orderList_view = fs.readFileSync('./HTML/orderList.html', 'utf-8');
const mariadb = require("./DB/connect/mariadb");

function main(response) {

    console.log('main');

    //db 데이터 불러와서 콘솔에 출력
    mariadb.query(`
        select * from product;
        `,
        // 람다식 함수
        function (err, rows) {
            console.log(rows);

        })

    //head : 200 코드일 때(정상일 때) 클라이언트에게 전달할 데이터 타입이 html인 것을 의미
    response.writeHead(200, { 'Content-Type': 'text/html' });
    //웹 페이지를 write()에 저장
    response.write(main_view);
    response.end();

}


function favicon() {
    console.log("브라우저가 자동으로 요청하는 경로");
}


function redRacket(response) {
    fs.readFile('./Public/Img/redRacket.png', function (err, data) {
        //head : 200 코드일 때(정상일 때) 클라이언트에게 전달할 데이터 타입이 html인 것을 의미
        response.writeHead(200, { 'Content-Type': 'text/html' });
        //웹 페이지를 write()에 저장
        response.write(data);
        response.end();
    })

}


function blueRacket(response) {
    fs.readFile('./Public/Img/blueRacket.png', function (err, data) {
        //head : 200 코드일 때(정상일 때) 클라이언트에게 전달할 데이터 타입이 html인 것을 의미
        response.writeHead(200, { 'Content-Type': 'text/html' });
        //웹 페이지를 write()에 저장
        response.write(data);
        response.end();
    })
}


function blackRacket(response) {
    fs.readFile('./Public/Img/blackRacket.png', function (err, data) {
        //head : 200 코드일 때(정상일 때) 클라이언트에게 전달할 데이터 타입이 html인 것을 의미
        response.writeHead(200, { 'Content-Type': 'text/html' });
        //웹 페이지를 write()에 저장
        response.write(data);
        response.end();
    })
}

function mainCSS(response) {
    fs.readFile('./Public/CSS/main.css', function (err, data) {
        //head : 200 코드일 때(정상일 때) 클라이언트에게 전달할 데이터 타입이 html인 것을 의미
        response.writeHead(200, { 'Content-Type': 'text/css' });
        //웹 페이지를 write()에 저장
        response.write(data);
        response.end();
    })
}

function orderListCSS(response) {
    fs.readFile('./Public/CSS/orderList.css', function (err, data) {
        //head : 200 코드일 때(정상일 때) 클라이언트에게 전달할 데이터 타입이 html인 것을 의미
        response.writeHead(200, { 'Content-Type': 'text/css' });
        //웹 페이지를 write()에 저장
        response.write(data);
        response.end();
    })
}

// 상품 주문
function order(response, productId) {
    //head : 200 코드일 때(정상일 때) 클라이언트에게 전달할 데이터 타입이 html인 것을 의미
    response.writeHead(200, { 'Content-Type': 'text/html' });
    //웹 페이지를 write()에 저장
    //페이지가 새로 연동
    //서버는 그 요청에 맞는 HTML(혹은 텍스트, JSON 등)을 응답
    // 브라우저는 그 응답을 받아서 기존 화면을 전부 교체함
    response.write('order page');

    console.log("productId:", productId);
    const date = new Date().toLocaleDateString();
    console.log("date:", date);

    mariadb.query(

        `INSERT INTO orderList VALUES (?, ?)`,
        [productId, date],
        function (err, rows) {
            if (err) {
                console.error("쿼리 에러:", err);
                return;
            }
            console.log("결과:", rows);
        }
    );

    response.end();
}

function orderList(response) {
    //head : 200 코드일 때(정상일 때) 클라이언트에게 전달할 데이터 타입이 html인 것을 의미
    response.writeHead(200, { 'Content-Type': 'text/html' });

    //웹 페이지를 write()에 저장
    //페이지가 새로 연동
    //서버는 그 요청에 맞는 HTML(혹은 텍스트, JSON 등)을 응답
    // 브라우저는 그 응답을 받아서 기존 화면을 전부 교체함

    response.write(orderList_view);

    mariadb.query(
        `select * from orderList;`,
        function (err, rows) {
            if (err) {
                console.error("쿼리 에러:", err);
                return;
            }
            console.log("orderlist:", rows);

            let orderListHtml_table = ``;

            rows.forEach(element => {
                orderListHtml_table += `<tr>`
                orderListHtml_table += `<td>${element.productId}</td>`;
                orderListHtml_table += `<td>${element.order_date}</td>`;
                orderListHtml_table += `</tr>`
            });

            const orderListHtmlEnd = `</table>`

            response.write(orderListHtml_table + orderListHtmlEnd);
            response.end();
        }
    )
}


const handle = {}; //key: value

// 루트 url (/)이 요청되면 main() 메소드가 실행
// 인자는 정의 부분에서만 작성하면 됨
handle['/'] = main;

// 상품
handle['/order'] = order;

//주문 정보
handle['/orderList'] = orderList;

//favicon.ico 브라우저가 탭 아이콘을 위해 자동으로 요청하는 경로
handle['/favicon.ico'] = favicon;

// CSS directory
handle['/Public/CSS/main.css'] = mainCSS;
handle['/Public/CSS/orderList.css'] = orderListCSS;

// Img directory
handle['/Public/Img/redRacket.png'] = redRacket;
handle['/Public/Img/blueRacket.png'] = blueRacket;
handle['/Public/Img/blackRacket.png'] = blackRacket;


// 간략하게 작성
/*
const handle = {
  "/": function() { console.log("main"); },
  "/about": function() { console.log("login"); }
  "/favicon.ico": function(){console.log("favicon");} 
};
*/

exports.handle = handle;



