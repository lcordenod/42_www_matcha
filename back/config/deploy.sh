#!/bin/sh
path=$(cd $( dirname ${BASH_SOURCE[0]}) && pwd )/matcha_seed.sql;

cd //Users/lcordeno/Applications/MAMP/mysql/bin;

./mysql < $path -u root -pazerty123;

echo "Database deployed!"



