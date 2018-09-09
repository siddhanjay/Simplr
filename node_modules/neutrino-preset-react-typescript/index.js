const presetReact = require('neutrino-preset-react')
const TS_LOADER = require.resolve('ts-loader');

const typescriptMiddleware = (neutrino, opts = {}) => {
  const { config } = neutrino

  // Using the "compile" rule name will hook into neutrino-web-preset's babel configuration,
  // inheriting all the transpiling goodies.
  //
  // Otherwise, using the "compile-ts", ts-loader will be its own chain.
  let useBabel = !!opts.noBabelTranspile && process.env.NODE_ENV === "production"

  const ruleName = useBabel ? "compile" : "compile-ts"

  config.module
    .rule(ruleName)
    .test(/\.tsx?$/)
    .use('ts')
    .loader(TS_LOADER, {
      transpileOnly: true,
      happyPackMode: true,
    })

  config.resolve.extensions
    .add('.ts')
    .add('.tsx')
}


module.exports = (neutrino, opts = {}) => {
  neutrino.use(presetReact, opts)
  neutrino.use(typescriptMiddleware, {
    noBabelTranspile: opts.noBabelTranspile,
  })
}
