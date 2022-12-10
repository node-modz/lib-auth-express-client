# lib-auth-express-client

How to use this package:

**Step 1:**  Install Package

```
$ npm install @node-modz/lib-auth-express-client
```

**Step 2:** Use package with Expressjs

```
import express from 'express'
import Logger from '@node-modz/lib-auth-express-client';

cost app = express();
cost config= {
    url: "app.use(Authorizer({url: "http://<identity-server-host>/oauth2/verify"}))", // identity server host url
    headers: {'Content-Type': 'application/x-www-form-urlencoded'} //any hearder required by you identity server
}
app.use(Authorizer(config))

```




