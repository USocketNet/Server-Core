@ECHO OFF

echo STOPPING NGINX
taskkill /f /im nginx.exe

echo STARTING NGINX...
start ./nginx.exe

PAUSE