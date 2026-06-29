# Lab 05 — Brief Notes

In this lab we explored continuous delivery and deployment practices for a web application.

The focus was on building a pipeline that can create both preview deployments and production deployments.

I worked on separating the build step from deployment, so the same artifact can be reused in different stages.

This makes the workflow more reliable and reduces the risk of deploying different builds.

I also configured the production flow to require a manual approval step before the app goes live.

That helped me practice how to protect production updates while still automating the rest of the pipeline.

Overall, the lab helped me understand how CI/CD workflows support modern release processes.

It was especially useful for learning how preview environments and manual controls fit together.
