// import autoprefixer from 'autoprefixer'
import postcssNested from 'postcss-nested'
import postcssEach from 'postcss-each'
import postcssEachVariables from 'postcss-each-variables'
import postcssFor from 'postcss-for'
import postcssColorMix from 'postcss-color-mix'

export default {
  plugins: [
    /* autoprefixer() */
    postcssNested(),
    postcssEachVariables(),
    postcssEach({
      plugins: {
        beforeEach: [postcssFor(), postcssColorMix()],
      },
    }),
    // cssnano({ preset: 'default' }),
  ],
}
