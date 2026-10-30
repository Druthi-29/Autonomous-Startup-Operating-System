import { useState } from "react";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState("Dashboard");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "AI Customer Platform",
      team: "AI Team",
      progress: 78,
      status: "Active",
    },
    {
      id: 2,
      name: "Startup Analytics",
      team: "Analytics Team",
      progress: 55,
      status: "Active",
    },
    {
      id: 3,
      name: "Financial Automation",
      team: "Finance Team",
      progress: 35,
      status: "Planning",
    },
  ]);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Update customer database",
      employee: "Rahul",
      status: "Completed",
      priority: "High",
    },
    {
      id: 2,
      title: "Prepare financial report",
      employee: "Priya",
      status: "In Progress",
      priority: "Medium",
    },
    {
      id: 3,
      title: "Analyze customer feedback",
      employee: "Arjun",
      status: "Pending",
      priority: "High",
    },
  ]);

  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Tech Solutions",
      email: "contact@techsolutions.com",
      status: "Active",
      risk: "Low",
    },
    {
      id: 2,
      name: "Global Systems",
      email: "info@globalsystems.com",
      status: "Active",
      risk: "Medium",
    },
    {
      id: 3,
      name: "Smart Industries",
      email: "hello@smartindustries.com",
      status: "At Risk",
      risk: "High",
    },
  ]);

  const [employees] = useState([
    {
      name: "Rahul Kumar",
      role: "Software Developer",
      department: "Technology",
      tasks: 8,
    },
    {
      name: "Priya Sharma",
      role: "Financial Analyst",
      department: "Finance",
      tasks: 5,
    },
    {
      name: "Arjun Reddy",
      role: "Marketing Manager",
      department: "Marketing",
      tasks: 6,
    },
    {
      name: "Sneha Rao",
      role: "AI Engineer",
      department: "AI & ML",
      tasks: 9,
    },
  ]);

  const login = (e) => {
    e.preventDefault();

    if (
      email === "admin@autonomousos.com" &&
      password === "admin123"
    ) {
      setLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError(
        "Invalid login. Use admin@autonomousos.com / admin123"
      );
    }
  };

  if (!loggedIn) {
    return (
      <div className="login-page">
        <div className="login-box">

          <div className="brand-logo">AI</div>

          <h1>AUTONOMOUS OS</h1>

          <p className="brand-subtitle">
            Startup Intelligence Platform
          </p>

          <div className="login-title">
            <h2>Welcome Back 👋</h2>
            <p>Sign in to your autonomous startup workspace.</p>
          </div>

          <form onSubmit={login}>

            <label>Email Address</label>

            <input
              type="email"
              placeholder="admin@autonomousos.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {loginError && (
              <div className="login-error">
                {loginError}
              </div>
            )}

            <button className="login-btn">
              Login →
            </button>

          </form>

          <div className="demo-box">
            <b>Demo Login</b>
            <span>admin@autonomousos.com</span>
            <span>Password: admin123</span>
          </div>

        </div>
      </div>
    );
  }

  const menuItems = [
    ["📊", "Dashboard"],
    ["🤖", "AI Assistant"],
    ["📁", "Projects"],
    ["✓", "Tasks"],
    ["👥", "Customers"],
    ["👨‍💼", "Employees"],
    ["💰", "Finance"],
    ["⚠️", "Risk Detection"],
    ["📈", "Analytics"],
    ["📄", "Reports"],
  ];

  return (
    <div className="app">

      {/* SIDEBAR */}

      <aside className="sidebar">

        <div className="app-brand">

          <div className="brand-icon">
            AI
          </div>

          <div>
            <h2>AUTONOMOUS OS</h2>
            <p>Startup Intelligence</p>
          </div>

        </div>

        <div className="menu-label">
          MAIN MENU
        </div>

        {menuItems.map(([icon, name]) => (
          <button
            key={name}
            className={
              page === name
                ? "side-button selected"
                : "side-button"
            }
            onClick={() => setPage(name)}
          >
            <span>{icon}</span>
            {name}
          </button>
        ))}

        <div className="sidebar-bottom">

          <button
            className={
              page === "Settings"
                ? "side-button selected"
                : "side-button"
            }
            onClick={() => setPage("Settings")}
          >
            ⚙️ Settings
          </button>

          <div className="sidebar-user">

            <div className="user-avatar">
              D
            </div>

            <div>
              <b>Druthi</b>
              <small>Administrator</small>
            </div>

          </div>

          <button
            className="logout-button"
            onClick={() => setLoggedIn(false)}
          >
            🚪 Logout
          </button>

        </div>

      </aside>


      {/* MAIN */}

      <main className="main">

        {/* TOP BAR */}

        <header className="topbar">

          <div className="search">

            🔍

            <input
              placeholder="Search apps, workflows, agents..."
            />

            <span className="shortcut">
              Ctrl K
            </span>

          </div>

          <div className="top-actions">

            <button className="god-mode">
              ⚡ God Mode
            </button>

            <button className="bell">
              🔔
              <span>3</span>
            </button>

            <div className="system-status">
              <i></i>
              All Systems Active
            </div>

          </div>

        </header>


        {/* PAGE */}

        {page === "Dashboard" && (
          <Dashboard
            setPage={setPage}
            projects={projects}
            tasks={tasks}
            customers={customers}
          />
        )}

        {page === "AI Assistant" && (
          <AIAssistant />
        )}

        {page === "Projects" && (
          <Projects
            projects={projects}
            setProjects={setProjects}
          />
        )}

        {page === "Tasks" && (
          <Tasks
            tasks={tasks}
            setTasks={setTasks}
          />
        )}

        {page === "Customers" && (
          <Customers
            customers={customers}
            setCustomers={setCustomers}
          />
        )}

        {page === "Employees" && (
          <Employees employees={employees} />
        )}

        {page === "Finance" && (
          <Finance />
        )}

        {page === "Risk Detection" && (
          <RiskDetection />
        )}

        {page === "Analytics" && (
          <Analytics />
        )}

        {page === "Reports" && (
          <Reports />
        )}

        {page === "Settings" && (
          <Settings setLoggedIn={setLoggedIn} />
        )}

      </main>

    </div>
  );
}


