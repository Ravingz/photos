const path = require('path');

module.exports = {
  entry: path.join(__dirname, '/client/src/index.jsx'),
  module: {
    rules: [
        {
          test: /\.css$/,
          loader: 'style-loader',
        },
        {
          test: /\.css$/,
          loader: 'css-loader',
          query: {
            modules: true,
          },
        },
          {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/public'),
  },
};


// {
//   test: [/\.jsx$/],
//   exclude: /node_modules/,
//   use: {
//     loader: 'babel-loader',
//     options: {
//       presets: ['@babel/preset-react', '@babel/preset-env'],
//     },
//   },
// },

// /\.(png|jp(e*)g|svg|gif|jsx)$/