@ECHO OFF

echo STOPPING NGINX
taskkill /f /im nginx.exe
echo STOPPING PHP
taskkill /f /im php-cgi.exe

PAUSE