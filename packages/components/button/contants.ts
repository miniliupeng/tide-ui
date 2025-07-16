import type { InjectionKey } from 'vue'
import type { ButtonGroupContext } from './types/button-group'

export const BUTTON_GROUP_CTX_KEY: InjectionKey<ButtonGroupContext> = Symbol('buttonGroupContex')
