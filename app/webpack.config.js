module.exports = {
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.m?(j|t)sx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
