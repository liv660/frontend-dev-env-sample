module.exports = {
    presets: [
        ['@babel/preset-env', {
            targets: {
                chrome: '79',
                ie: '11'
            },
            //promise 객체 폴리필
            useBuiltIns: 'usage',
            corejs: {
                version: 3
            },
        }],
        // './my-babel-preset.js'
    ]
    // plugins: [
    //     '@babel/plugin-transform-block-scoping',
    //     '@babel/plugin-transform-arrow-functions',
    //     '@babel/plugin-transform-strict-mode'
    // ]
}