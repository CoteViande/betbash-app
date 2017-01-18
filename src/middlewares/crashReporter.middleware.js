const crashReporterMiddleware = store => next => action => {
  try {
    return next(action)
  } catch (error) {
    console.log('CRASH REPORTER JAVASCRIPT MIDDLEARE ERROR')
    console.log('// ACTION: ', action, ' // STATE: ', store.getState())
    throw error
  }
}

export default crashReporterMiddleware