/* =====================================================
   DASHBOARD
===================================================== */

function Dashboard({ setPage }) {
  return (
    <div className="page">

      <div className="hero">

        <div>

          <span className="badge">
            AUTONOMOUS OS v1.0
          </span>

          <h1>
            Welcome to <span>AUTONOMOUS OS</span>
          </h1>

          <p>
            Your autonomous startup operating system.
            Build, manage and grow your startup with
            AI-powered intelligence and automation.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() => setPage("Projects")}
            >
              ⚡ Start Building
            </button>

            <button className="secondary-btn">
              View Documentation →
            </button>

          </div>

        </div>

        <div className="hero-ai">
          🤖
        </div>

      </div>


      {/* STAT CARDS */}

      <div className="stat-grid">

        <Stat
          icon="💰"
          value="₹4.28 L"
          title="Total Revenue"
          change="+12.5%"
        />

        <Stat
          icon="📁"
          value="18"
          title="Active Projects"
          change="+3"
        />

        <Stat
          icon="✓"
          value="24"
          title="Pending Tasks"
          change="8 Due Today"
        />

        <Stat
          icon="👥"
          value="1,248"
          title="Customers"
          change="+18.2%"
        />

      </div>


      <div className="two-column">

        {/* PERFORMANCE */}

        <div className="panel">

          <div className="panel-heading">

            <div>
              <h2>Business Performance</h2>
              <p>Monthly startup growth</p>
            </div>

            <select>
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>

          </div>

          <div className="chart">

            <div className="bar b1"></div>
            <div className="bar b2"></div>
            <div className="bar b3"></div>
            <div className="bar b4"></div>
            <div className="bar b5"></div>
            <div className="bar b6"></div>

          </div>

          <div className="chart-labels">
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
          </div>

        </div>


        {/* AI RECOMMENDATIONS */}

        <div className="panel">

          <div className="panel-heading">

            <div>
              <h2>AI Recommendations</h2>
              <p>Smart insights for your business</p>
            </div>

            <span className="ai-badge">
              AI
            </span>

          </div>

          <Recommendation
            icon="📈"
            title="Revenue Opportunity"
            text="Potential 15% revenue increase detected."
          />

          <Recommendation
            icon="⚡"
            title="Improve Productivity"
            text="8 tasks are approaching their deadlines."
          />

          <Recommendation
            icon="⚠️"
            title="Risk Detected"
            text="Customer churn probability has increased."
          />

          <button
            className="text-btn"
            onClick={() => setPage("Risk Detection")}
          >
            View All Recommendations →
          </button>

        </div>

      </div>


      <div className="two-column">

        {/* RECENT ACTIVITY */}

        <div className="panel">

          <div className="panel-heading">

            <div>
              <h2>Recent Activity</h2>
              <p>Latest startup activities</p>
            </div>

            <button className="text-btn">
              View All
            </button>

          </div>

          <Activity
            icon="✓"
            title="Customer database updated"
            time="5 minutes ago"
            status="Success"
          />

          <Activity
            icon="⚡"
            title="AI business analysis completed"
            time="12 minutes ago"
            status="Active"
          />

          <Activity
            icon="🤖"
            title='AI Agent "Risk Detector" executed'
            time="1 hour ago"
            status="Success"
          />

          <Activity
            icon="⚠️"
            title="Customer churn risk detected"
            time="2 hours ago"
            status="Warning"
          />

        </div>


        {/* QUICK ACTIONS */}

        <div className="panel">

          <h2>Quick Actions</h2>

          <button
            className="quick-action"
            onClick={() => setPage("Projects")}
          >
            📁 New Project
          </button>

          <button
            className="quick-action"
            onClick={() => setPage("Tasks")}
          >
            ✓ New Task
          </button>

          <button
            className="quick-action"
            onClick={() => setPage("Customers")}
          >
            👥 Add Customer
          </button>

          <button
            className="quick-action primary-action"
            onClick={() => setPage("AI Assistant")}
          >
            🤖 Open AI Assistant
          </button>

        </div>

      </div>

    </div>
  );
}


