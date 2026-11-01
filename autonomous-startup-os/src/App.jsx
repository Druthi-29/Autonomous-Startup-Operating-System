import { useState } from "react";
import "./App.css";
import Login from "./components/Login";

const navigation = [
  { name: "Dashboard", icon: "🏠" },
  { name: "AI Assistant", icon: "🤖" },
  { name: "Projects", icon: "📁" },
  { name: "Tasks", icon: "✅" },
  { name: "Customers", icon: "👥" },
  { name: "Employees", icon: "🧑‍💼" },
  { name: "Finance", icon: "💰" },
  { name: "Risk Detection", icon: "🛡️" },
  { name: "Analytics", icon: "📊" },
  { name: "Reports", icon: "📄" },
  { name: "Settings", icon: "⚙️" },
];

const initialProjects = [
  { id: 1, name: "Website Redesign", owner: "Priya", status: "In Progress", progress: 72 },
  { id: 2, name: "AI Customer Support", owner: "Rahul", status: "Planning", progress: 25 },
  { id: 3, name: "Mobile Application", owner: "Ananya", status: "In Progress", progress: 54 },
  { id: 4, name: "Marketing Campaign", owner: "Arjun", status: "Completed", progress: 100 },
];

const initialTasks = [
  { id: 1, title: "Review project proposal", assignee: "Priya", priority: "High", done: false },
  { id: 2, title: "Update customer dashboard", assignee: "Rahul", priority: "Medium", done: false },
  { id: 3, title: "Prepare monthly report", assignee: "Ananya", priority: "Low", done: true },
  { id: 4, title: "Test login functionality", assignee: "Arjun", priority: "High", done: false },
];

const initialCustomers = [
  { id: 1, name: "Aarav Sharma", email: "aarav@example.com", company: "Aarav Technologies", status: "Active" },
  { id: 2, name: "Meera Reddy", email: "meera@example.com", company: "Bright Solutions", status: "Active" },
  { id: 3, name: "Kabir Patel", email: "kabir@example.com", company: "NextGen Labs", status: "Pending" },
];

const initialEmployees = [
  { id: 1, name: "Priya Kumar", role: "Project Manager", department: "Operations" },
  { id: 2, name: "Rahul Verma", role: "Developer", department: "Engineering" },
  { id: 3, name: "Ananya Rao", role: "Data Analyst", department: "Analytics" },
  { id: 4, name: "Arjun Singh", role: "Designer", department: "Product" },
];

function PageHeading({ title, subtitle, action, onAction }) {
  return (
    <div className="page-heading">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      {action && (
        <button className="primary-btn" onClick={onAction}>
          {action}
        </button>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, note }) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <span className="stat-icon">{icon}</span>
        <span className="stat-note">{note}</span>
      </div>
      <p>{label}</p>
      <h2>{value}</h2>
    </div>
  );
}

