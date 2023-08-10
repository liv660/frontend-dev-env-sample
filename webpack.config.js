const path = require('path'); //node의 path 모듈을 사용한다.

module.exports = {
    mode: 'development',
    entry: {
        main: './src/app.js'
    },
    output: {
        path: path.resolve('./dist'), //path 모듈로 절대경로를 사용한다.
        filename: '[name].js' //entry에서 설정한 이름으로 동적할당 된다. 여기서는 main.js로 생성된다.
    }
}