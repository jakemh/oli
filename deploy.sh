#!/bin/bash
set pass "oli2014"

git add .
git commit -m "$1"
git push origin master
cap production deploy
expect "Please enter Server password (): "
send "$pass"