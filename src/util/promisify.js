const promisify = (func) => (
    (params) => (
        new Promise((resolve, reject) => {
            func.call(null, params, (err, data) => {
                if(err !== null) return reject(err);
                resolve(data);
            });
        })
    )
)

export default promisify