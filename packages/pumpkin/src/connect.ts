import { getActivePinia } from 'pinia'
import type { DefineComponent as ComponentType, SetupContext } from 'vue'
import { h, unref } from 'vue'
import { useDispatch } from './dispatch'

export type Action<T, S = any> = (state: S) => T

export function connect<T = unknown>(mapToProps: Action<T>) {
  return <P = any>(Component: ComponentType<P>) => function (props: P, context: SetupContext) {
    const { state } = getActivePinia() ?? {}
    const dispatch = useDispatch()

    const componentProps = {
      ...mapToProps(unref(state)),
      ...props,
    }

    return h(Component, { ...componentProps, dispatch }, context.slots)
  }
}
