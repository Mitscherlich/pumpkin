import type { App } from 'vue'
import type { DefineStoreOptions, Store } from 'pinia'

export interface IModelDefs<T, G = {}, A = {}> extends Omit<DefineStoreOptions<string, T, G, A>, 'id'> {
  namespace: string
}

export type IModel<T, G = {}, A = {}> = Store<string, T, G, A>

export interface Pumpkin {
  model<T, G = {}, A = {}>(modelDefs: IModelDefs<T, G, A>): IModel<T, G, A>
  unmodel(namespace: string): void
  replaceModel<T, G = {}, A = {}>(namespace: string, modelDefs: Omit<IModelDefs<T, G, A>, 'namespace'>): void
  use(plugin: Plugin, ...opts: any[]): App
  start(selector: string): App
}
