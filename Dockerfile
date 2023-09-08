FROM node:18.17 as builder

WORKDIR /app

COPY package.json package-lock.json ./

ENV CI=1

ENV VITE_API_KEY="AIzaSyAu1EGIjjMzyQB80VYY7XTSSoHAEV4GECc"

RUN npm ci 

COPY . .

RUN npm run build

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]