import type { Component, InjectionKey, Plugin } from 'vue'
import { createApp, inject } from 'vue'
import type { StateTree } from 'pinia'
import { createPinia, defineStore as defineModel } from 'pinia'
import type { IModel, IModelDefs } from './types'

export const __pumpkin_model_key__: InjectionKey<Map<string, IModel<any>>> = Symbol('pumpkin#model')

export const createPumpkin = (App: Component) => {
  const pinia = createPinia()
  const app = createApp(App).use(pinia)

  const models = new Map<string, IModel<any>>()

  app.provide(__pumpkin_model_key__, models)

  const model = <S extends StateTree = any, G = {}, A = {}>({ namespace, ...modelDefs }: IModelDefs<S, G, A>): IModel<S, G, A> => {
    if (models.has(namespace)) {
      if (process.env.NODE_ENV === 'development')
        console.warn(`[🎃 pumpkin] model ${namespace} is already exist. If you'd like to replace it, please use 'replaceModel' instead.`)

      return models.get(namespace)
    }

    const useModel = defineModel(namespace, modelDefs)

    const instance = useModel()

    if (!models.has(namespace))
      models.set(namespace, instance)

    return instance as IModel<S, G, A>
  }

  const unmodel = (namespace: string) => {
    if (!models.has(namespace)) {
      if (process.env.NODE_ENV === 'development')
        console.warn(`[🎃 pumpkin] model ${namespace} is not exist.`)

      return
    }

    const instance = models.get(namespace)

    if (instance)
      instance.$dispose()

    models.delete(namespace)
  }

  const replaceModel = <S extends StateTree = any, G = {}, A = {}>(namespace: string, modelDefs: Omit<IModelDefs<S, G, A>, 'namespace'>) => {
    unmodel(namespace)
    model({ namespace, ...modelDefs })
  }

  const use = (plugin: Plugin, ...opts: any[]) => {
    return app.use(plugin, ...opts)
  }

  const start = (selector: string) => {
    return app.mount(selector)
  }

  return {
    // model
    model,
    unmodel,
    replaceModel,

    // app
    use,
    start,
  }
}

export const usePumpkinModels = () => {
  return inject(__pumpkin_model_key__, null)
}