function SimpleTable({ headers, rows }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.length > 0 ? (
            rows.map((row, index) => (
              <tr key={row.id ?? index}>
                {row.cells.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className="empty-state">
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

/* DASHBOARD */

function Dashboard({ projects, tasks, customers, setActivePage }) {
  const completedTasks = tasks.filter((task) => task.done).length;

  return (
    <>
      <PageHeading
        title="Dashboard"
        subtitle="Here's what's happening with your startup today."
      />

      <div className="stat-grid">
        <StatCard icon="💰" label="Total Revenue" value="₹4.28 L" note="+12.5%" />

        <StatCard
          icon="📁"
          label="Active Projects"
          value={projects.filter((project) => project.status !== "Completed").length}
          note="+3"
        />

        <StatCard
          icon="✅"
          label="Pending Tasks"
          value={tasks.filter((task) => !task.done).length}
          note="Updated"
        />

        <StatCard
          icon="👥"
          label="Customers"
          value={customers.length.toLocaleString()}
          note="+18.2%"
        />
      </div>

      <div className="content-grid">
        <section className="panel">
          <div className="panel-heading">
            <h2>Project Overview</h2>
            <button className="text-btn" onClick={() => setActivePage("Projects")}>
              View all →
            </button>
          </div>

          {projects.slice(0, 4).map((project) => (
            <div className="progress-item" key={project.id}>
              <div className="progress-label">
                <strong>{project.name}</strong>
                <span>{project.progress}%</span>
              </div>

              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          ))}
        </section>

        <section className="panel">
          <div className="panel-heading">
            <h2>Tasks & Activity</h2>
            <button className="text-btn" onClick={() => setActivePage("Tasks")}>
              View tasks →
            </button>
          </div>

          <p className="big-number">
            {completedTasks}
            <span> / {tasks.length} tasks completed</span>
          </p>

          {tasks.slice(0, 4).map((task) => (
            <div className="activity-item" key={task.id}>
              <span className={task.done ? "activity-check done" : "activity-check"}>
                {task.done ? "✓" : "○"}
              </span>

              <div>
                <strong>{task.title}</strong>
                <small>
                  {task.assignee} · {task.priority} priority
                </small>
              </div>
            </div>
          ))}
        </section>
      </div>

      <section className="panel quick-actions">
        <h2>AI Quick Actions</h2>

        <div className="action-grid">
          {[
            "Analyze Business Performance",
            "Identify Business Risks",
            "Suggest Project Improvements",
            "Analyze Financial Performance",
          ].map((action) => (
            <button
              key={action}
              className="action-card"
              onClick={() => setActivePage("AI Assistant")}
            >
              🤖 <span>{action}</span> <b>→</b>
            </button>
          ))}
        </div>
      </section>
    </>
  );
}

/* AI ASSISTANT */

function AIAssistant() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");

  function askAI(question) {
    if (!question.trim()) return;

    setAnswer(
      `Analysis for: "${question}"\n\nThis demo assistant can help organize your startup workflow. Review your project progress, pending tasks, customer feedback, and financial records. Use the relevant page to update your data, then return here for another analysis.`
    );

    setPrompt(question);
  }

  const quickActions = [
    "Analyze business performance",
    "Identify business risks",
    "Suggest project improvements",
    "Analyze financial performance",
  ];

  return (
    <>
      <PageHeading
        title="AI Assistant"
        subtitle="Ask questions and explore AI-powered startup insights."
      />

      <section className="panel ai-panel">
        <div className="ai-welcome">
          <span className="ai-large-icon">🤖</span>
          <h2>How can I help your startup?</h2>
          <p>Choose a quick action or enter a question below.</p>
        </div>

        <div className="action-grid">
          {quickActions.map((action) => (
            <button
              className="action-card"
              key={action}
              onClick={() => askAI(action)}
            >
              ✨ <span>{action}</span> <b>→</b>
            </button>
          ))}
        </div>

        <form
          className="ai-input-row"
          onSubmit={(event) => {
            event.preventDefault();
            askAI(prompt);
          }}
        >
          <input
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="Ask about projects, finance, customers..."
          />

          <button className="primary-btn" type="submit">
            Ask AI
          </button>
        </form>

        {answer && (
          <div className="ai-answer">
            <h3>AI Insight</h3>
            <p>{answer}</p>
          </div>
        )}

        <p className="small-note">
          Demo interface: this sample response is generated locally and is not
          connected to a live AI model.
        </p>
      </section>
    </>
  );
}

/* PROJECTS */

function Projects({ projects, setProjects }) {
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [showForm, setShowForm] = useState(false);

  function addProject(event) {
    event.preventDefault();

    if (!name.trim()) return;

    setProjects((items) => [
      ...items,
      {
        id: Date.now(),
        name: name.trim(),
        owner: owner.trim() || "Unassigned",
        status: "Planning",
        progress: 0,
      },
    ]);

    setName("");
    setOwner("");
    setShowForm(false);
  }

  return (
    <>
      <PageHeading
        title="Projects"
        subtitle="Create projects and track their progress."
        action={showForm ? "Cancel" : "+ New Project"}
        onAction={() => setShowForm(!showForm)}
      />

      {showForm && (
        <form className="panel inline-form" onSubmit={addProject}>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Project name"
            required
          />

          <input
            value={owner}
            onChange={(event) => setOwner(event.target.value)}
            placeholder="Project owner"
          />

          <button className="primary-btn">Add Project</button>
        </form>
      )}

      <section className="panel">
        <SimpleTable
          headers={["Project", "Owner", "Status", "Progress"]}
          rows={projects.map((project) => ({
            id: project.id,
            cells: [
              project.name,
              project.owner,
              <span className="status-pill" key="status">
                {project.status}
              </span>,
              `${project.progress}%`,
            ],
          }))}
        />
      </section>
    </>
  );
}

/* TASKS */

function Tasks({ tasks, setTasks }) {
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("");

  function addTask(event) {
    event.preventDefault();

    if (!title.trim()) return;

    setTasks((items) => [
      ...items,
      {
        id: Date.now(),
        title: title.trim(),
        assignee: assignee.trim() || "Unassigned",
        priority: "Medium",
        done: false,
      },
    ]);

    setTitle("");
    setAssignee("");
  }

  return (
    <>
      <PageHeading
        title="Tasks"
        subtitle="Create tasks and mark work as completed."
      />

      <form className="panel inline-form" onSubmit={addTask}>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter a task"
          required
        />

        <input
          value={assignee}
          onChange={(event) => setAssignee(event.target.value)}
          placeholder="Assign to"
        />

        <button className="primary-btn">Add Task</button>
      </form>

      <section className="panel task-list">
        {tasks.map((task) => (
          <div className="task-row" key={task.id}>
            <label>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() =>
                  setTasks((items) =>
                    items.map((item) =>
                      item.id === task.id
                        ? { ...item, done: !item.done }
                        : item
                    )
                  )
                }
              />

              <span className={task.done ? "task-done" : ""}>
                {task.title}
              </span>
            </label>

            <span>{task.assignee}</span>

            <span className="status-pill">
              {task.done ? "Completed" : task.priority}
            </span>
          </div>
        ))}
      </section>
    </>
  );
}

/* CUSTOMERS */

function Customers({ customers, setCustomers }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  function addCustomer(event) {
    event.preventDefault();

    if (!name.trim()) return;

    setCustomers((items) => [
      ...items,
      {
        id: Date.now(),
        name: name.trim(),
        email: email.trim(),
        company: company.trim() || "—",
        status: "Active",
      },
    ]);

    setName("");
    setEmail("");
    setCompany("");
  }

  return (
    <>
      <PageHeading
        title="Customers"
        subtitle="Manage customer contacts and account status."
      />

      <form className="panel inline-form" onSubmit={addCustomer}>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Customer name"
          required
        />

        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email address"
        />

        <input
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          placeholder="Company"
        />

        <button className="primary-btn">Add Customer</button>
      </form>

      <section className="panel">
        <SimpleTable
          headers={["Name", "Email", "Company", "Status"]}
          rows={customers.map((customer) => ({
            id: customer.id,
            cells: [
              customer.name,
              customer.email || "—",
              customer.company,
              <span className="status-pill" key="status">
                {customer.status}
              </span>,
            ],
          }))}
        />
      </section>
    </>
  );
}

/* EMPLOYEES */

function Employees({ employees, setEmployees }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");

  function addEmployee(event) {
    event.preventDefault();

    if (!name.trim()) return;

    setEmployees((items) => [
      ...items,
      {
        id: Date.now(),
        name: name.trim(),
        role: role.trim() || "Team Member",
        department: department.trim() || "General",
      },
    ]);

    setName("");
    setRole("");
    setDepartment("");
  }

  return (
    <>
      <PageHeading
        title="Employees"
        subtitle="View your team and add team members."
      />

      <form className="panel inline-form" onSubmit={addEmployee}>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Employee name"
          required
        />

        <input
          value={role}
          onChange={(event) => setRole(event.target.value)}
          placeholder="Role"
        />

        <input
          value={department}
          onChange={(event) => setDepartment(event.target.value)}
          placeholder="Department"
        />

        <button className="primary-btn">Add Employee</button>
      </form>

      <section className="panel">
        <SimpleTable
          headers={["Employee", "Role", "Department"]}
          rows={employees.map((employee) => ({
            id: employee.id,
            cells: [employee.name, employee.role, employee.department],
          }))}
        />
      </section>
    </>
  );
}

/* FINANCE */

function Finance() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Income");

  const [entries, setEntries] = useState([
    { id: 1, amount: 428000, description: "Sales revenue", type: "Income" },
    { id: 2, amount: 85000, description: "Operating expenses", type: "Expense" },
  ]);

  const income = entries
    .filter((entry) => entry.type === "Income")
    .reduce((sum, entry) => sum + entry.amount, 0);

  const expenses = entries
    .filter((entry) => entry.type === "Expense")
    .reduce((sum, entry) => sum + entry.amount, 0);

  function addEntry(event) {
    event.preventDefault();

    if (!Number(amount) || Number(amount) <= 0) return;

    setEntries((items) => [
      ...items,
      {
        id: Date.now(),
        amount: Number(amount),
        description: description.trim() || "Entry",
        type,
      },
    ]);

    setAmount("");
    setDescription("");
  }

  return (
    <>
      <PageHeading
        title="Finance"
        subtitle="Track income, expenses, and your current balance."
      />

      <div className="stat-grid">
        <StatCard
          icon="📈"
          label="Income"
          value={`₹${income.toLocaleString("en-IN")}`}
          note="Total"
        />

        <StatCard
          icon="📉"
          label="Expenses"
          value={`₹${expenses.toLocaleString("en-IN")}`}
          note="Total"
        />

        <StatCard
          icon="💳"
          label="Net Balance"
          value={`₹${(income - expenses).toLocaleString("en-IN")}`}
          note="Balance"
        />
      </div>

      <form className="panel inline-form" onSubmit={addEntry}>
        <select value={type} onChange={(event) => setType(event.target.value)}>
          <option>Income</option>
          <option>Expense</option>
        </select>

        <input
          type="number"
          min="1"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          placeholder="Amount (₹)"
          required
        />

        <input
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Description"
        />

        <button className="primary-btn">Add Entry</button>
      </form>

      <section className="panel">
        <SimpleTable
          headers={["Description", "Type", "Amount"]}
          rows={entries.map((entry) => ({
            id: entry.id,
            cells: [
              entry.description,
              entry.type,
              `₹${entry.amount.toLocaleString("en-IN")}`,
            ],
          }))}
        />
      </section>
    </>
  );
}

/* RISK DETECTION */

function RiskDetection() {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <PageHeading
        title="Risk Detection"
        subtitle="Review sample business risks and recommended actions."
        action="Run Risk Scan"
        onAction={() => setChecked(true)}
      />

      {checked && (
        <div className="notice">
          Demo scan complete. Review the sample risk items below.
        </div>
      )}

      <div className="risk-grid">
        <div className="risk-card risk-high">
          <span>HIGH RISK</span>
          <h3>Cash-flow pressure</h3>
          <p>Monitor upcoming payments and maintain an operating reserve.</p>
          <strong>Recommended: Update cash-flow forecast</strong>
        </div>

        <div className="risk-card risk-medium">
          <span>MEDIUM RISK</span>
          <h3>Project deadline</h3>
          <p>One project may need additional time to meet its target date.</p>
          <strong>Recommended: Review task assignments</strong>
        </div>

        <div className="risk-card risk-low">
          <span>LOW RISK</span>
          <h3>Customer follow-up</h3>
          <p>Some customer contacts may need a follow-up.</p>
          <strong>Recommended: Schedule customer check-ins</strong>
        </div>
      </div>

      <p className="small-note">
        These are example risks, not a live analysis of your business.
      </p>
    </>
  );
}

/* ANALYTICS */

function Analytics() {
  const data = [
    { label: "Jan", value: 45 },
    { label: "Feb", value: 62 },
    { label: "Mar", value: 55 },
    { label: "Apr", value: 78 },
    { label: "May", value: 90 },
    { label: "Jun", value: 72 },
  ];

  return (
    <>
      <PageHeading
        title="Analytics"
        subtitle="A simple overview of sample startup performance."
      />

      <div className="stat-grid">
        <StatCard icon="📊" label="Growth" value="18.2%" note="Sample" />
        <StatCard icon="🎯" label="Conversion" value="6.8%" note="Sample" />
        <StatCard icon="⭐" label="Customer rating" value="4.7/5" note="Sample" />
      </div>

      <section className="panel">
        <h2>Monthly Performance</h2>

        <div className="bar-chart">
          {data.map((item) => (
            <div className="bar-column" key={item.label}>
              <span>{item.value}</span>
              <div className="bar" style={{ height: `${item.value}%` }} />
              <small>{item.label}</small>
            </div>
          ))}
        </div>
      </section>

      <p className="small-note">
        Chart values are sample data for demonstration.
      </p>
    </>
  );
}

/* UPDATED REPORTS COMPONENT */

function Reports({ projects, tasks, customers, employees }) {
  const [report, setReport] = useState("Business Summary");
  const [showPreview, setShowPreview] = useState(false);

  function getReportData() {
    switch (report) {
      case "Project Status":
        return projects.map((project) => ({
          Project: project.name,
          Owner: project.owner,
          Status: project.status,
          Progress: `${project.progress}%`,
        }));

      case "Task Completion":
        return tasks.map((task) => ({
          Task: task.title,
          Assignee: task.assignee,
          Priority: task.priority,
          Status: task.done ? "Completed" : "Pending",
        }));

      case "Customer Overview":
        return customers.map((customer) => ({
          Customer: customer.name,
          Email: customer.email || "—",
          Company: customer.company,
          Status: customer.status,
        }));

      case "Employee Directory":
        return employees.map((employee) => ({
          Employee: employee.name,
          Role: employee.role,
          Department: employee.department,
        }));

      default:
        return [
          { Metric: "Total Projects", Value: projects.length },
          {
            Metric: "Active Projects",
            Value: projects.filter(
              (project) => project.status !== "Completed"
            ).length,
          },
          { Metric: "Total Tasks", Value: tasks.length },
          {
            Metric: "Completed Tasks",
            Value: tasks.filter((task) => task.done).length,
          },
          {
            Metric: "Pending Tasks",
            Value: tasks.filter((task) => !task.done).length,
          },
          { Metric: "Total Customers", Value: customers.length },
          { Metric: "Total Employees", Value: employees.length },
        ];
    }
  }

  const reportData = getReportData();
  const headers = reportData.length ? Object.keys(reportData[0]) : [];

  function downloadCSV() {
    if (reportData.length === 0) {
      alert("No data available for this report.");
      return;
    }

    const csvHeaders = headers.join(",");

    const csvRows = reportData.map((row) =>
      headers
        .map((header) => {
          const value = String(row[header] ?? "");
          return `"${value.replace(/"/g, '""')}"`;
        })
        .join(",")
    );

    const csvContent = [csvHeaders, ...csvRows].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${report.replace(/\s+/g, "_")}_Report.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  function printReport() {
    if (reportData.length === 0) {
      alert("No data available to print.");
      return;
    }

    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      alert("Please allow pop-ups to print or save the report.");
      return;
    }

    function escapeHTML(value) {
      return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    }

    const tableHeaders = headers
      .map((header) => `<th>${escapeHTML(header)}</th>`)
      .join("");

    const tableRows = reportData
      .map(
        (row) => `
          <tr>
            ${headers
              .map((header) => `<td>${escapeHTML(row[header])}</td>`)
              .join("")}
          </tr>
        `
      )
      .join("");

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${escapeHTML(report)} Report</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 30px;
              color: #333;
            }
            h1 {
              margin-bottom: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 10px;
              text-align: left;
            }
            th {
              background-color: #f4f4f4;
            }
          </style>
        </head>
        <body>
          <h1>${escapeHTML(report)} Report</h1>
          <table>
            <thead><tr>${tableHeaders}</tr></thead>
            <tbody>${tableRows}</tbody>
          </table>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }

  return (
    <>
      <PageHeading
        title="Reports"
        subtitle="Choose a report type to generate, preview, and export."
      />

      <section className="panel report-panel">
        <h2>Create a Report</h2>

        <label htmlFor="report-type">Report type</label>

        <select
          id="report-type"
          value={report}
          onChange={(event) => {
            setReport(event.target.value);
            setShowPreview(false);
          }}
        >
          <option>Business Summary</option>
          <option>Project Status</option>
          <option>Task Completion</option>
          <option>Customer Overview</option>
          <option>Employee Directory</option>
        </select>

        <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
          <button
            className="primary-btn"
            onClick={() => setShowPreview(true)}
          >
            Generate & Preview
          </button>
          <button className="primary-btn" onClick={downloadCSV}>
            Download CSV
          </button>
          <button className="primary-btn" onClick={printReport}>
            Print / Save PDF
          </button>
        </div>

        {showPreview && (
          <div style={{ marginTop: "20px" }}>
            <h3>Preview: {report}</h3>
            <SimpleTable
              headers={headers}
              rows={reportData.map((row, idx) => ({
                id: idx,
                cells: headers.map((h) => row[h]),
              }))}
            />
          </div>
        )}
      </section>
    </>
  );
}

