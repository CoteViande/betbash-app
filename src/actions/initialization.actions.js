export const initializationComplete = () => ({
  type: 'INITIALIZATION_COMPLETE',
})

export const profileCompleted = () => ({
  type: 'INITIALIZATION_PROFILE_COMPLETE',
})

export const profileIsNotComplete = () => ({
  type: 'INITIALIZATION_PROFILE_NOT_COMPLETE',
})

export const connectedToInternet = () => ({
  type: 'INITIALIZATION_CONNECTED_TO_INTERNET',
})

export const connectedToServer = () => ({
  type: 'INITIALIZATION_CONNECTED_TO_SERVER',
})

export const tokenRefreshed = () => ({
  type: 'INITIALIZATION_TOKEN_REFRESHED',
})

export const initializationCleanup = () => ({
  type: 'INITIALIZATION_CLEANUP',
})