# FROM python:3.6-slim
# COPY ./server.py /deploy/
# COPY ./requirements.txt /deploy/
# COPY ./model/export.pkl /deploy/
# WORKDIR /deploy/
# RUN pip install -r requirements.txt
# EXPOSE 80
# ENTRYPOINT ["python", "server.py"]

# Use the official Python image as the base image
FROM python:3.8-slim

# Set the working directory
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the required Python packages
RUN pip install -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Expose the port that your Flask app listens on
EXPOSE 9874

# Start the Flask app
CMD ["python", "server.py"]