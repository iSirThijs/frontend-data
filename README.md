# Frontend Data
This repo is for the subject frontend-data from the [Tech Track](https://github.com/cmda-tt/course-19-20)

## About this repo
This repo is my work for the subject frontend-data from the tech-track at the HvA. 

This concept is a continuation of the previous subject [Functional Programming](https://github.com/iSirThijs/functional-programming/)

The goal for the subject is to create an interactive visualization of data for the National Museum of World Cultures. 

> Create a data visualisation (using the d3 library) based on given data where data can be explored through interaction using enter, update, and exit. *- [Tech Track CMDA: Assignment](https://github.com/cmda-tt/course-19-20/blob/master/frontend-data/assessment.md#assignment)*

<!-- Preview Screen here when available -->
<!-- ![bubbles](https://github.com/iSirThijs/functional-programming/wiki/images/endresultScreen.png) -->

## Features and concept
This visualization is about exploring the photographic collection from the NVMW split out on the person who made the photo. The lager the bubble, the more items in the collection are from that creator and made interactive by clicking on the bubble to get more info on that creator. The overlay can also be changed depending on the layer selected (acedemic title, male/female etc.)

<!-- View it here: https://isirthijs.github.io/functional-programming/ -->

This concept is a continuation of the concept from the previous subject [Functional Programming](https://github.com/iSirThijs/functional-programming/wiki)

## Install

To install this app to your machine use:
```bash
git clone https://github.com/iSirThijs/functional-programming.git
```

*Optional*
If you want to use eslint (and don't have it global already): `run npm install`

> **Important** Opening the file in the browser will not work due to CORS issues with ES modules. Use a local webserver(or livereload plugin) to host the file at localhost. (I Used [Prepros](https://prepros.io))