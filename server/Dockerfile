FROM python:3.6-slim
COPY ./server.py /deploy/
COPY ./requirements.txt /deploy/
COPY ./model/export.pkl /deploy/
WORKDIR /deploy/
RUN pip install -r requirements.txt
EXPOSE 80
ENTRYPOINT ["python", "server.py"]