/* SETTINGS */

function Settings() {
  const [company, setCompany] = useState("Autonomous OS");
  const [email, setEmail] = useState("admin@autonomousos.com");
  const [saved, setSaved] = useState(false);

  return (
    <>
      <PageHeading
        title="Settings"
        subtitle="Update your workspace details."
      />

      <form
        className="panel settings-form"
        onSubmit={(event) => {
          event.preventDefault();
          setSaved(true);
        }}
      >
        <h2>Workspace Settings</h2>

        <label htmlFor="company-name">Workspace name</label>
        <input
          id="company-name"
          value={company}
          onChange={(event) => {
            setCompany(event.target.value);
            setSaved(false);
          }}
        />

        <label htmlFor="admin-email">Administrator email</label>
        <input
          id="admin-email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setSaved(false);
          }}
        />

        <button className="primary-btn">Save Settings</button>

        {saved && (
          <div className="notice">
            Settings saved in this page session.
          </div>
        )}
      </form>
    </>
  );
}

/* MAIN APP */

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("autonomousOSLoggedIn") === "true"
  );

  const [activePage, setActivePage] = useState("Dashboard");

  const [projects, setProjects] = useState(initialProjects);
  const [tasks, setTasks] = useState(initialTasks);
  const [customers, setCustomers] = useState(initialCustomers);
  const [employees, setEmployees] = useState(initialEmployees);

  if (!isLoggedIn) {
    return (
      <Login
        onLogin={() => {
          localStorage.setItem("autonomousOSLoggedIn", "true");
          setIsLoggedIn(true);
        }}
      />
    );
  }

  function logout() {
    localStorage.removeItem("autonomousOSLoggedIn");
    setIsLoggedIn(false);
  }

  function renderPage() {
    switch (activePage) {
      case "Dashboard":
        return (
          <Dashboard
            projects={projects}
            tasks={tasks}
            customers={customers}
            setActivePage={setActivePage}
          />
        );

      case "AI Assistant":
        return <AIAssistant />;

      case "Projects":
        return (
          <Projects
            projects={projects}
            setProjects={setProjects}
          />
        );

      case "Tasks":
        return <Tasks tasks={tasks} setTasks={setTasks} />;

      case "Customers":
        return (
          <Customers
            customers={customers}
            setCustomers={setCustomers}
          />
        );

      case "Employees":
        return (
          <Employees
            employees={employees}
            setEmployees={setEmployees}
          />
        );

      case "Finance":
        return <Finance />;

      case "Risk Detection":
        return <RiskDetection />;

      case "Analytics":
        return <Analytics />;

      case "Reports":
        return (
          <Reports
            projects={projects}
            tasks={tasks}
            customers={customers}
            employees={employees}
          />
        );

      case "Settings":
        return <Settings />;

      default:
        return (
          <Dashboard
            projects={projects}
            tasks={tasks}
            customers={customers}
            setActivePage={setActivePage}
          />
        );
    }
  }

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon">🚀</span>

          <div>
            <strong>Autonomous OS</strong>
            <small>STARTUP WORKSPACE</small>
          </div>
        </div>

        <div className="sidebar-label">WORKSPACE</div>

        <nav className="sidebar-nav">
          {navigation.map((item) => (
            <button
              key={item.name}
              className={`nav-item ${
                activePage === item.name ? "active" : ""
              }`}
              onClick={() => setActivePage(item.name)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="user-profile">
            <div className="avatar">D</div>

            <div>
              <strong>Administrator</strong>
              <small>Workspace Admin</small>
            </div>
          </div>

          <button className="logout-btn" onClick={logout}>
            ↪ Logout
          </button>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div>
            <span className="topbar-status">● All Systems Active</span>
          </div>

          <div className="topbar-right">
            <span>Ctrl K</span>
            <span className="topbar-avatar">D</span>
          </div>
        </header>

        <div className="page-content">{renderPage()}</div>
      </main>
    </div>
  );
}