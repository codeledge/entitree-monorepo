# Entitree Images

Proudly supporting entitree.com

## Getting Started

Drop a .env file in root

```bash
yarn install
yarn dev
```

pm2 start yarn --interpreter bash --name images -- start

Open [http://localhost:3010](http://localhost:3010) with your browser to see the result.

## A few words

This project is the successor of an expressJS/mongoDb image database, meant to support a better admin area and more maintable code using TypeScript. Unfortunately, it took much longer than expected, more than a month rather than a few days. It integrates a background removal API, we opted for a web service to keep the rep light, and Google Vision face detection, which is quite advanced, but costs 1,50\$ per 1000 requests. Users can upload images which are then processed into different types of photos, zoomed into the face and with the background removed. This will hopefully make Entitree more appealing. It should be easier to import photos from other sources into this database. The project was driven by Martin's idea, not based on any user request. The importance and scope of this projects remains to be seen.

## Install

fill the .env file

```txt
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
MONGODB_URI=
NEXTAUTH_URL=http://localhost:3010
PHOTOROOM_API_KEY=
GOOGLE_APPLICATION_CREDENTIALS=<path_to_json>
```

list

## Processing Order of Images

1. Remove Background
2. json result from Google Cloud Vision API, with info of face detection (faces, expression)
3. Crop face

All images are saved in Uploads

1. original - full original file
2. without_bg - image without the background (in png)
3. face -
4. transparent_face - cropped images of individual faces

## API

```
/api/v1/image/[type]/[query]/[id]

type: original,thumbnail,face?
query: id,wikidata
id: numeric ID

```

## Authors

Martin & Orlando
