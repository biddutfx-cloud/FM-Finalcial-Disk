@echo off
set "APP_PATH=%~dp0index.html"
set "ICON_PATH=%~dp0assets\app.ico"
set "USER_DIR=%~dp0.app_profile"

start "" "msedge.exe" --app="file:///%APP_PATH:\=/%" --window-size=1050,610 --user-data-dir="%USER_DIR%" --app-id="FinancialDiskApp"
