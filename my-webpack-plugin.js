//플러그인은 class 형태로 작성한다.
class MyWebpackPlugin {
    apply(compiler) {
        // compiler.hooks.done.tap('My Plugin', stats => {
        //     console.log('MyPlugin: done');
        // })

        //webpack 내장 플러그인 BannerPlugin 참고
        compiler.hooks.emit.tapAsync('My Plugin', (compilation, callback) => {
            const source = compilation.assets['main.js'].source();
            console.log(
                '/**\n',
                ' * 이것은 Banner Plugin이 처리한 결과입니다.\n', 
                ' * Build Date: 2023-08-16\n',
                ' */\n',
                source
            );
            callback();
        })
    }
}

module.exports = MyWebpackPlugin;