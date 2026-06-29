# Lab 07 — Brief Notes

In this lab we worked with Pulumi to define Azure infrastructure as code.

The goal was to create a Preprod Azure Static Web App and a matching resource group.

I configured a Pulumi TypeScript project in `infra/` and defined the static site resource there.

The infrastructure code includes a named resource group, a static site, and the required tags.

I also added stack outputs for the hostname and the deployment token.

This allows the deployment information to be retrieved securely after provisioning.

The exercise was useful for learning how to express cloud resources in code instead of creating them manually.

It also reinforced the importance of consistent naming and environment separation for Azure infrastructure.
