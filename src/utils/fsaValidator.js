import isPlainObject from 'lodash.isplainobject'

const isFSA = action => (
  isPlainObject(action)
  && (typeof action.type === 'string' || typeof action.type === 'symbol')
  && Object.keys(action).every(isValidKey)
)

const isApiFSA = action => (
  isFSA(action)
  && action.meta
  && action.meta.hasOwnProperty('callApi')
)

const isRequestFSA = action => (
  isApiFSA(action)
  && action.type.endsWith('REQUEST')
)

const isSuccessFSA = action => (
  isApiFSA(action)
  && action.type.endsWith('SUCCESS')
)

const isFailureFSA = action => (
  isApiFSA(action)
  && action.type.endsWith('FAILURE')
)

const isAnalyticsFSA = action => (
  isFSA(action)
  && action.meta
  && action.meta.hasOwnProperty('analytics')
)

const isValidKey = key => ['type', 'payload', 'error', 'meta'].indexOf(key) > -1

export { isFSA, isApiFSA, isRequestFSA, isSuccessFSA, isFailureFSA, isAnalyticsFSA }