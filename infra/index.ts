import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure-native";

const config = new pulumi.Config();
const location = config.get("location") || "westeurope";

const resourceGroup = new azure.resources.ResourceGroup("rg-vue2048", {
  location,
});

const staticSite = new azure.web.StaticSite("vue2048StaticSite", {
  resourceGroupName: resourceGroup.name,
  location: resourceGroup.location,
  repositoryUrl: "",
  tags: {
    Class: "EI8IT213",
  },
});

export const hostname = staticSite.defaultHostname;

const secrets = azure.web.listStaticSiteSecretsOutput({
  name: staticSite.name,
  resourceGroupName: resourceGroup.name,
});

export const deploymentToken = pulumi.secret(secrets.apply(s => s.properties && (s.properties as any).apiKey));
