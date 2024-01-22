#!/bin/bash
exec gunicorn -b 0.0.0.0:9874 app:appbash