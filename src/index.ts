import express from 'express';

interface InitializationOptions {
    delimiter?: string
}

const defaultInitializationOptions: Required<InitializationOptions> = {
    delimiter: '+'
}

declare global {
  namespace Express {
    interface Request {
      parsedParams: {
        [x: string]: any
      }
    }
  }
}

type initializor = (options: InitializationOptions) => express.Handler

const iterableRouteParamters: initializor = (customInitializationOptions) => (request, response, next) => {
    const initializationOptions: Required<InitializationOptions> = Object.assign({}, defaultInitializationOptions, customInitializationOptions)
    const parsedParams: express.Request['parsedParams'] = {}
    for (const param in request.params) {
        const delimiter = initializationOptions.delimiter
        const originalValue = request.params[param]
        if (originalValue.indexOf(initializationOptions.delimiter)) {
          parsedParams[param] = originalValue.split(delimiter)
        } else {
          parsedParams[param] = originalValue
        }
    }
    request.parsedParams = parsedParams
    next()
}

export default iterableRouteParamters