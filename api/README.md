# Requirements

Needed in env.yml config file:

```yaml
server:
  port: <port number>

database:
  string: <mongodb connection string>

session:
  key: <session hash key>

origins: 
  - <origin 1>
  - <origin 2>
  - ...
```

## Database

Dockerfile contains info pertaining to MongoDB instance.
