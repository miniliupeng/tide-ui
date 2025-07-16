import Button from './src/button.vue'
import ButtonGroup from './src/button-group.vue'
import { withInstall } from '@tide-element/utils'

export const TiButton = withInstall(Button)
export const TiButtonGroup = withInstall(ButtonGroup)

export default TiButton

export * from './types/button'
export * from './types/button-group'
