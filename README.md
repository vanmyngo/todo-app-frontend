# Todo App
 
A simple CRUD to-do app built on AWS, using only always-free tier services.<br/>
Prod URL: https://d3983hh5nndqkk.cloudfront.net
 
## Tech Stack
 
### Backend
- AWS Lambda (Node.js 24, TypeScript, bundled with esbuild)
- Amazon API Gateway (REST API)
- Amazon DynamoDB (single table, on-demand billing)
- AWS SAM (infrastructure as code)
### Frontend
- React
- Hosted on S3 + CloudFront
### Auth
- Amazon Cognito
## MVP Features
 
- Create a to-do
- List all to-dos
- Get a single to-do by id
- Update a to-do (edit text or mark complete)
- Delete a to-do
- Public API reachable over HTTPS
- User accounts and login (Cognito)
## Future Features
 
- Per-user private to-do lists
- Due dates and priority levels
 
## Deploy
S3 and CloudFront as already been setup. <br/>
To update new changes to S3
1. Rebuild REACT app
```
cd <project-root>
npm run build
```
2. Upload dist folder's contents to S3

