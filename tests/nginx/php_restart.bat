@ECHO OFF

echo STOPPING PHP
taskkill /f /im php-cgi.exe

echo STARTING PHP...
set PATH=./php;%PATH%
start ./tools/RunHiddenConsole.exe ./php/php-cgi.exe -b 127.0.0.1:9123

PAUSE