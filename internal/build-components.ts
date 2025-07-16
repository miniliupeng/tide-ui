import fs from 'node:fs'
import { rollup } from 'rollup'
// 这个插件让 Rollup 能够理解和处理 .vue 单文件组件。
import vue from '@vitejs/plugin-vue'
// 这个插件让 Rollup 支持在 Vue 中使用 JSX 语法。
import vueJsx from '@vitejs/plugin-vue-jsx'
// 这个插件教 Rollup 如何在 node_modules 文件夹里查找第三方库。
import { nodeResolve } from '@rollup/plugin-node-resolve'
// 这个插件将 CommonJS 格式的模块 (使用 require/module.exports) 转换成 Rollup 能理解的 ES6 模块格式。
import commonjs from '@rollup/plugin-commonjs'
// 这个插件使用 'esbuild' 来快速地将 TypeScript 代码转换成 JavaScript。
import esbuild from 'rollup-plugin-esbuild'
// 导入一个快速查找文件的库，可以用通配符来匹配文件路径。
import glob from 'fast-glob'
import type { OutputOptions } from 'rollup'
import { resolvePackagePath } from './util'

// 告诉 Rollup 哪些库是“外部的”，不需要被打包进组件代码里
const getExternal = async (pkgDirName: string) => {
  const pkgPath = resolvePackagePath(pkgDirName, 'package.json')
  const manifest = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  const { dependencies = {}, peerDependencies = {}, devDependencies = {} } = manifest
  const deps: string[] = [
    ...new Set([
      ...Object.keys(dependencies),
      ...Object.keys(peerDependencies),
      ...Object.keys(devDependencies),
    ]),
  ]
  return (id: string) => {
    // if (id.endsWith('.css')) {
    //   return true
    // }
    return deps.some((pkg) => id === pkg || id.startsWith(`${pkg}/`))
  }
}

const build = async (pkgDirName: string) => {
  const pkgDistPath = resolvePackagePath(pkgDirName, 'dist')
  if (fs.existsSync(pkgDistPath) && fs.statSync(pkgDistPath).isDirectory()) {
    fs.rmSync(pkgDistPath, { recursive: true }) // { recursive: true } 表示删除整个文件夹及其所有内容。
  }

  const input = await glob(['**/*.{js,jsx,ts,tsx,vue}', '!node_modules'], {
    cwd: resolvePackagePath /* pkgDirName */(),
    /* , 'src' */
    absolute: true,
    onlyFiles: true,
  })

  const bundle = await rollup({
    input,
    plugins: [
      vue(),
      vueJsx(),
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts'],
      }),
      commonjs(),
      esbuild({
        sourceMap: true,
        target: 'es2015',
        loaders: {
          '.vue': 'ts',
        },
      }),
    ],
    external: await getExternal(pkgDirName),
    treeshake: false,
  })

  const options: OutputOptions[] = [
    {
      format: 'cjs',
      dir: resolvePackagePath(pkgDirName, 'dist', 'cjs'),
      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: resolvePackagePath(pkgDirName, 'src'),
      sourcemap: true,
      entryFileNames: '[name].cjs',
    },
    {
      format: 'esm',
      dir: resolvePackagePath(pkgDirName, 'dist', 'esm'),
      exports: undefined,
      preserveModules: true,
      preserveModulesRoot: resolvePackagePath(pkgDirName),
      sourcemap: true,
      entryFileNames: '[name].mjs',
    },
  ]
  return Promise.all(options.map((option) => bundle.write(option)))
}

console.log('[TS] 开始编译所有子模块···')
await build('core')
// await build('business')
console.log('[TS] 编译所有子模块成功！')
