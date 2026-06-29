import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure-native";

const stack = pulumi.getStack();
const environment = stack === "dev" ? "preprod" : stack;
const location = new pulumi.Config("azure-native").get("location") || "FranceCentral";

const resourceGroupName = `rg-vue2048-${environment}`;
const staticSiteName = `stapp-vue2048-${environment}`;

const resourceGroup = new azure.resources.ResourceGroup("resourceGroup", {
  resourceGroupName,
  location,
});

const staticSite = new azure.web.StaticSite("staticSite", {
  name: staticSiteName,
  resourceGroupName: resourceGroup.name,
  location,
  repositoryUrl: "",
  sku: {
    name: "Free",
  },
  tags: {
    Class: "EI8IT213",
  },
});

const staticSiteSecrets = azure.web.listStaticSiteSecretsOutput({
  name: staticSite.name,
  resourceGroupName: resourceGroup.name,
});

const deploymentToken = pulumi.secret(staticSiteSecrets.properties.apiKey);

export const hostname = staticSite.defaultHostname;
export const deploymentTokenSecret = deploymentToken;
export const resourceGroupOutput = resourceGroup.name;
