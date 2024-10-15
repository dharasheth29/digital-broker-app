## Digital mortgage broking App

This app hosts 2 packages. Which are Apps, one for the API and another one for the UI. These are listed under

```
- digital-broker-app/packages/api
- digital-broker-app/packages/ui
```

To undertand, how to install / build / run each of them, go through the README.md file in the respective folder

In order to run the App end-to-end

```
- First run the API, which will run on the host http://localhost:3000
- Secondly run the UI.
```

### Architectural Overview

The application consists of two main components: a UI App (React Frontend) and an API App (Node.js Backend). The UI interacts with the backend to submit the loan application related data which are the inputs from a user and receive loan & lenders responses, following a simple request-response cycle. The architecture can be summarized as follows:

#### 1. Frontend (React Application)

The UI is built with three key components, each responsible for gathering specific inputs from the user.
Upon submission, the user inputs from these components are aggregated and sent to the backend.
The UI communicates with the backend via a REST API (HTTP request) and waits for the async response to display the appropriate result to the user.
UI Flow:

```
- Component 1: Collects Personal data from the user (e.g., first name, last name).
- Component 2: Gathers Loan details related data (e.g., vehicle price, deposit etc).
- Submit Action: On form submission, data is sent to the Node.js backend via a POST request.
- Component 3: Renders and displays response retrieved from the API call.
```

#### 2. Backend (Node.js Application)

The backend is a Node.js application that handles API requests from the frontend.

Upon receiving a request, the backend processes the data and executes necessary business logic.

The backend does not interact with any database or cache server, instead uses in memory/mock data to generate the response.

Once processing is completed, the backend returns a response to the frontend.

#### Backend Flow:

API Endpoint: Exposes a REST API endpoint (e.g., /api/loan-details) that the frontend calls.

Data Processing: Validates and processes the data sent from the frontend.

Response: Returns a success or error message, along with any additional data (e.g., processed results or validation errors).

#### 3. Communication Flow

The frontend makes an HTTP POST request to the backend with the data submitted by the user.

The backend validates the data, processes it and returns the result.

The frontend receives the response and updates the UI accordingly, either displaying the results or showing error messages.

#### 4. Technology Stack

```
Frontend: React & TypeScript
Backend: Node.js with Express & Typescript
```

#### 5. Example Workflow

The user fills in data across the 2 components in the frontend and clicks submit.

The frontend collects the data and sends a POST request to the backend (/api/loan-details).

The backend receives and validates the data, processes it, and returns a response.

The frontend updates the UI based on the response, displaying either success or error messages.
