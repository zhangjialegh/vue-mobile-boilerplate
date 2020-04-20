import {tokenName} from '~/plugins/config'

export default function({ app, redirect }, inject) {
  const gb = {
    setAccount (data) {
      const value = data[tokenName]
      app.$storage.setVal(tokenName, value)
      redirect('/')
    }
  }
  inject('gb',gb)
}