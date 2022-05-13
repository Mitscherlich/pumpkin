import { usePumpkinModels } from './pumpkin'

export const useDispatch = () => {
  const models = usePumpkinModels()

  const dispatch = ({ type, payload }: { type: string, payload?: any }) => {
    const paths = type.split('/')
    const action = paths.pop()
    const namespace = paths.join('/')

    const instance = models?.get(namespace)

    return instance[action!](payload)
  }

  return dispatch
}
