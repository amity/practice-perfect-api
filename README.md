# 19f-practiceperfect-api
API backend and database management for Practice Perfect.

## Building and running
The API service can be built locally by cloning this repo, and using [`yarn`](https://yarnpkg.com/en/docs/install) to install the dependencies. The app can then be run with `yarn start`, and reached at `localhost:5432`.
Accessible endpoints can be viewed at https://github.com/dartmouth-cs98/19f-practiceperfect-api/tree/master/src/features.

This repo also serves as the management for the Postgres database for the API. You can connect to the production database with `db:connect:production` (authorized users only).

To set up a local database, make sure you have [Postgres](https://www.postgresql.org/docs/9.1/app-psql.html) installed, and run `yarn db:init`. Then, run the migrations to get the DB in its current state with `yarn db:migrate`. Finally, if you want some sample data, you can use `yarn db:seed`, or go from the empty tables. You can then connect to your local database on the command line with `yarn db:connect`.

## Cloud services
The full backend (API and DB) is hosted and managed on Google Cloud. Management of user permissions, traffic, security, etc should be done on the [Cloud Console](https://console.cloud.google.com/) (access permission required). Deploying new versions of the app is current done by checking out the latest code and executing the [Google Cloud CLI](https://cloud.google.com/pubsub/docs/quickstart-cli)'s `gcloud app deploy`. (Auto-deploy is currently a work in progress.)
