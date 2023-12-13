module.exports = {
  compact: true,
  plugins: [
    "styled-jsx/babel",
    [
      "babel-plugin-styled-components",
      {
        minify: true,
        transpileTemplateLiterals: false,
      },
    ],
  ],
  presets: ["@babel/preset-typescript", "@babel/react"],
}
