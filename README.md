# cuppa
![Build status](https://github.com/matt-l-w/cuppa/workflows/build/badge.svg)

This is source code for [cuppa](https://covid-cuppa.herokuapp.com). To find out
more about cuppa, visit the website. This README will stick to development-related
aspects of the project.

## Architecture

The app is hosted on Heroku but also makes use of:
* AWS S3 for static file hosting in production
* Google Maps APIs for location-related information

This is a Rails app, with a sprinkling of React for the more dynamic front-end components.

## Development
### Contributing
This repository is absolutely up for contribution. Please read [our guidance](contributing.md) for contributing first.

### Locally
Requirements:
1. Ruby 2.4.9
1. Node 12.x
1. Postgres

To install and run the app locally, run 

```
bundle install
yarn install
rails db:create
rails db:migrate
rails server
```

This requires you have a postgres instance running and accessible on port 5432.

### CI
On the creation of a PR, a pipeline will launch that:
1. runs the tests
1. spins up a testing environment on Heroku

This should be enough to verify your app is ready for deployment to production.
