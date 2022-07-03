# cat-card-service

## Project setup

```
npm install
```

### Compile for development

```
npm run start:[ENV]

```

### Check Service Health

```
localhost:3600/api/health (Content-Type: application/json) (GET)
Sample Response:

{"env": "local", "status": "live", "timestamp": current_utc}

```
### Assumed that image data saved in a Mongo DB so we can retrieve the data and send to the blend function in the service layer