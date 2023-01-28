# Module3 Project Gamma

## Install Extensions

* Prettier: <https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode>
* Black Formatter: <https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter>

## Deliverables

* [API documentation](docs/apis.md)
* ![Wire-frame diagrams](docs/main_page.png)
* ![Wire-frame diagrams](docs/login.png)
* ![Wire-frame diagrams](docs/signup.png)
* ![Wire-frame diagrams](docs/customer_home.png)
* ![Wire-frame diagrams](docs/pharmacist_prescription_lisst.png)
* ![Wire-frame diagrams](docs/pharmacist_create_prescription.png)
* ![Wire-frame diagrams](docs/delivery_home.png)
* ![Wire-frame diagrams](docs/delivery_task_map.png)

* [Journals](Journals/Ailin_Li.md)
* [Journals](Journals/grace_strutzel.md)
* [Journals](Journals/jared_wolf.md)

* [ ] Project is deployed to GitLab-pages
* [GitLab issue board](https://gitlab.com/epsilon15/prescriptionow/-/boards)

## Intended market

The people we would expect to use this application, are customers, pharmacists, and delivery drivers. Pharmacist creates prescriptions for customers, then customers can see their prescription in their account and select to refill, then pharmacists receive the order to fulfill. When the refill is complete, delivery driver deliver the refill orders to customers with an optimized routing suggestion. After finishing the delivery, the customer will receive a confirmation message about delivery.

## Backend needs

- We made CRUD of prescriptions, customers, deliveries and their personal information. Incorporated authentification for increased user protection.

### Functionality

- customers should be able to sign up for an account
- customers should be able to log in for an account to see their prescriptions and order refill in their account
- customers should be able to log out for an account
- pharmacists should be able to log in for an account to make CRUD on prescriptions
- pharmacists should be able to select medicine description from information provided by a 3rd-party API
- pharmacists should be able to filter out prescriptions with refill request
- pharmacists should be able to log out for an account
- delivery drivers should be able to log in to their account
- delivery drivers should be able to filter out delivery tasks with completed refill request
- delivery drivers should be able to see routing suggestions automatically list on the map provided by a 3rd-party API
- delivery drivers should be able to update delivery status when the order is delivered
- delivery drivers should be able to send a delivery notification to customer when the order is delivered

## Project layout

The layout of the project is just like all of the projects
you did with `docker-compose` in module #2. You will create
a directory in the root of the repository for each service
that you add to your project just like those previous
projects were setup.

### Directories

Several directories have been added to your project. The
directories `docs` and `journals` are places for you and
your team-mates to, respectively, put any documentation
about your project that you create and to put your
project-journal entries. See the _README.md_ file in each
directory for more info.

The other directories, `ghi` and `sample_service`, are
sample services, that you can start building off of or use
as a reference point.

Inside of `ghi` is a minimal React app that has an "under
construction" page. It is setup similarly to all of the
other React projects that you have worked on.

Inside of `sample_service` is a minimal FastAPI application.
"Where are all the files?" you might ask? Well, the
`main.py` file is the whole thing, and go take look inside
of it... There's not even much in there..., hmm? That is
FastAPI, we'll learn more about it in the coming days. Can
you figure out what this little web-application does even
though you haven't learned about FastAPI yet?

Also in `sample_service` is a directory for your migrations.
If you choose to use PostgreSQL, then you'll want to use
migrations to control your database. Unlike Django, where
migrations were automatically created for you, you'll write
yours by hand using DDL. Don't worry about not knowing what
DDL means; we have you covered. There's a sample migration
in there that creates two tables so you can see what they
look like.

The sample Dockerfile and Dockerfile.dev run your migrations
for you automatically.

### Other files

The following project files have been created as a minimal
starting point. Please follow the guidance for each one for
a most successful project.

* `docker-compose.yaml`: there isn't much in here, just a
  **really** simple UI and FastAPI service. Add services
  (like a database) to this file as you did with previous
  projects in module #2.
* `.gitlab-ci.yml`: This is your "ci/cd" file where you will
  configure automated unit tests, code quality checks, and
  the building and deployment of your production system.
  Currently, all it does is deploy an "under construction"
  page to your production UI on GitLab and a sample backend
  to Render.com. We will learn much more about this file.
* `.gitignore`: This is a file that prevents unwanted files
  from getting added to your repository, files like
  `pyc` files, `__pycache__`, etc. We've set it up so that
  it has a good default configuration for Python projects.

## How to complete the initial deploy

There will be further guidance on completing the initial
deployment, but it just consists of these steps:

### Setup GitLab repo/project

* make sure this project is in a group. If it isn't, stop
  now and move it to a GitLab group
* remove the fork relationship: In GitLab go to:

  Settings -> General -> Advanced -> Remove fork relationship

* add these GitLab CI/CD variables:
  * PUBLIC_URL : this is your gitlab pages URL
  * SAMPLE_SERVICE_API_HOST: enter "blank" for now

#### GitLab pages URL

https://gitlab.com/epsilon15/prescriptionow

### Create render.com account and application

* create account on render.com
* one person create a group and invite all other members
* create a new "Web Service"
  * authenticate with GitLab and choose your project
  * Enter fields:
    * Name: name of your service
    * Root Directory: the directory of your service in your git repo.
      For this example use "sample_service".
    * Environment: Docker
    * Plan Type: Free
  * click the "Create Web Service" button to create it
  * the build will succeed and it will look like the server is running,
    most likely, in 6-10 minutes, it will fail.
  * click "Manual Deploy" -> "Deploy latest commit" and the service
    should deploy successfully.

### Update GitLab CI/CD variables

Copy the service URL for your new render.com service and then paste
that into the value for the SAMPLE_SERVICE_API_HOST CI/CD variable
in GitLab.

### Deploy it

Merge a change into main to kick off the initial deploy. Once the build pipeline
finishes you should be able to see an "under construction" page on your GitLab
pages site.


### A Note about Deliveries.JSX
This page does not implement the delivery back-end and gets none of it's data from there. It gets it directly from customers and pharmacy. Since we could not get the deliveries back-end to a workable spot, the front end page is incomplete and does not implement a 3rd-party routing service to get the most efficient route between many stops. The update function didn't work on pharmacy and customers, so I couldn't change the status of an order. This page implements 3rd-party data to get the coordinates based on each address.

### Addresses ###
If you decide to create a customer, please only create addresses in Seattle. It will be easier that way. Trust.