/* =====================================================
   AI ASSISTANT
===================================================== */

function AIAssistant() {

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const answer = () => {

    if (!question.trim()) return;

    let response =
      "I can help you analyze your startup's projects, tasks, customers, finance and risks.";

    const q = question.toLowerCase();

    if (q.includes("revenue")) {
      response =
        "Your current total revenue is ₹4.28 L and revenue growth is 12.5%.";
    }

    if (q.includes("customer")) {
      response =
        "Your startup currently has 1,248 customers. Customer churn risk should be monitored.";
    }

    if (q.includes("task")) {
      response =
        "There are 24 pending tasks and 8 tasks are due today.";
    }

    if (q.includes("project")) {
      response =
        "There are 18 active projects. Regular progress monitoring is recommended.";
    }

    if (q.includes("risk")) {
      response =
        "A high customer churn risk has been detected. Review customer feedback and engagement.";
    }

    setMessages([
      ...messages,
      { type: "user", text: question },
      { type: "ai", text: response },
    ]);

    setQuestion("");
  };

  return (
    <div className="page">

      <div className="page-title">
        <h1>AI Assistant</h1>
        <p>
          Your intelligent startup business assistant.
        </p>
      </div>

      <div className="ai-panel">

        <div className="ai-header">
          <div className="large-ai">
            🤖
          </div>

          <div>
            <h2>Startup AI Assistant</h2>
            <p>
              Ask me anything about your business.
            </p>
          </div>
        </div>

        <div className="chat-area">

          {messages.length === 0 && (
            <div className="welcome-ai">
              <div>🤖</div>
              <h2>Hello, Druthi 👋</h2>
              <p>
                How can I help you manage your startup today?
              </p>
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.type === "user"
                  ? "chat-user"
                  : "chat-ai"
              }
            >
              <b>
                {msg.type === "user"
                  ? "You"
                  : "AI Assistant"}
              </b>
              <p>{msg.text}</p>
            </div>
          ))}

        </div>

        <div className="ai-suggestions">

          <button
            onClick={() => setQuestion("Analyze my revenue")}
          >
            📊 Revenue Analysis
          </button>

          <button
            onClick={() => setQuestion("What are my risks?")}
          >
            ⚠️ Risk Analysis
          </button>

          <button
            onClick={() => setQuestion("Analyze my projects")}
          >
            📁 Project Analysis
          </button>

          <button
            onClick={() => setQuestion("How many tasks are pending?")}
          >
            ✓ Task Analysis
          </button>

        </div>

        <div className="chat-input">

          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") answer();
            }}
            placeholder="Ask your AI assistant..."
          />

          <button onClick={answer}>
            Send ➤
          </button>

        </div>

      </div>

    </div>
  );
}


/* =====================================================
   PROJECTS
===================================================== */

