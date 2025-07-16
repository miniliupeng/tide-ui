import { makeInstaller } from '@tide-element/utils'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import components from './components'
// import '@tide-element/theme/index.css'

library.add(fas)
const installer = makeInstaller(components)

export * from '@tide-element/components'

export default installer
