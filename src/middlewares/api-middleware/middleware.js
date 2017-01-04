import isPlainObject from 'lodash.isplainobject'

import RSAA from './RSAA'
import { isRSAA, validateRSAA } from './validation'
import { InvalidRSAA, RequestError, FetchError, ApiError } from './errors'
import { getJSON, normalizeTypeDescriptors, actionWith } from './util'
import timeout from '../../utils/timeout'

/**
 * A Redux middleware that processes RSAA actions.
 *
 * @type {ReduxMiddleware}
 * @access public
 */
function apiMiddleware({ getState }) {
  return (next) => async (action) => {
    // Do not process actions without an [RSAA] property
    if (!isRSAA(action)) {
      return next(action);
    }

    // Try to dispatch an error request FSA for invalid RSAAs
    const validationErrors = validateRSAA(action);
    if (validationErrors.length) {
      const callAPI = action[RSAA];
      if (callAPI.types && Array.isArray(callAPI.types)) {
        let requestType = callAPI.types[2];
        if (requestType && requestType.type) {
          requestType = requestType.type;
        }
        console.log(validationErrors)
        next(await actionWith({
          type: requestType,
          payload: new InvalidRSAA(validationErrors),
          error: true
        },
        [action, getState()]));
      }
      return;
    }

    // Parse the validated RSAA action
    const callAPI = action[RSAA];
    var { endpoint, headers } = callAPI;
    const { method, body, credentials, bailout, types } = callAPI;
    const [requestType, successType, failureType] = normalizeTypeDescriptors(types);

    // Should we bail out?
    try {
      if ((typeof bailout === 'boolean' && bailout) ||
          (typeof bailout === 'function' && bailout(getState()))) {
        return;
      }
    } catch (e) {
      return next(await actionWith(
        {
          ...failureType,
          payload: new RequestError('[RSAA].bailout function failed'),
          error: true
        },
        [action, getState()]
      ));
    }

    // Process [RSAA].endpoint function
    if (typeof endpoint === 'function') {
      try {
        endpoint = endpoint(getState());
      } catch (e) {
        return next(await actionWith(
          {
            ...failureType,
            payload: new RequestError('[RSAA].endpoint function failed'),
            error: true
          },
          [action, getState()]
        ));
      }
    }

    // Process [RSAA].headers function
    if (typeof headers === 'function') {
      try {
        headers = headers(getState());
      } catch (e) {
        return next(await actionWith(
          {
            ...failureType,
            payload: new RequestError('[RSAA].headers function failed'),
            error: true
          },
          [action, getState()]
        ));
      }
    }

    // Dispatch the request FSA
    next(await actionWith(
      requestType,
      [action, getState()]
    ));

    try {
      // API call
      var res = await timeout(fetch(endpoint, { method, body, credentials, headers }));
    } catch(e) {
      return next(await actionWith(
        {
          ...failureType, // was requestType in original code
          payload: new FetchError(e.message, (e.name === 'TimeoutError')), // TODO create actual TimeoutError
          error: true
        },
        [action, getState()]
      ));
    }

    // Process the server response
    // TODO deal with specific errors methodically
    //   token errors
    //   server not responding, is it online?
    if (res.ok) {
      return next(await actionWith(
        successType,
        [action, getState(), res]
      ));
    } else {
      return next(await actionWith(
        {
          ...failureType,
          error: true
        },
        [action, getState(), res]
      ));
    }
  }
}

export { apiMiddleware };