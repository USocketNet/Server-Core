@echo off
TITLE USocketNet Server : Bytes Crafter @ 2018
mode con: cols=125 lines=84
%CD:~0,2%
cd %CD%
SET usnet=%CD%


SET SvcName=Redis
SC QUERY "%SvcName%" > NUL
IF ERRORLEVEL 1060 GOTO MISSING

SC QUERYEX "%SvcName%" | FIND "STATE" | FIND /v "RUNNING" > NUL && (
    redis-server --service-start
    node server_library/core.js
    PAUSE
) || (
    node server_library/core.js
    PAUSE
)

GOTO END


:MISSING
cd C:\Program Files\Redis
redis-server --service-install redis.windows-service.conf --loglevel verbose
redis-server --service-start
cd %usnet%
node server_library/core.js
PAUSE
:END