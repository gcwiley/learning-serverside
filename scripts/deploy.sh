# create a resource group in azure


# variables
location="East US"
resourceGroup="test-resource-group"

az login

echo "Creating a resource group in $location"

az group create --name $resourceGroup --location "$location" 