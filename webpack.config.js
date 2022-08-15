const path = require('path');

module.exports = {
    mode: 'development',
    entry: './assets/app.js',
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [{
                        loader: 'style-loader', // inject CSS to page
                    }, {
                        loader: 'css-loader', // translates CSS into CommonJS modules
                    }, {
                        loader: 'postcss-loader', // Run postcss actions
                    }, {
                        loader: 'sass-loader' // compiles Sass to CSS
                }]
            },
        ],
  },
};