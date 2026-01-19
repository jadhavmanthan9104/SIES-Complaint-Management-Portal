# How to Run the Application

## Prerequisites
**Important**: You previously installed a Python package named `npm` using `pip`. This is **not** the correct tool.
1. Please **install Node.js** from [nodejs.org](https://nodejs.org/). This will install the correct `npm` command (Node Package Manager).
2. Restart your terminal after installing Node.js so that the `npm` command is recognized.

## Commands

### 1. Run the Backend
Open a terminal and run:
```powershell
cd backend
py server.py
```
*The backend should start running, typically on http://localhost:8000*

### 2. Run the Frontend
Open a **new** terminal window and run:
```powershell
cd frontend
# Install dependencies (only need to do this once)
npm install

# Start the frontend
npm start
```
*The application should open in your browser, typically on http://localhost:3000*
