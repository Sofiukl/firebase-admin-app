# Baseline Image Name:

FROM node:14.5.0-alpine
# Identify the maintainer of an image:
LABEL maintainer="support@mycompany.com"

RUN mkdir -p /opt/application/
COPY . /opt/application/
COPY ./buildconfig/env-file.sh /tmp/
# Export Application Port:
EXPOSE 3000

WORKDIR /opt/application/
RUN npm install && npm audit fix

# Start Service
CMD sh /tmp/env-file.sh; npm run start