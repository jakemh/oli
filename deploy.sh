#!/bin/bash

git add .
git commit -m "$1"
git push origin master
cap production deploy
expect "Please enter Server password ():"
send "oli2014"