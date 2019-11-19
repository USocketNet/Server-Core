@ECHO OFF

echo CHECKING NGINX...
tasklist /fi "imagename eq nginx.exe"
echo CHECKING PHP...
tasklist /fi "imagename eq php-cgi.exe"
echo CHECKING MYSQL...
tasklist /fi "imagename eq mysqld.exe"

PAUSE