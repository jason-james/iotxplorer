
# iotxplorer

Frontend website for [the iotex blockchain](https://github.com/iotexproject/iotex-core) and eventually the website for all things IoTeX.

Website is live at http://www.iotxplorer.io


## Contributing to development

Prepare the environment variables...

```
cp ./.env.tmpl ./.env
```
The .env file should look something like this:

```.env
IOTEX_CORE_URL=http://YOUR-IP:30100
IOTEX_WALLET_URL=35.247.78.183:30500
CHAINS=[{"id":1,"name":"mainchain","url":"http://localhost.io/","gatewayUrl":"https://localhost.io/"},{"id":2,"name":"subchain","url":"http://subchain.localhost.io/","gatewayUrl":"https://subchain.iotexslocalhostcan.io/"}]
```
Install nvm and npm

```
nvm install 10.14.2
npm install

# to track changes during development:
npm run watch
# the website runs in http://localhost:4004/

# testing:
npm run test
```

[inferno-test-utils](https://www.npmjs.com/package/inferno-test-utils/v/3.10.1) is used for the tests.

Due to the way the dependency and gulp scripts are written, you may have trouble running the above commands in Windows - MacOS and Linux are recommended.
