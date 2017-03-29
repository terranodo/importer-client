MKFILE_PATH := $(abspath $(lastword $(MAKEFILE_LIST)))
MKFILE_DIR := $(dir $(MKFILE_PATH))

FILE=$(MKFILE_DIR)VERSION
VERSION=`cat $(FILE)`

.PHONY: build-js build-django-app package-app release

build-js:
	cd $(MKFILE_DIR)..; npm i
	cd $(MKFILE_DIR)..; npm run build

build-django-app: build-js
	cp $(MKFILE_DIR)../dist/Importer.min.js $(MKFILE_DIR)osgeo_importer_client/static/osgeo_importer_client/js/osgeo_importer_client.min.js

package-app: build-django-app
	cd $(MKFILE_DIR); python setup.py sdist bdist_wheel

release: package-app
	twine upload $(MKFILE_DIR)dist/django-osgeo-importer-client-$(VERSION).tar.gz

