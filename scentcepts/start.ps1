#!/usr/bin/env pwsh
# =============================================================================
# Scentcepts Dev Startup Script
# Checks for port conflicts before starting all services.
# Usage: ./start.ps1
# =============================================================================

$ErrorActionPreference = "Stop"

# --- Configuration ------------------------------------------------------------
$BACKEND_PORT  = 8080
$FRONTEND_PORT = 3000
$DB_PORT       = 5432
$DB_USER       = "scentcepts_user"
$DB_NAME       = "scentcepts_db"
$JAVA_HOME     = "$env:USERPROFILE\.jdks\temurin-21"

$SCRIPT_DIR = if ($PSScriptRoot) { $PSScriptRoot } else { (Get-Location).Path }

# --- Colour helpers -----------------------------------------------------------
function Write-Ok   ($msg) { Write-Host "  [OK]  $msg" -ForegroundColor Green  }
function Write-Fail ($msg) { Write-Host "  [ERR] $msg" -ForegroundColor Red    }
function Write-Info ($msg) { Write-Host "  [INF] $msg" -ForegroundColor Cyan   }
function Write-Warn ($msg) { Write-Host "  [WRN] $msg" -ForegroundColor Yellow }

Write-Host ""
Write-Host "==============================================" -ForegroundColor Magenta
Write-Host "       Scentcepts Dev Launcher                " -ForegroundColor Magenta
Write-Host "==============================================" -ForegroundColor Magenta
Write-Host ""

# --- Port conflict checker ----------------------------------------------------
function Test-PortFree {
    param([int]$Port, [string]$ServiceName)

    $listening = netstat -ano | Select-String ":$Port\s" | Select-String "LISTENING"
    if ($listening) {
        $portPid = ($listening | Select-Object -First 1).Line -replace '.*\s+(\d+)\s*$','$1'
        $portPid = $portPid.Trim()
        try {
            $proc = Get-Process -Id $portPid -ErrorAction SilentlyContinue
            $procName = if ($proc) { "$($proc.Name) (PID $portPid)" } else { "PID $portPid" }
        } catch { $procName = "PID $portPid" }

        Write-Fail "Port $Port is already in use by $procName"
        Write-Host ""
        Write-Host "  HOW TO FIX:" -ForegroundColor Yellow
        Write-Host "  $ServiceName needs port $Port but it is occupied." -ForegroundColor Yellow
        Write-Host ""
        Write-Host "  Option 1: Kill the process:" -ForegroundColor Yellow
        Write-Host "    Stop-Process -Id $portPid -Force" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "  Option 2: Change the port in configuration." -ForegroundColor Yellow
        Write-Host ""
        return $false
    }

    Write-Ok "Port $Port is free ($ServiceName)"
    return $true
}

function Invoke-DockerCompose {
    param([string[]]$Arguments)
    if (Get-Command "docker" -ErrorAction SilentlyContinue) {
        & docker compose @Arguments
        return $LASTEXITCODE
    }
    if (Get-Command "docker-compose" -ErrorAction SilentlyContinue) {
        & docker-compose @Arguments
        return $LASTEXITCODE
    }
    Write-Fail "Neither 'docker compose' nor 'docker-compose' was found."
    exit 1
}

# --- Checks -------------------------------------------------------------------
Write-Info "Checking Java 21 at $JAVA_HOME ..."
if (-not (Test-Path "$JAVA_HOME\bin\java.exe")) {
    Write-Fail "JDK 21 not found at $JAVA_HOME"
    exit 1
}
Write-Ok "Found Java 21"

Write-Info "Checking Docker ..."
try {
    docker info -ErrorAction SilentlyContinue > $null 2>&1
    Write-Ok "Docker is responsive"
} catch {
    Write-Warn "Docker check unresponsive, attempting to proceed anyway..."
}

Write-Host ""
Write-Info "Checking port availability..."

$db_ok       = Test-PortFree -Port $DB_PORT       -ServiceName "PostgreSQL"
$backend_ok  = Test-PortFree -Port $BACKEND_PORT  -ServiceName "Spring Boot API"
$frontend_ok = Test-PortFree -Port $FRONTEND_PORT -ServiceName "Next.js Frontend"

if (-not ($db_ok -and $backend_ok -and $frontend_ok)) {
    Write-Fail "One or more ports are blocked. Fix conflicts and re-run."
    exit 1
}

Write-Ok "All ports clear - starting services..."
Write-Host ""

# --- 1. Database ---------------------------------------------------------------
Write-Info "Starting PostgreSQL container..."
Set-Location $SCRIPT_DIR
Invoke-DockerCompose "up", "-d", "db"
if ($LASTEXITCODE -ne 0) {
    Write-Fail "Failed to start DB."
    exit 1
}
Write-Ok "PostgreSQL is starting..."
Start-Sleep 5 # Brief pause for startup

# --- 2. Build Backend ----------------------------------------------------------
Write-Info "Building Backend JAR..."
$env:JAVA_HOME = $JAVA_HOME
$env:PATH      = "$JAVA_HOME\bin;$env:PATH"
Set-Location "$SCRIPT_DIR\backend"
& ".\mvnw.cmd" package -DskipTests -q
if ($LASTEXITCODE -ne 0) {
    Write-Fail "Maven build failed."
    Set-Location $SCRIPT_DIR
    exit 1
}
Set-Location $SCRIPT_DIR
Write-Ok "Backend built."

# --- 3. Start Backend ----------------------------------------------------------
Write-Info "Starting Backend on port $BACKEND_PORT ..."
$backendJob = Start-Job -ScriptBlock {
    param($dir, $jh)
    $env:JAVA_HOME = $jh
    $env:PATH      = "$jh\bin;$env:PATH"
    Set-Location $dir
    $jar = Get-ChildItem "target\*.jar" -Exclude "*sources*","*javadoc*" | Select-Object -First 1
    if (-not $jar) { throw "No JAR found" }
    & "$jh\bin\java.exe" -jar $jar.FullName
} -ArgumentList "$SCRIPT_DIR\backend", $JAVA_HOME

# Wait for backend
$backendReady = $false
for ($i = 0; $i -lt 30; $i++) {
    Start-Sleep 2
    try {
        $r = Invoke-WebRequest -Uri "http://localhost:$BACKEND_PORT/actuator/health" -UseBasicParsing -TimeoutSec 2 -ErrorAction SilentlyContinue
        if ($r.StatusCode -eq 200) { $backendReady = $true; break }
    } catch {}
}

if (-not $backendReady) {
    Write-Fail "Backend did not start."
    exit 1
}
Write-Ok "Backend is up."

# --- 4. Start Frontend ---------------------------------------------------------
Write-Info "Starting Frontend on port $FRONTEND_PORT ..."
$frontendJob = Start-Job -ScriptBlock {
    param($dir)
    Set-Location $dir
    npm run dev
} -ArgumentList "$SCRIPT_DIR\frontend"

Write-Ok "Frontend initiated."

# --- Summary -------------------------------------------------------------------
Write-Host ""
Write-Host "**********************************************" -ForegroundColor Green
Write-Host "         Scentcepts is Running!               " -ForegroundColor Green
Write-Host "**********************************************" -ForegroundColor Green
Write-Host ""
Write-Host "  Frontend   : http://localhost:$FRONTEND_PORT" -ForegroundColor Cyan
Write-Host "  API        : http://localhost:$BACKEND_PORT/api/v1" -ForegroundColor Cyan
Write-Host "  Database   : localhost:$DB_PORT" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Press Ctrl+C to stop watching logs. Jobs run in background." -ForegroundColor Gray
Write-Host ""

Receive-Job $backendJob -Wait
