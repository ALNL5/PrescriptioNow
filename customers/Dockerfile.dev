FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
WORKDIR /deps
COPY requirements.txt requirements.txt
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait
RUN python -m pip install -r requirements.txt
WORKDIR /app
CMD /wait && python -m migrations up && uvicorn main:app --reload --host 0.0.0.0
