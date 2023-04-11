@echo off
::

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

CD /D %~dp0

IF NOT EXIST node_modules (
    ECHO Installing node modules...
    npm install
)

npm run build

IF "%1" == "" CMD /K
