const express = require('express')
const path = require('path')
const proxy = require('http-proxy-middleware');

const app = express()

// proxy webpack assets requests in dev env
if(process.env.NODE_ENV === 'development') {
    app.use(['/dist/**', '/sockjs-node/**'], proxy({
        target: "http://localhost:8080",
        pathRewrite: {
            '^/dist' : '/',
        },
        ws: true
    }));
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.send('Express server is running'))

app.listen(3000, () => console.log('App running at http://localhost:3000'))
