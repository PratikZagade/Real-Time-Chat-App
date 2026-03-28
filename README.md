<h1>💬 Real-Time Chat Application</h1>

<p>
A full-stack <b>Real-Time Chat Application</b> that enables instant communication between users using modern technologies.
This project demonstrates <b>real-time messaging</b>, <b>secure authentication</b>, <b>user presence tracking (online/offline)</b>, and scalable backend architecture using WebSockets and REST APIs.
</p>

<p>
<a href="https://drive.google.com/file/d/1z8imYfPWySSUZZNBCYzGo42U2p2xKpZJ/view?t=3.793" target="_blank">
👁️ <b>Watch Demo Video</b>
</a>
</p>

<hr>

<h2>🚀 Features</h2>

<h3>🔐 Authentication & Security</h3>
<ul>
<li>User Registration & Login</li>
<li>JWT-based Authentication</li>
<li>Secure API endpoints using Spring Security</li>
<li>Protected routes and authorization</li>
</ul>

<h3>💬 Real-Time Chat</h3>
<ul>
<li>Instant messaging using WebSockets (STOMP Protocol)</li>
<li>Two-user communication system</li>
<li>Real-time send & receive messages</li>
<li>Persistent WebSocket connection</li>
</ul>

<h3>🟢 User Presence (Online/Offline)</h3>
<ul>
<li>Detect user connection and disconnection</li>
<li>Show online/offline status in UI</li>
<li>Real-time presence updates</li>
</ul>

<h3>🧠 Architecture & Code Quality</h3>
<ul>
<li>Layered Architecture:
<ul>
<li>Controller Layer</li>
<li>Service Layer</li>
<li>Repository Layer</li>
</ul>
</li>
<li>Clean and maintainable code structure</li>
<li>Separation of concerns</li>
</ul>

<h3>⚠️ Exception Handling</h3>
<ul>
<li>Global Exception Handling using <code>@ControllerAdvice</code></li>
<li>Custom Exception classes</li>
<li>Centralized error response handling</li>
</ul>

<h3>🔔 User Experience</h3>
<ul>
<li>Toast Notifications for success & error messages</li>
<li>Responsive UI using Bootstrap</li>
<li>Smooth chat interface</li>
</ul>

<h3>🗄️ Data Persistence</h3>
<ul>
<li>Messages stored in PostgreSQL</li>
<li>Chat history retrieval</li>
<li>User data management</li>
</ul>

<hr>

<h2>🛠️ Tech Stack</h2>

<h3>🎨 Frontend</h3>
<ul>
<li>React.js</li>
<li>Vite</li>
<li>Bootstrap</li>
<li>HTML5</li>
<li>CSS3</li>
<li>Axios</li>
<li>Toast Notification Library</li>
</ul>

<h3>⚙️ Backend</h3>
<ul>
<li>Java</li>
<li>Spring Boot</li>
<li>Spring Security</li>
<li>JWT (JSON Web Token)</li>
<li>WebSocket (STOMP Protocol)</li>
<li>REST APIs</li>
</ul>

<h3>🗄️ Database</h3>
<ul>
<li>PostgreSQL</li>
</ul>

<hr>

<h2>🏗️ Architecture Overview</h2>

<p><b>Client → Controller → Service → Repository → Database</b></p>

<h3>🔹 Controller Layer</h3>
<ul>
<li>AuthController</li>
<li>ChatController</li>
<li>UserController</li>
</ul>

<h3>🔹 Service Layer</h3>
<ul>
<li>AuthService</li>
<li>ChatService</li>
<li>UserService</li>
</ul>

<h3>🔹 Repository Layer</h3>
<ul>
<li>UserRepository</li>
<li>MessageRepository</li>
</ul>

<hr>

<h2>🔐 Authentication Flow</h2>
<ol>
<li>User registers with email & password</li>
<li>User logs in and receives JWT token</li>
<li>Token is stored in localStorage</li>
<li>Token is sent with every API request</li>
<li>Backend validates token using Spring Security</li>
</ol>

<h2>💬 Real-Time Communication Flow</h2>
<ol>
<li>User logs in and connects to WebSocket server</li>
<li>Server registers user session</li>
<li>Users communicate via server</li>
<li>Messages are routed using user identity</li>
<li>Messages are stored in PostgreSQL</li>
<li>Receiver gets messages instantly</li>
</ol>

<h2>🟢 Online/Offline Flow</h2>
<ul>
<li>User connects → <b>Online</b></li>
<li>User disconnects → <b>Offline</b></li>
<li>Status updates in real-time</li>
</ul>

<hr>

<h2>▶️ How to Run</h2>

<h3>Backend</h3>
<pre>
git clone YOUR_REPO_LINK
cd backend
mvn spring-boot:run
</pre>

<h3>Frontend</h3>
<pre>
cd frontend
npm install
npm run dev
</pre>

<hr>

<h2>🧪 Demo Instructions</h2>
<ol>
<li>Open in Normal Browser (User1)</li>
<li>Open in Incognito (User2)</li>
<li>Register & Login both</li>
<li>Start chatting</li>
<li>Check online/offline</li>
<li>Logout</li>
</ol>

<hr>

<h2>👨‍💻 Author</h2>
<p><b>Pratik Zagade</b></p>

<hr>

<h2>⭐ Support</h2>
<p>If you like this project, give it a ⭐ on GitHub!</p>
