# Local Git deployment to Azure App Service

This how-to guide shows you how to deploy your app to Azure App Service from a Git repository on your local computer.

## Prerequisites

To follow the steps in this how-to guide:

* If you don't have an **Azure subscription**, create a free account before you begin.
* Install Git - Add Link!
* Have a local Git repository with code you want to deploy.

## Prepare your repository

To get automatic builds from Azure App Service Kudu build server, make sure that your repository root has the correct files in your project

* Node.js - `server.js`, `app.js` or `package.json` with a start script.

## Deploy with Kudu build server

The easiest way to enable local Git deployment for your app with the Kudu App Service build server is to use Azure Cloud Shell.

## Configure a deployment user

FTP and local Git can deploy to an Azure web app by using a __deployment__ user. Once you configure your deployment user, you can use it for all your Azure deployments. Your account-level deployment `username` and `password` are diffent from your Azure subscription credentials.

To configure the deployment user, run the `az webapp deployment user set` command in Azure Cloud Shell. Replace `<username>`and `<password>` with a deployment user username and password.
* The username must be unique within Azure, and for local Git pushes, must not contain the `@` symbol.
* The password must be at least eight characters long, with two of the following three elements: letters, numbers, and symbols.
```sh
az webapp deployment user set --user-name <username> --password <password>
```
The JSON output shows the password as `null`. If you get a `'Conflict'. Details: 409` error, change the username. If you get a `'Bad Request'.Details: 400` error, use a strong password.

Record your username and password to use to deploy your web apps.

#### Get the Deployment URL

To get the URL to enable local Git deployment for an existing app, run `az webapp deployment source config-local-git` in the Cloud Shell. Replace `<app-name>` and `<group-name>` with the names of the your app and its Azure resource group.
```sh
az webapp deployment source config-local-git --name <app-name> --resource-group <group-name>
```
Or, to create a new Git-enabled app, run `az webapp create` in the Cloud Shell with the `--deployment-local-git` parameter. Replace `<app-name>`, `<group-name>`, and `<plan-name>` with the names for your new Git app, its Azure resource group, and its Azure App Service plan.
```sh
az webapp create --name <app-name> --resource-group <group-name> --plan <plan-name> --deployment-local-git
```
Either command returns a URL like: `https://<deployment-username>@<app-name>.scm.azurewebsites.net/<app-name>.git`. Use this URL to deploy your app in the next step.

Instead of using this account-leve URL, you can also enable local Git by using app-level credentials. Azure App Service automatically generates these credentials for every app.

Get the app credentials by running the following command in the Cloud Shell. Replace `<app-name>` and `<group-name>` with your app's name and Azure resource group.
```sh
az webapp deployment list-publishing-credentials --name <app-name> --resource-group <group-name> --query scmUri --output tsv
```
Use the URL that returns to deploy your app in the next step.

#### Deploy the web app

1. Open a local terminal window to your local Git repository, and add an Azure remote. In the following command, replace `<url>` with the deployment user-specific URL or app-specific URL you got from the previous step.
```sh
git remote add azure <url>
```
2. Push to the Azure remote with `git push azure master`
3. In the **Git Credential Manager** window, enter your deployment user password not your Azure sign-in password.
4. Review the output. You may see runtime-specific automation, such as `MSBuild` for ASP.NET, `npm install` for Node.js, and `pip install` for Python.
5. Browse to your app in the Azure portal to verify that the content is deployed. 