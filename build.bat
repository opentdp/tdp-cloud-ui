@echo off
::

::����Node����

IF EXIST D:\RunTime\node\runtime.bat (
    CALL D:\RunTime\node\runtime set "%~n0"
)

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

CD /D %~dp0

IF NOT EXIST node_modules (
    ECHO Installing node modules...
    npm install
)

npm run lint
npm run build

IF "%1" == "" CMD /K
