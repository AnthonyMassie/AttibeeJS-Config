# AttibeeJS Config

Used to create flexible configuration of classes including support for default
values.

## Installation

`npm install @attibee/config`

## Usage

```javascript
import {default as Config} from '@attibee/config'

var myConfig = new Config();

//if no value is set for foo, the default is bar
myConfig.setDefaults({
    'foo': 'bar'
});

//outputs 'bar'
myConfig.getConfig('foo');

//set config key 'foo' to 'boo'
myConfig.setConfig('foo', 'boo');

//outputs 'boo'
myConfig.getConfig('foo');
```