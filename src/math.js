//IIFE 사용
var math = math || {}; //math가 있으면 할당하고 없으면 빈 객체를 할당한다.

(function() {
    //함수 내 스코프가 생긴다.
    function sum(a, b) {
        return a + b;
    }
    //외부에서 사용할 수 있도록 전역 변수에 할당한다.
    math.sum = sum;
    
})()

//IIFE 적용 전
function sum(a, b) {
    return a + b
}