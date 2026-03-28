<h1>⚙️ Real-Time Chat Application - Backend</h1>

<p>
This is the <b>backend service</b> of the Real-Time Chat Application built using <b>Spring Boot</b>.
It handles authentication, real-time messaging, user management, and database operations.
</p>

<hr>

<h2>🚀 Features</h2>

<h3>🔐 Authentication & Security</h3>
<ul>
<li>User Registration & Login</li>
<li>JWT-based Authentication</li>
<li>Spring Security integration</li>
<li>Secure REST APIs</li>
</ul>

<h3>💬 Real-Time Messaging</h3>
<ul>
<li>WebSocket implementation using STOMP protocol</li>
<li>User-to-user messaging</li>
<li>Persistent connection for instant communication</li>
</ul>

<h3>🟢 User Presence (Online/Offline)</h3>
<ul>
<li>Detect user connection/disconnection</li>
<li>Track active users</li>
<li>Real-time status updates</li>
</ul>

<h3>⚠️ Exception Handling</h3>
<ul>
<li>Global Exception Handling using <code>@ControllerAdvice</code></li>
<li>Custom exception classes</li>
<li>Consistent error response structure</li>
</ul>

<h3>🗄️ Database Management</h3>
<ul>
<li>PostgreSQL integration</li>
<li>User & Message entities</li>
<li>Data persistence for chat history</li>
</ul>

<hr>

<h2>🛠️ Tech Stack</h2>
<ul>
<li>Java</li>
<li>Spring Boot</li>
<li>Spring Security</li>
<li>JWT (JSON Web Token)</li>
<li>WebSocket (STOMP)</li>
<li>Spring Data JPA</li>
<li>PostgreSQL</li>
</ul>

<hr>

<h2>🏗️ Backend Architecture</h2>
<p><b>Controller → Service → Repository → Database</b></p>

<hr>

<h2>📂 Folder Structure</h2>

<pre>
src/main/java/com/example/demo

├── config
│   ├── CorsConfig.java
│   ├── JwtAuthFilter.java
│   ├── SecurityConfig.java
│   └── WebSocketConfig.java
│
├── controller
│   ├── AuthController.java
│   ├── ChatController.java
│   └── UserController.java
│
├── dto
│   ├── ChatMessageDTO.java
│   ├── LoginRequest.java
│   ├── RegisterRequest.java
│   └── UserDTO.java
│
├── entity
│   ├── User.java
│   └── Message.java
│
├── repository
│   ├── UserRepository.java
│   └── MessageRepository.java
│
├── service
│   ├── AuthService.java
│   ├── ChatService.java
│   └── UserService.java
│
├── serviceimpl
│   ├── AuthServiceImpl.java
│   ├── ChatServiceImpl.java
│   └── UserServiceImpl.java
│
├── security
│   ├── CustomUserDetailsService.java
│   ├── JwtAuthenticationEntryPoint.java
│   └── JwtUtil.java
│
├── websocket
│   ├── ChatWebSocketController.java
│   ├── UserHandshakeInterceptor.java
│   └── WebSocketEventListener.java
│
└── exception
    ├── CustomException.java
    └── GlobalExceptionHandler.java
</pre>

<hr>

<h2>🔌 API Endpoints</h2>

<h3>🔐 Authentication</h3>
<ul>
<li><code>POST /api/auth/register</code></li>
<li><code>POST /api/auth/login</code></li>
</ul>

<h3>💬 Chat</h3>
<ul>
<li><code>GET /api/chat/messages</code></li>
<li><code>POST /api/chat/send</code></li>
</ul>

<hr>

<h2>🔐 Authentication Flow</h2>
<ol>
<li>User registers via API</li>
<li>User logs in and receives JWT token</li>
<li>Token is validated on each request</li>
<li>Secure endpoints are protected</li>
</ol>

<h2>💬 WebSocket Flow</h2>
<ol>
<li>Client connects to WebSocket</li>
<li>Server registers user session</li>
<li>Messages are sent via STOMP protocol</li>
<li>Server routes messages to specific user</li>
<li>Messages are stored in database</li>
</ol>

<h2>🟢 Online/Offline Handling</h2>
<ul>
<li>User connects → <b>Online</b></li>
<li>User disconnects → <b>Offline</b></li>
<li>Managed using WebSocket events</li>
</ul>

<hr>

<h2>▶️ Run Backend</h2>

<pre>
git clone https://github.com/PratikZagade/Real-Time-Chat-App.git
cd backend
mvn spring-boot:run
</pre>

<hr>

<h2>🎯 Learning Outcomes</h2>
<ul>
<li>Built REST APIs using Spring Boot</li>
<li>Implemented JWT authentication</li>
<li>Developed real-time communication using WebSocket</li>
<li>Applied layered architecture</li>
<li>Handled exceptions globally</li>
</ul>

<hr>

<h2>👨‍💻 Author</h2>
<p><b>Pratik Zagade</b></p>

<hr>
