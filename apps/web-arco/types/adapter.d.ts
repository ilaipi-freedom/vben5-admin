declare module '#/adapter/arco' {
  import type { Message, Modal, Notification } from '@arco-design/web-vue'
  export const message: typeof Message
  export const modal: typeof Modal
  export const notification: typeof Notification
  export const dialog: typeof Modal
} 
