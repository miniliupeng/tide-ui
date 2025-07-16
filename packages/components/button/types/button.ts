import type { Component, useTemplateRef } from 'vue'

export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

export type NativeType = 'button' | 'submit' | 'reset'

export type ButtonSize = 'small' | 'default' | 'large'

export interface ButtonProps {
  tag?: string | Component
  type?: ButtonType
  size?: ButtonSize
  nativeType?: NativeType
  loading?: boolean
  disabled?: boolean
  icon?: string
  circle?: boolean
  round?: boolean
  plain?: boolean
  loadingIcon?: string
  autofocus?: boolean
  useThrottle?: boolean
  throttleDuration?: number
  click?: (e: MouseEvent) => void
}

export interface ButtonEmits {
  (e: 'click', event: MouseEvent): void
}

export interface ButtonInstance {
  ref: ReturnType<typeof useTemplateRef<HTMLButtonElement>>
}
