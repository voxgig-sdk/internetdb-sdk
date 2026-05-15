
import { Context } from './Context'


class InternetdbError extends Error {

  isInternetdbError = true

  sdk = 'Internetdb'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  InternetdbError
}

