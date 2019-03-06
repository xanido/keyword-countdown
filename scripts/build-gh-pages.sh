#!/usr/bin/env bash

branch=master

if [ `git rev-parse --abbrev-ref HEAD` == "$branch" ]; then
 npx webpack
 mkdir tmp-build
 cd tmp-build
 git clone ../ .

 git checkout gh-pages

 git rm -r '*' --quiet


 cp -R ../public/* .
 git add .
 git commit -m "updated $(date +"%d.%m.%Y %H:%M:%S")"
 echo -e "\033[0;32mdemo updated $(date +"%d.%m.%Y %H:%M:%S")\033[0m"
 git push ../ gh-pages
 cd ../
 git push origin gh-pages
else
    echo "must be on master branch";
fi

[ -d tmp-build ] && rm -Rf tmp-build
