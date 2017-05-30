Importer Client

[![Build Status](https://travis-ci.org/terranodo/importer-client.svg?branch=master)](https://travis-ci.org/terranodo/importer-client) 

A client for the GeoNode Importer with React and Material-UI

## Usage

This client is published via pypi and can be installed via 
```
pip install django-osgeo-importer-client
```

If you don't want to customize it, just include the template `bulk_import.html` in the `templates/osgeo_importer_client` folder in your Django/Geonode app.
It uses the `SITEURL` environment variable from Django as the default server for the importer.

### Custom Usage

If you don't want to rely on the prebuild template within the library you can create your own.
To use the Importer Client you have to create a new instance for it:
```
var importer = new Importer('domId', options);
```
The first parameter is the ID of the DOM-Element the Importer should be displayed in. The second parameter is an option object. There are two option params right now:
- server
- layerImportConfig

`server` specifies the url for the importer endpoint. For now the Endpoints are hard-coded. This might change in the future, but since we're using geonode the endpoints are set accordingly.  
`layerImportConfig` is an array of steps for the single layer import. More info [here](Customize.md)

To show the importer simply call `importer.view()`.

### Endpoints used

__File Upload__  
`/uploads/new/json`

__Import all layers for upload id__  
`/importer-api/data/${id}/import_all_layers/`

__Upload one configured layer for upload id__  
`/importer-api/data-layers/${id}/configure/`

__Check import status of uploaded data__  
`/importer-api/data/${id}/`

## Installation

Install node and npm, and a node packaging manager (we prefer nvm).

run `npm i` to install all dependencies.

## Development

Run `npm start` then visit your browser at `http://localhost:8080` for a dev version

## Testing

Run `npm test` to run the tests once (like travis) or run `npm run test:unit` for conitnious testing with a file watcher.

## Building

Run `npm run build` to create a minified version of the app called `Importer.min.js`
