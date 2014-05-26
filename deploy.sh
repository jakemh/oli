#!/bin/bash

rake assets:precompile
git add .
git commit -m "$1"
git push origin master
cap production deploy
