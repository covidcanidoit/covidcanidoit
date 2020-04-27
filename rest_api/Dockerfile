FROM python:3.6.8

WORKDIR /app

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt

# Install the magical populartimes lib
RUN pip install --upgrade 'git+https://github.com/m-wrzr/populartimes'

