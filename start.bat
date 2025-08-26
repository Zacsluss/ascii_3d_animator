@echo off
echo Starting ASCII Art Game...
echo.
echo Checking for Python...

python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Python not found. Trying to open file directly...
    start "" "index.html"
    goto :end
)

echo Finding available port...
set PORT=8000

:check_port
netstat -an | find ":%PORT% " >nul
if %errorlevel% equ 0 (
    set /a PORT+=1
    if %PORT% gtr 8010 (
        echo Could not find available port. Using 8000...
        set PORT=8000
        goto :start_server
    )
    goto :check_port
)

:start_server
echo Starting local HTTP server on port %PORT%...
echo.
echo Opening game in browser...
echo Press Ctrl+C to stop the server when done.
echo.

start "" "http://localhost:%PORT%"
python -m http.server %PORT%

:end
echo.
echo Press any key to exit...
pause >nul