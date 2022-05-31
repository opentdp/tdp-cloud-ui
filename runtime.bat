@ECHO OFF

CD /D %~dp0

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::设置系统环境

SET "PATH=.\node_modules\.bin;%PATH%"
SET "PATH=%PATH%;D:\Software\PortableGit\bin"

::加载Node环境

IF EXIST D:\RunTime\node\runtime.bat (
    CALL D:\RunTime\node\runtime set "%~n0"
)

::加载Python环境

IF EXIST D:\RunTime\python3\runtime.bat (
    CALL D:\RunTime\python3\runtime set "%~n0"
)

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::安装编译依赖

CD /D %~dp0

IF NOT EXIST node_modules (
    IF EXIST ..\portal-subsite\node_modules (
        mklink /d node_modules ..\portal-subsite\node_modules
    ) ELSE (
        CMD /C "npm install"
    )
)

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

CD /D %~dp0

IF "%1" == "" CMD /K
IF NOT "%1" == "" CMD /C "npm run %1"
