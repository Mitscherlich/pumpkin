# pumpkin

🎃 A SHIELD for [pinia](https://github.com/vuejs/pinia) & [Vue3](https://github.com/vuejs/core).

## Install

via npm, yarn or pnpm:

```bash
$ npm install --save @m9ch/pumpkin
# or yarn
$ yarn add @m9ch/pumpkin
# or pnpm
$ pnpm add @m9ch/pumpkin
```

## Usage

1. create a pumpkin instance:

```js
import { createPumpkin } from '@m9ch/pumpkin'
import App from './App.vue'

const app = createPumpkin(App)
```

2. define a model and mount it to the app:

```js
const base = {
  namespace: 'base',
  state: () => ({
    msg: 'hello world',
  }),
  actions: {
    updateMsg (msg) {
      this.msg = msg
    },
  },
}

// mount the model to the app
app.model(base)
```

3. connect it to a component:

```jsx
const App = (props) => {
  return () => <h3>{props.msg}</h3>
}

const mapToProps = ({ base }) => ({
  msg: base.msg,
})

export default connect(mapToProps)(App)
```

4. start the app!

```js
app.start('#app')
```

checkout more details in [./examples](./examples).

---

made with :heart: by [Mitscherlich](https://githuh.com/Mitscherlich)
