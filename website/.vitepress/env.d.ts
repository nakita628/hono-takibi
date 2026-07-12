declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

declare module '*.css'

declare module '*?worker' {
  const WorkerFactory: new () => Worker
  export default WorkerFactory
}
