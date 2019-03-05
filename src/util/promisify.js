// assumes that the second parameter is the callback fn
const promisify = func => (
  params => (
    new Promise((resolve, reject) => {
      func.call(null, params, (err, data) => {
        if (err !== null) return reject(err);
        resolve(data);
        return undefined;
      });
    })
  )
);

export default promisify;
