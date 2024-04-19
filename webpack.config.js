const { extensions } = require('interpret');
const path = require('path');

module.exports = { 
    mode: 'development',
    entry: {
      bundle: path.resolve(__dirname, 'src/index.js'),
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
      static: {
        directory: path.resolve(__dirname,'dist')
      },
      port: 3000,
      open: true,
      hot: true,
      compress: true,
      historyApiFallback: true,
    },
    module: {
        rules: [
            {
              test: /\.css$/i,
              use: ['style-loader', 'css-loader'],
            },
            {
            test: /\.(?:js|mjs|cjs)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: "defaults" }]
                ]
              }
            }
          }
        ],
    },
    resolve: {
        alias: {
          config$: './configs-app-config.js',
          react: './vendor/react-master',
        },
        extensions: ['.js', '.jsx'],
        modules: [
          'node_modules',
          'bower_components',
          'shared',
          '/shared/vendor/modules',
        ],
    },
};