# Test XilioSoft

Hi this is my own solution to XilioSoft test. See it here [test](doc/test.pdf).

## Install

### Clone this repository

``` bash
git clone https://github.com/maikcodes/test-xiliosoft.git
```

### Install dependencies

Access to the project:

``` bash
cd test-xiliosoft
```

After cloning the repository, navigate to the project directory and install the required dependencies using the following command:

``` bash
npm install
```

### Configure fake api

Create a fake api using [json server](https://www.npmjs.com/package/json-server) and use this template to mock the data [db.json](doc/db.json).

### ⚠️ Important

Use a wifi connection and then publish your fake api using the next command:

``` bash
npx json-server --no-cors --host 0.0.0.0 --port 3001 --watch db.json
```

Go to [TaskServices.js](src/services/TaskServices.js) file and change baseUrl with your local ipv4 address (only change the ip). __Remember this is a demo only, if you are developing an app remember always use environment variables and other practices to keep sensitive info safe.__

### Run the app

``` bash
npx expo start
```

The above command execute this app with Expo, this cerates a QR code to scan with the Expo app. Scan it! and there you have it.

### Give me a star

If you find this demo project helpful or interesting, consider leaving a star to show your support!
