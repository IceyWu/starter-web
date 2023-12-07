module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    "@babel/plugin-transform-nullish-coalescing-operator",
    "@babel/plugin-transform-object-rest-spread",
    "@babel/plugin-transform-optional-chaining",
  ]
}
