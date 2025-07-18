import type { FontAwesomeIconProps } from '@fortawesome/vue-fontawesome'

export interface IconProps extends FontAwesomeIconProps {
  type?: 'primary' | 'success' | 'danger' | 'warning' | 'info'
  color?: string
}
