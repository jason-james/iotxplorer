# iotxplorer

[![CircleCI](https://circleci.com/gh/jason-james/iotxplorer.svg?style=shield)](https://circleci.com/gh/jason-james/iotxplorer)

Frontend website for [the IoTeX blockchain](https://github.com/iotexproject/iotex-core) and eventually the website for all things IoTeX.

Website is live at https://www.iotxplorer.io/

## Building locally

Prepare your environment variables like so:

```
cp ./.env.tmpl ./.env
```

The .env file should look something like this:

```.env
IOTEX_CORE_URL=http://YOUR-IP:14014
CHAINS=[{"id":1,"name":"mainchain","url":"http://localhost.io/","gatewayUrl":"https://localhost.io/"},{"id":2,"name":"subchain","url":"http://subchain.localhost.io/","gatewayUrl":"https://subchain.iotexslocalhostcan.io/"}]
```

Your IP has to be the IP of your IoTeX node and the node must be a gateway node. Alternatively you can use the IP of an IoTeX node operator/delegate with a public IP. For instructions on running your own node visit https://www.iotxplorer.io/education

Install nvm and npm

```
nvm install 10.14.2
npm install
```

To track changes during development (automatically re-runs on save):

`npm run watch`

The website will run in http://localhost:4004/

Due to the way the dependency and gulp scripts are written, you may have trouble running the above commands in Windows. MacOS and Linux are recommended. Easier Windows builds will be supported in future versions.

Contributions are welcome - feel free to submit pull requests.
