import type { App, Plugin } from 'vue'
import { each } from 'lodash-es'

type SFCWithInstall<T> = T & Plugin

export function makeInstaller(components: Plugin[]) {
  const install = (app: App) => each(components, (component) => app.use(component))
  return install
}

export function withInstall<T>(component: T) {
  ;(component as SFCWithInstall<T>).install = (app: App) => {
    const name = (component as any).name || 'UnnamedTideElement'
    app.component(name, component as SFCWithInstall<T>)
  }
  return component as SFCWithInstall<T>
}
