SHELL := /bin/bash

SHEET_DL = $$(npm bin)/gsheets --key 1Xa9G8vMQZSwV6mMPoNsfAEjkFhDj3HFkMOUsfrhgQW0 --pretty
GSHEET_DEST = src/assets/data
GSHEET_DEST2 = public/data

gsheets:
	$(SHEET_DL) --title Locations --out $(GSHEET_DEST)/locations.json
	$(SHEET_DL) --title Locations --out $(GSHEET_DEST2)/locations.json
	$(SHEET_DL) --title Copyright --out $(GSHEET_DEST)/copyright.json

deploy:
	lftp -c "																										\
		set ftp:list-options -a;																	\
		open ftp://web204:2qT5qJuk@login-73.hoststar.ch;		      \
		lcd build;																								\
		cd /stadt;																		              \
		mirror --reverse --verbose --exclude-glob .*"