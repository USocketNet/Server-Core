@ECHO OFF

echo STARTING NGINX...
start ./nginx.exe

echo STARTING PHP...
set PATH=./php;%PATH%
start ./tools/RunHiddenConsole.exe ./php/php-cgi.exe -b 127.0.0.1:9123

PING 127.0.0.1 - 1>NULL
PING 127.0.0.1 >NULL
PAUSE