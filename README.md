<h2>It's Alive!</h2>
<h4>Simple network resource monitor with Geo-visualization</h4>
<p>Uses system ping to check if an IPv4 address is on line in the background while serving a webapp for viewing and managing data</p>

![screenshot](https://raw.github.com/wsimmerson/itsAlive/master/public/images/screenshot.png)

<p>requires a config/config.json file a la sequelize for db config. e.g. </p>

```
{
  "development": {
    "storage": "dev.db",
    "dialect": "sqlite"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```
