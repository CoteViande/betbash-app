const timeoutPromise = (ms, promise, message) => {
  if (typeof ms !== 'number') {
    promise = ms;
    ms = 5000;
  }
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error(message || "Request timed out"))
    }, ms);
    promise.then(
      (res) => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      (err) => {
        clearTimeout(timeoutId);
        reject(err);
      }
    );
  })
}

export default timeoutPromise;