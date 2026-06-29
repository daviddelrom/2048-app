# Lab 06 — Brief Notes

In this lab we explored Azure Static Web Apps and the workflow needed to deploy a Nuxt application in two environments.

The main goal was to make the app ready for static hosting, with a clear separation between QA and production.

I set up the deployment process so that the output artifact is built once, then reused for QA and production.

This helps ensure the same version of the app is tested in QA before it goes live.

I also focused on using environment-specific deployment tokens, so CI can deploy without interactive login.

The production stage is protected by a manual validation step to avoid automatic updates without review.

Overall, the exercise reinforced the value of separating build and deployment, and of having distinct QA and production flows.

It also helped me understand how cloud deployment can be managed reliably with CI automation.
