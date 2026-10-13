\# MeetFlowAI — AI-Powered Meeting \& Task Manager



MeetFlowAI is a full-stack web application designed to simplify meeting follow-ups and everyday task management. It uses AI to analyze meeting discussions, generate summaries and identify action items that can be converted into tasks.



The project combines a React frontend with a Java Spring Boot backend, MySQL database integration, JWT-based authentication and the OpenRouter API.



\## ✨ Features



\- \*\*User Authentication\*\* — User registration and login with JWT-based authentication.

\- \*\*Task Management\*\* — Create, view, edit, delete and manage tasks.

\- \*\*Task Status Management\*\* — Track tasks by their status and priority.

\- \*\*Dashboard\*\* — View task information through a centralized dashboard.

\- \*\*AI Meeting Analysis\*\* — Analyze meeting text using an AI model.

\- \*\*Meeting Summaries\*\* — Generate concise summaries of meeting discussions.

\- \*\*Action Item Extraction\*\* — Identify tasks and follow-up actions from meeting discussions.

\- \*\*Meeting-to-Task Workflow\*\* — Convert extracted action items into manageable tasks.

\- \*\*REST API Integration\*\* — Connect the React frontend to the Spring Boot backend.

\- \*\*Database Persistence\*\* — Store application data in MySQL.



\## 🛠️ Technology Stack



| Layer | Technologies |

|---|---|

| Frontend | React, JavaScript, HTML, CSS |

| Frontend Tooling | Vite, npm |

| Backend | Java, Spring Boot |

| Security | Spring Security, JWT |

| Database | MySQL |

| AI Integration | OpenRouter API |

| Build Tool | Maven |

| Version Control | Git and GitHub |



\## 📁 Project Structure



```text

MeetFlow AI/

├── Backend AI-MeetingManager/

│   └── ai-meeting-task-manager/

│       ├── src/

│       │   ├── main/

│       │   │   ├── java/com/aiMeeting/taskmanager/

│       │   │   │   ├── config/

│       │   │   │   ├── controller/

│       │   │   │   ├── dto/

│       │   │   │   ├── entity/

│       │   │   │   ├── repository/

│       │   │   │   ├── security/

│       │   │   │   └── service/

│       │   │   └── resources/

│       │   └── test/

│       ├── pom.xml

│       └── mvnw.cmd

│

├── finalProject-frontend/

│   └── AI-MeetingManager/

│       ├── public/

│       ├── src/

│       │   ├── api/

│       │   ├── assets/

│       │   ├── components/

│       │   └── pages/

│       ├── package.json

│       └── vite.config.js

│

└── .gitignore

```



\## ⚙️ Prerequisites



Install the following before running the application:



\- Java Development Kit (JDK) compatible with the backend configuration

\- Node.js and npm

\- MySQL Server

\- Git

\- An OpenRouter API key



\## 🚀 Getting Started



\### 1. Clone the Repository



```bash

git clone https://github.com/Kartikpalande11/MeetFlowAI.git

cd MeetFlowAI

```



\### 2. Configure the MySQL Database



1\. Start your MySQL server.

2\. Create the database configured for the application.

3\. Update the database connection settings in the backend's `application.properties` file if necessary.

4\. Configure your database username and password securely.



Use the database name and connection settings that match your local configuration.



\### 3. Configure Environment Variables



The backend uses environment variables for sensitive configuration.



Configure the following variables on your system:



| Variable | Purpose |

|---|---|

| `JWT\_SECRET` | Secret used to sign JWT tokens |

| `OPENROUTER\_API\_KEY` | API key used for AI meeting analysis |



\*\*Windows Command Prompt example:\*\*



```cmd

setx JWT\_SECRET "YOUR\_LONG\_RANDOM\_SECRET"

setx OPENROUTER\_API\_KEY "YOUR\_OPENROUTER\_API\_KEY"

```



Replace the placeholders with your own values. Do not commit real secrets to GitHub.



After using `setx`, open a new terminal so the environment variables are available to newly launched applications.



\### 4. Run the Spring Boot Backend



Open a terminal in the backend directory:



```cmd

cd "Backend AI-MeetingManager\\ai-meeting-task-manager"

```



Run the application using the Maven Wrapper:



```cmd

mvnw.cmd spring-boot:run

```



Ensure that MySQL is running and the required configuration is available before starting the backend.



The application uses port `8081` in the current development configuration. Check `application.properties` if you have changed it.



\### 5. Run the React Frontend



Open a separate terminal in the frontend directory:



```cmd

cd "finalProject-frontend\\AI-MeetingManager"

```



Install the dependencies:



```cmd

npm install

```



Start the development server:



```cmd

npm run dev

```



Open the local URL printed in the terminal by Vite.



\## 🔄 Application Workflow



1\. Register a user account or log in.

2\. Access the task management dashboard.

3\. Create and manage tasks, including their priority and status.

4\. Open the Meeting Analyzer.

5\. Submit meeting text for AI analysis.

6\. Review the generated meeting summary and action items.

7\. Convert relevant action items into tasks and manage them through the application.



\## 🔐 Security Considerations



\- JWT-based authentication is used for protected application functionality.

\- Keep JWT signing secrets and API keys outside the source code.

\- Do not upload `.env` files or other files containing credentials.

\- Configure database credentials securely.

\- Use HTTPS and appropriate production security settings when deploying.



\## 🎯 Project Objectives



\- Practice full-stack application development using React and Spring Boot.

\- Understand REST API communication between frontend and backend.

\- Implement user authentication and authorization.

\- Integrate an external AI API into a Java application.

\- Work with relational database persistence using MySQL.

\- Build a practical workflow that connects meeting analysis with task management.



\## 🔮 Future Enhancements



Potential improvements include:



\- Audio and video meeting transcription.

\- Automated email notifications and task reminders.

\- Improved meeting history and search.

\- Additional automated tests.

\- Production deployment and a live demo.



These are future enhancements, not claims about the current implementation.



\## 👨‍💻 Author



\*\*Kartik Palande\*\*



GitHub: \[Kartikpalande11](https://github.com/Kartikpalande11)



\---



\*MeetFlowAI — Turn meeting discussions into actionable tasks.\*

