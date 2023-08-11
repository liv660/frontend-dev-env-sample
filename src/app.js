//using webpack
import {sum} from './math.js';

//webpack의 로더를 사용하면 css 모듈을 자바스크립 코드 안에서 사용할 수 있다.
import './app.css';
import nyacat from './nyancat.jpg';

document.addEventListener('DOMContentLoaded', () => {
    document.body.innerHTML = `<img src="${nyacat}" />`
})

console.log(sum(1, 2));