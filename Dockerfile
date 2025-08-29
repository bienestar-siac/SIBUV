FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json* yarn.lock* ./
RUN npm ci --silent

COPY . .
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
RUN npm run build


FROM nginx:1.25-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s CMD wget -qO- http://localhost/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