function Projects({ projects, setProjects }) {

  const [name, setName] = useState("");

  const addProject = () => {

    if (!name.trim()) return;

    setProjects([
      ...projects,
      {
        id: Date.now(),
        name,
        team: "New Team",
        progress: 0,
        status: "Planning",
      },
    ]);

    setName("");
  };

  return (
    <div className="page">

      <div className="page-title">
        <h1>Projects</h1>
        <p>Manage all startup projects.</p>
      </div>

      <div className="add-box">

        <input
          placeholder="Enter new project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button onClick={addProject}>
          + Add Project
        </button>

      </div>

      <div className="project-grid">

        {projects.map((project) => (
          <div className="project-card" key={project.id}>

            <div className="project-top">
              <span>📁</span>
              <span className="status">
                {project.status}
              </span>
            </div>

            <h2>{project.name}</h2>

            <p>{project.team}</p>

            <div className="progress-label">
              <span>Progress</span>
              <b>{project.progress}%</b>
            </div>

            <div className="progress-bar">
              <div
                style={{
                  width: `${project.progress}%`,
                }}
              ></div>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}


/* =====================================================
   TASKS
===================================================== */

function Tasks({ tasks, setTasks }) {

  const [title, setTitle] = useState("");

  const addTask = () => {

    if (!title.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title,
        employee: "Unassigned",
        status: "Pending",
        priority: "Medium",
      },
    ]);

    setTitle("");
  };

  return (
    <div className="page">

      <div className="page-title">
        <h1>Tasks</h1>
        <p>Manage startup tasks and team activities.</p>
      </div>

      <div className="add-box">

        <input
          placeholder="Enter task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={addTask}>
          + Add Task
        </button>

      </div>

      <div className="table-panel">

        <table>

          <thead>
            <tr>
              <th>Task</th>
              <th>Assigned To</th>
              <th>Priority</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {tasks.map((task) => (
              <tr key={task.id}>

                <td>{task.title}</td>
                <td>{task.employee}</td>
                <td>
                  <span className="priority">
                    {task.priority}
                  </span>
                </td>
                <td>
                  <span className="status">
                    {task.status}
                  </span>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}


/* =====================================================
   CUSTOMERS
===================================================== */

function Customers({ customers, setCustomers }) {

  const [name, setName] = useState("");

  const addCustomer = () => {

    if (!name.trim()) return;

    setCustomers([
      ...customers,
      {
        id: Date.now(),
        name,
        email: "newcustomer@example.com",
        status: "Active",
        risk: "Low",
      },
    ]);

    setName("");
  };

  return (
    <div className="page">

      <div className="page-title">
        <h1>Customers</h1>
        <p>Manage customers and monitor customer health.</p>
      </div>

      <div className="add-box">

        <input
          placeholder="Customer name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button onClick={addCustomer}>
          + Add Customer
        </button>

      </div>

      <div className="customer-grid">

        {customers.map((customer) => (
          <div className="customer-card" key={customer.id}>

            <div className="customer-avatar">
              {customer.name.charAt(0)}
            </div>

            <div>
              <h3>{customer.name}</h3>
              <p>{customer.email}</p>

              <span className="status">
                {customer.status}
              </span>

              <span className="risk">
                Risk: {customer.risk}
              </span>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}


/* =====================================================
   EMPLOYEES
===================================================== */

function Employees({ employees }) {

  return (
    <div className="page">

      <div className="page-title">
        <h1>Employees</h1>
        <p>Manage your startup team.</p>
      </div>

      <div className="employee-grid">

        {employees.map((employee) => (
          <div className="employee-card" key={employee.name}>

            <div className="employee-avatar">
              {employee.name.charAt(0)}
            </div>

            <h2>{employee.name}</h2>

            <p>{employee.role}</p>

            <span>
              {employee.department}
            </span>

            <div className="employee-tasks">
              {employee.tasks} active tasks
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}


/* =====================================================
   FINANCE
===================================================== */

function Finance() {

  return (
    <div className="page">

      <div className="page-title">
        <h1>Finance</h1>
        <p>Monitor your startup financial performance.</p>
      </div>

      <div className="finance-grid">

        <Stat
          icon="💰"
          value="₹4.28 L"
          title="Revenue"
          change="+12.5%"
        />

        <Stat
          icon="💸"
          value="₹1.62 L"
          title="Expenses"
          change="+5.2%"
        />

        <Stat
          icon="📈"
          value="₹2.66 L"
          title="Profit"
          change="+18.7%"
        />

      </div>

      <div className="panel">

        <h2>Financial Overview</h2>

        <div className="finance-chart">

          <div style={{ height: "45%" }}></div>
          <div style={{ height: "65%" }}></div>
          <div style={{ height: "55%" }}></div>
          <div style={{ height: "78%" }}></div>
          <div style={{ height: "70%" }}></div>
          <div style={{ height: "92%" }}></div>

        </div>

      </div>

    </div>
  );
}


/* =====================================================
   RISK
===================================================== */

function RiskDetection() {

  return (
    <div className="page">

      <div className="page-title">
        <h1>Risk Detection</h1>
        <p>AI-powered startup risk monitoring.</p>
      </div>

      <div className="risk-grid">

        <Risk
          icon="🔴"
          title="Customer Churn"
          level="High"
          text="Customer churn probability has increased."
        />

        <Risk
          icon="🟡"
          title="Project Delay"
          level="Medium"
          text="Some project deadlines are approaching."
        />

        <Risk
          icon="🟢"
          title="Financial Stability"
          level="Low"
          text="Current financial performance is stable."
        />

      </div>

    </div>
  );
}


/* =====================================================
   ANALYTICS
===================================================== */

function Analytics() {

  return (
    <div className="page">

      <div className="page-title">
        <h1>Analytics</h1>
        <p>Business intelligence and performance analytics.</p>
      </div>

      <div className="analytics-grid">

        <div className="panel">
          <h2>Revenue Growth</h2>
          <h1>+12.5%</h1>
          <p>Compared with previous period</p>
        </div>

        <div className="panel">
          <h2>Customer Growth</h2>
          <h1>+18.2%</h1>
          <p>Customer base is growing</p>
        </div>

        <div className="panel">
          <h2>Productivity</h2>
          <h1>86%</h1>
          <p>Overall team productivity</p>
        </div>

      </div>

    </div>
  );
}


/* =====================================================
   REPORTS
===================================================== */

function Reports() {

  return (
    <div className="page">

      <div className="page-title">
        <h1>Reports</h1>
        <p>Generate and manage startup reports.</p>
      </div>

      <div className="report-grid">

        <Report
          icon="💰"
          title="Financial Report"
          text="Revenue, expenses and profit analysis."
        />

        <Report
          icon="📁"
          title="Project Report"
          text="Project progress and performance."
        />

        <Report
          icon="👥"
          title="Customer Report"
          text="Customer growth and churn analysis."
        />

        <Report
          icon="👨‍💼"
          title="Employee Report"
          text="Team workload and productivity."
        />

      </div>

    </div>
  );
}


/* =====================================================
   SETTINGS
===================================================== */

function Settings({ setLoggedIn }) {

  return (
    <div className="page">

      <div className="page-title">
        <h1>Settings</h1>
        <p>Manage your Autonomous OS account.</p>
      </div>

      <div className="settings-panel">

        <h2>Profile</h2>

        <div className="setting-row">
          <span>Name</span>
          <b>Druthi</b>
        </div>

        <div className="setting-row">
          <span>Role</span>
          <b>Administrator</b>
        </div>

        <div className="setting-row">
          <span>Email</span>
          <b>admin@autonomousos.com</b>
        </div>

        <h2>System</h2>

        <div className="setting-row">
          <span>AI Services</span>
          <b className="online">Active</b>
        </div>

        <div className="setting-row">
          <span>Notifications</span>
          <b className="online">Enabled</b>
        </div>

        <button
          className="danger-btn"
          onClick={() => setLoggedIn(false)}
        >
          Logout
        </button>

      </div>

    </div>
  );
}


/* =====================================================
   SMALL COMPONENTS
===================================================== */

function Stat({ icon, value, title, change }) {

  return (
    <div className="stat-card">

      <div className="stat-top">
        <div className="stat-icon">
          {icon}
        </div>

        <span>
          {change}
        </span>
      </div>

      <p>{title}</p>

      <h2>{value}</h2>

    </div>
  );
}


function Recommendation({ icon, title, text }) {

  return (
    <div className="recommendation">

      <span>
        {icon}
      </span>

      <div>
        <b>{title}</b>
        <p>{text}</p>
      </div>

    </div>
  );
}


function Activity({ icon, title, time, status }) {

  return (
    <div className="activity">

      <span className="activity-icon">
        {icon}
      </span>

      <div>
        <b>{title}</b>
        <small>{time}</small>
      </div>

      <label>
        {status}
      </label>

    </div>
  );
}


function Risk({ icon, title, level, text }) {

  return (
    <div className="risk-card">

      <div className="risk-icon">
        {icon}
      </div>

      <h2>{title}</h2>

      <span>{level} Risk</span>

      <p>{text}</p>

      <button>
        View Details →
      </button>

    </div>
  );
}


function Report({ icon, title, text }) {

  return (
    <div className="report-card">

      <div className="report-icon">
        {icon}
      </div>

      <h2>{title}</h2>

      <p>{text}</p>

      <button>
        Generate Report →
      </button>

    </div>
  );
}

export default App;