#!/usr/bin/env bash
projectUnZip=/Users/zhangheng/git/subway/epm-doc/docs
npm run build:website
if [ -d "${projectUnZip}" ]; then
  rm -rf ${projectUnZip}/*
fi

#mv /Users/zhangheng/git/vue/epm-doc/website/dist/* /Users/zhangheng/git/subway/epm-doc/docs
cd  /Users/zhangheng/git/subway/epm-doc && git add -A && git commit -m "提交文档"  && git push -u origin master
