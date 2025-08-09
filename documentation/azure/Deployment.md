### Step 1 - Configure a Deployment User

- Run the az webapp deployment user set command

az webapp deployment us

### Step 2 - Configure an existing app

#### Example

az webapp deployment source config-local-git --name gregwiley-dev --resource-group Web-Apps

https://gcwiley@gregwiley-dev.scm.azurewebsites.net/gregwiley-dev.git

### Step 3 - Deploy the web app

git remote add azure https://gcwiley@gregwiley-dev.scm.azurewebsites.net/gregwiley-dev.git