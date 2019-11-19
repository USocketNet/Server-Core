@ECHO OFF

echo STARTING NGINX...
start ./nginx.exe

echo STARTING PHP...
set PATH=./php;%PATH%
start ./tools/RunHiddenConsole.exe ./php/php-cgi.exe -b 127.0.0.1:9123

echo STARTING MYSQL...
start ./tools/RunHiddenConsole.exe ./mysql/bin/mysqld --defaults-file=mysql\bin\my.ini --standalone --console

if errorlevel 1 goto error
goto finish

:error
echo.
echo MySQL could not be started
pause

:finish

PING 127.0.0.1 - 1>NULL
PING 127.0.0.1 >NULL
PAUSE