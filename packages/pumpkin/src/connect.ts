import { getActivePinia } from 'pinia'
import type { DefineComponent } from 'vue'
import { computed, defineComponent, h, unref } from 'vue'
import { useDispatch } from './dispatch'

export const connect = (mapToProps: (state: any) => any) => (Component: DefineComponent) => defineComponent((props) => {
  const { state } = getActivePinia() ?? {}
  const dispatch = useDispatch()
  const computedProps = computed(() => ({
    ...mapToProps(unref(state)),
    ...props,

    dispatch,
  }))

  return () => h(Component, computedProps.value)
})
