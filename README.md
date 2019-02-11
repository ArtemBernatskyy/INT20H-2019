# Beware, Pirates !
Pirates of Silicon Valley

### Basic diagram on how it works

![alt text](https://s3-eu-west-1.amazonaws.com/bernatskyys/img/Screen+Shot+2019-02-11+at+22.29.21.png)


### Project structure
```
├── README.md
├── client              # SPA client app
│   ├── build           # for production build, the same as /fe_build
│   ├── src
│   │   ├── App.jsx
│   │   ├── components  # for reusabel components
│   │   ├── containers  # aka pages
│   │   ├── index.jsx   # will be mounted via React
│   │   ├── redux       # redux related
│   │   ├── routes      # url routing
│   │   ├── styles      # scss styles
└── server                  # Backend (Django/Celery/CeleryBeat/Redis/PostgreSQL/Docker)
    ├── .env                # Env variables which will be read into docker-compose
    ├── compose             # docker-compose settings
    ├── config              # Django config
    ├── fe_build            # the same as client/build TODO add auto copy
    ├── local.yml           # docker-compose main file to run locally
    ├── manage.py
    ├── production.yml      # docker-compose main file to run in production
    ├── requirements        # requirements for Django container
    ├── server              # Django code lives here
    │   ├── contrib
    │   ├── core            # here we can find all code related to tasks and main logic
    │   ├── static
    │   ├── taskapp
    │   ├── templates
    │   └── users
    └── setup.cfg
```

### How to run
- Plz follow instructions here  https://cookiecutter-django.readthedocs.io/en/latest/developing-locally-docker.html
