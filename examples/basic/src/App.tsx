import React from "react";
import {
  AuthProvider,
  ApiProvider,
  LoggerProvider,
  AlertProvider,
  AlertContainer,
  useAuth,
  useApi,
  useLogger,
  useAlert,
  useLocalStorage,
  useDebounce,
  Modal,
  Spinner,
  ProgressBar,
  Tooltip,
  Dropdown,
  Tabs,
  Pagination,
  DataTable,
  ThemeProvider,
  useThemeMode,
  ToastProvider,
  useToast,
  DatePicker,
  TimePicker,
  Accordion,
  Breadcrumbs,
  Avatar,
  Badge,
  Chip,
  useForm,
  useField,
  formatDate,
  parseDate,
  addDays,
  isBefore,
  isAfter,
} from "@koharx/core-ui";
import CheckIcon from "@mui/icons-material/Check";
import PersonIcon from "@mui/icons-material/Person";
import { IconButton } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import useMediaQuery from "@koharx/core-ui/dist/hooks/useMediaQuery";
import useOnlineStatus from "@koharx/core-ui/dist/hooks/useOnlineStatus";
import useClipboard from "@koharx/core-ui/dist/hooks/useClipboard";
import useInView from "@koharx/core-ui/dist/hooks/useInView";
import useFetch from "@koharx/core-ui/dist/hooks/useFetch";

// Mock API for demo purposes
const mockApi = {
  get: async (url: string) => {
    if (url === "/api/user") {
      return { data: { id: "1", name: "John Doe", email: "john@example.com" } };
    }
    throw new Error("Not found");
  },
  post: async (url: string, data: any) => {
    if (url === "/api/auth/login") {
      return { data: { token: "mock-jwt-token" } };
    }
    throw new Error("Not found");
  },
};

function LoginForm() {
  const { login, isAuthenticated, user, isLoading, error } = useAuth();
  const { info, error: logError } = useLogger();
  const { showSuccess, showError } = useAlert();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      info("Login successful");
      showSuccess("Login Successful", "Welcome back!");
    } catch (err) {
      logError("Login failed", err as Error);
      showError("Login Failed", "Invalid credentials. Please try again.");
    }
  };

  if (isAuthenticated) {
    return (
      <div
        style={{
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <h3>Welcome, {user?.name}!</h3>
        <p>Email: {user?.email}</p>
        <p>Roles: {user?.roles?.join(", ") || "None"}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}
    >
      <h3>Login</h3>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <div style={{ marginBottom: "10px" }}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </label>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </label>
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

function ApiDemo() {
  const { get } = useApi();
  const { info, error } = useLogger();
  const { showSuccess, showError, showInfo } = useAlert();
  const [data, setData] = React.useState<any>(null);

  const fetchData = async () => {
    try {
      const response = await get("/api/user");
      setData(response.data);
      info("Data fetched successfully", response.data);
      showSuccess("Data Fetched", "User data retrieved successfully");
    } catch (err) {
      error("Failed to fetch data", err as Error);
      showError("Fetch Failed", "Unable to retrieve user data");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        marginTop: "20px",
      }}
    >
      <h3>API Demo</h3>
      <button onClick={fetchData}>Fetch User Data</button>
      {data && (
        <div style={{ marginTop: "10px" }}>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

function AlertDemo() {
  const { showSuccess, showError, showWarning, showInfo, clearAlerts } =
    useAlert();

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        marginTop: "20px",
      }}
    >
      <h3>Alert Demo</h3>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <button
          onClick={() =>
            showSuccess("Success!", "Operation completed successfully")
          }
          style={{
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
          }}
        >
          Success Alert
        </button>
        <button
          onClick={() => showError("Error!", "Something went wrong")}
          style={{
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
          }}
        >
          Error Alert
        </button>
        <button
          onClick={() => showWarning("Warning!", "Please check your input")}
          style={{
            backgroundColor: "#ffc107",
            color: "black",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
          }}
        >
          Warning Alert
        </button>
        <button
          onClick={() => showInfo("Info", "Here is some information")}
          style={{
            backgroundColor: "#17a2b8",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
          }}
        >
          Info Alert
        </button>
        <button
          onClick={clearAlerts}
          style={{
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
          }}
        >
          Clear All
        </button>
      </div>
    </div>
  );
}

function StorageDemo() {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const [searchTerm, setSearchTerm] = React.useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        marginTop: "20px",
      }}
    >
      <h3>Storage & Debounce Demo</h3>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Theme:
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            style={{ marginLeft: "10px" }}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Search (debounced):
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type to search..."
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </label>
        <p>Debounced value: {debouncedSearchTerm}</p>
      </div>
    </div>
  );
}

function MuiDemos() {
  // Modal
  const [modalOpen, setModalOpen] = React.useState(false);
  // Spinner/ProgressBar
  const [progress, setProgress] = React.useState(40);
  // Tooltip
  // Dropdown
  const dropdownOptions = [
    { label: "One", value: "1" },
    { label: "Two", value: "2" },
  ];
  const [dropdownValue, setDropdownValue] = React.useState("1");
  // Tabs
  const [tab, setTab] = React.useState(0);
  // Pagination
  const [page, setPage] = React.useState(1);
  // DataTable
  const columns = [
    { label: "Name", field: "name" },
    { label: "Age", field: "age" },
  ];
  const rows = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
  ];
  // useForm
  const form = useForm({
    initialValues: { name: "" },
    onSubmit: (vals) => alert(JSON.stringify(vals)),
  });
  // useField
  const nameField = useField("", (v) => (v ? undefined : "Required"));
  // ThemeProvider/useThemeMode
  const { mode, toggleMode } = useThemeMode();
  // ToastProvider/useToast
  const { showSuccess } = useToast();
  // DatePicker/TimePicker
  const [date, setDate] = React.useState(null);
  const [time, setTime] = React.useState(null);
  // Accordion
  // Breadcrumbs
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Library", href: "/library" },
    { label: "Data" },
  ];

  return (
    <div style={{ marginTop: 32 }}>
      <h2>Material UI Components Demo</h2>
      {/* Modal */}
      <section
        style={{
          margin: "24px 0",
          padding: 16,
          border: "1px solid #eee",
          borderRadius: 8,
        }}
      >
        <h3>Modal</h3>
        <button onClick={() => setModalOpen(true)}>Open Modal</button>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Demo Modal"
        >
          <div>This is a modal dialog.</div>
        </Modal>
      </section>
      {/* Spinner & ProgressBar */}
      <section
        style={{
          margin: "24px 0",
          padding: 16,
          border: "1px solid #eee",
          borderRadius: 8,
        }}
      >
        <h3>Spinner & ProgressBar</h3>
        <Spinner size={30} color="secondary" />
        <div style={{ marginTop: 16 }}>
          <ProgressBar value={progress} variant="determinate" color="success" />
          <button
            onClick={() => setProgress((p) => (p >= 100 ? 0 : p + 10))}
            style={{ marginLeft: 8 }}
          >
            +10%
          </button>
        </div>
      </section>
      {/* Tooltip */}
      <section
        style={{
          margin: "24px 0",
          padding: 16,
          border: "1px solid #eee",
          borderRadius: 8,
        }}
      >
        <h3>Tooltip</h3>
        <Tooltip title="Hello!">
          <button>Hover me</button>
        </Tooltip>
      </section>
      {/* Dropdown */}
      <section
        style={{
          margin: "24px 0",
          padding: 16,
          border: "1px solid #eee",
          borderRadius: 8,
        }}
      >
        <h3>Dropdown</h3>
        <Dropdown
          options={dropdownOptions}
          value={dropdownValue}
          onChange={(e) => setDropdownValue(e.target.value)}
          label="Select"
        />
      </section>
      {/* Tabs */}
      <section
        style={{
          margin: "24px 0",
          padding: 16,
          border: "1px solid #eee",
          borderRadius: 8,
        }}
      >
        <h3>Tabs</h3>
        <Tabs
          labels={["Tab 1", "Tab 2"]}
          value={tab}
          onChange={(_, v) => setTab(v)}
        >
          {[<div>Panel 1</div>, <div>Panel 2</div>]}
        </Tabs>
      </section>
      {/* Pagination */}
      <section
        style={{
          margin: "24px 0",
          padding: 16,
          border: "1px solid #eee",
          borderRadius: 8,
        }}
      >
        <h3>Pagination</h3>
        <Pagination count={10} page={page} onChange={(_, p) => setPage(p)} />
      </section>
      {/* DataTable */}
      <section
        style={{
          margin: "24px 0",
          padding: 16,
          border: "1px solid #eee",
          borderRadius: 8,
        }}
      >
        <h3>DataTable</h3>
        <DataTable columns={columns} rows={rows} />
      </section>
      {/* useForm */}
      <section
        style={{
          margin: "24px 0",
          padding: 16,
          border: "1px solid #eee",
          borderRadius: 8,
        }}
      >
        <h3>useForm</h3>
        <form onSubmit={form.handleSubmit}>
          <input
            name="name"
            value={form.values.name}
            onChange={form.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </section>
      {/* useField */}
      <section
        style={{
          margin: "24px 0",
          padding: 16,
          border: "1px solid #eee",
          borderRadius: 8,
        }}
      >
        <h3>useField</h3>
        <input
          name="name"
          value={nameField.value}
          onChange={nameField.onChange}
        />
        {nameField.error && (
          <span style={{ color: "red" }}>{nameField.error}</span>
        )}
      </section>
      {/* ThemeProvider/useThemeMode */}
      <section
        style={{
          margin: "24px 0",
          padding: 16,
          border: "1px solid #eee",
          borderRadius: 8,
        }}
      >
        <h3>ThemeProvider & useThemeMode</h3>
        <div>Current mode: {mode}</div>
        <button onClick={toggleMode}>
          Switch to {mode === "light" ? "dark" : "light"} mode
        </button>
      </section>
      {/* ToastProvider/useToast */}
      <section
        style={{
          margin: "24px 0",
          padding: 16,
          border: "1px solid #eee",
          borderRadius: 8,
        }}
      >
        <h3>ToastProvider & useToast</h3>
        <button onClick={() => showSuccess("Saved!")}>Show Toast</button>
      </section>
      {/* DatePicker & TimePicker */}
      <section
        style={{
          margin: "24px 0",
          padding: 16,
          border: "1px solid #eee",
          borderRadius: 8,
        }}
      >
        <h3>DatePicker & TimePicker</h3>
        <DatePicker label="Pick a date" value={date} onChange={setDate} />
        <TimePicker label="Pick a time" value={time} onChange={setTime} />
      </section>
      {/* Accordion */}
      <section
        style={{
          margin: "24px 0",
          padding: 16,
          border: "1px solid #eee",
          borderRadius: 8,
        }}
      >
        <h3>Accordion</h3>
        <Accordion title="Section 1">
          <div>Accordion Content</div>
        </Accordion>
      </section>
      {/* Breadcrumbs */}
      <section
        style={{
          margin: "24px 0",
          padding: 16,
          border: "1px solid #eee",
          borderRadius: 8,
        }}
      >
        <h3>Breadcrumbs</h3>
        <Breadcrumbs items={breadcrumbItems} />
      </section>
      {/* Avatar, Badge, Chip */}
      <section
        style={{
          margin: "24px 0",
          padding: 16,
          border: "1px solid #eee",
          borderRadius: 8,
        }}
      >
        <h3>Avatar, Badge, Chip</h3>
        <Avatar src="https://via.placeholder.com/40" alt="User" />
        <Badge badgeContent={4} color="secondary">
          <span style={{ marginLeft: 8 }}>Inbox</span>
        </Badge>
        <Chip label="Active" color="success" style={{ marginLeft: 8 }} />
      </section>
    </div>
  );
}

function AdvancedDemos() {
  // Modal with form and async loading
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalLoading, setModalLoading] = React.useState(false);
  const [modalNestedOpen, setModalNestedOpen] = React.useState(false);
  const modalForm = useForm({
    initialValues: { email: "" },
    onSubmit: async (vals) => {
      setModalLoading(true);
      await new Promise((r) => setTimeout(r, 1500));
      setModalLoading(false);
      setModalOpen(false);
      alert("Submitted: " + vals.email);
    },
  });

  // DataTable with sorting/filtering/custom cell
  const [sortBy, setSortBy] = React.useState("name");
  const [filter, setFilter] = React.useState("");
  const advRows = [
    { name: "Alice", age: 30, status: "active" },
    { name: "Bob", age: 25, status: "inactive" },
    { name: "Carol", age: 28, status: "active" },
  ];
  const filteredRows = advRows.filter((r) =>
    r.name.toLowerCase().includes(filter.toLowerCase())
  );
  const sortedRows = [...filteredRows].sort((a, b) =>
    a[sortBy].localeCompare
      ? a[sortBy].localeCompare(b[sortBy])
      : a[sortBy] - b[sortBy]
  );
  const advColumns = [
    { label: "Name", field: "name" },
    { label: "Age", field: "age" },
    { label: "Status", field: "status" },
    { label: "Actions", field: "actions" },
  ];

  // Dynamic Tabs with icons
  const [tab, setTab] = React.useState(0);
  const tabData = [
    { label: "User", icon: <PersonIcon />, content: "User Info" },
    { label: "Check", icon: <CheckIcon />, content: "Check Info" },
  ];

  // Multi-select Dropdown
  const [multi, setMulti] = React.useState(["1"]);
  const multiOptions = [
    { label: "One", value: "1" },
    { label: "Two", value: "2" },
    { label: "Three", value: "3" },
  ];

  // ToastProvider advanced
  const { showSuccess, showError } = useToast();

  // DatePicker range
  const [dateRange, setDateRange] = React.useState([null, null]);

  // Accordion controlled
  const [expanded, setExpanded] = React.useState<string | false>(false);

  // Avatar/Badge/Chip advanced
  return (
    <div style={{ marginTop: 32 }}>
      <h2>Advanced Demos</h2>
      {/* Modal with form, async, nested */}
      <section
        style={{
          margin: "24px 0",
          padding: 16,
          border: "1px solid #ddd",
          borderRadius: 8,
        }}
      >
        <h3>Modal (Form, Async, Nested)</h3>
        <button onClick={() => setModalOpen(true)}>Open Modal</button>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Advanced Modal"
          actions={
            <>
              <button onClick={() => setModalNestedOpen(true)}>
                Open Nested
              </button>
              <button type="submit" form="modal-form" disabled={modalLoading}>
                {modalLoading ? "Saving..." : "Submit"}
              </button>
            </>
          }
        >
          <form id="modal-form" onSubmit={modalForm.handleSubmit}>
            <input
              name="email"
              value={modalForm.values.email}
              onChange={modalForm.handleChange}
              placeholder="Email"
            />
          </form>
        </Modal>
        <Modal
          open={modalNestedOpen}
          onClose={() => setModalNestedOpen(false)}
          title="Nested Modal"
        >
          <div>This is a nested modal.</div>
        </Modal>
      </section>
      {/* DataTable advanced */}
      <section
        style={{
          margin: "24px 0",
          padding: 16,
          border: "1px solid #ddd",
          borderRadius: 8,
        }}
      >
        <h3>DataTable (Sorting, Filtering, Custom Cell)</h3>
        <input
          placeholder="Filter by name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button onClick={() => setSortBy("name")}>Sort by Name</button>
        <button onClick={() => setSortBy("age")}>Sort by Age</button>
        <DataTable
          columns={advColumns}
          rows={sortedRows.map((row) => ({
            ...row,
            actions: (
              <IconButton onClick={() => alert("Edit " + row.name)}>
                <CheckIcon />
              </IconButton>
            ),
          }))}
        />
      </section>
      {/* Tabs with icons, dynamic */}
      <section
        style={{
          margin: "24px 0",
          padding: 16,
          border: "1px solid #ddd",
          borderRadius: 8,
        }}
      >
        <h3>Tabs (Dynamic, With Icons)</h3>
        <Tabs
          labels={tabData.map((t) => t.label)}
          value={tab}
          onChange={(_, v) => setTab(v)}
        >
          {tabData.map((t, i) => (
            <div key={i}>
              {t.icon} {t.content}
            </div>
          ))}
        </Tabs>
      </section>
      {/* Multi-select Dropdown */}
      <section
        style={{
          margin: "24px 0",
          padding: 16,
          border: "1px solid #ddd",
          borderRadius: 8,
        }}
      >
        <h3>Dropdown (Multi-select)</h3>
        <select
          multiple
          value={multi}
          onChange={(e) =>
            setMulti(Array.from(e.target.selectedOptions, (o) => o.value))
          }
        >
          {multiOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </section>
      {/* ToastProvider advanced */}
      <section
        style={{
          margin: "24px 0",
          padding: 16,
          border: "1px solid #ddd",
          borderRadius: 8,
        }}
      >
        <h3>ToastProvider (Multiple, Custom)</h3>
        <button onClick={() => showSuccess("Success!")}>Show Success</button>
        <button onClick={() => showError("Error!", "Custom error message")}>
          Show Error
        </button>
      </section>
      {/* DatePicker range (simple) */}
      <section
        style={{
          margin: "24px 0",
          padding: 16,
          border: "1px solid #ddd",
          borderRadius: 8,
        }}
      >
        <h3>DatePicker (Range)</h3>
        <DatePicker
          label="Start"
          value={dateRange[0]}
          onChange={(d) => setDateRange([d, dateRange[1]])}
        />
        <DatePicker
          label="End"
          value={dateRange[1]}
          onChange={(d) => setDateRange([dateRange[0], d])}
        />
      </section>
      {/* Accordion controlled */}
      <section
        style={{
          margin: "24px 0",
          padding: 16,
          border: "1px solid #ddd",
          borderRadius: 8,
        }}
      >
        <h3>Accordion (Controlled)</h3>
        <Accordion title="Panel 1" defaultExpanded={expanded === "panel1"}>
          <button
            onClick={() =>
              setExpanded(expanded === "panel1" ? false : "panel1")
            }
          >
            Toggle
          </button>
          <div>Panel 1 Content</div>
        </Accordion>
        <Accordion title="Panel 2" defaultExpanded={expanded === "panel2"}>
          <button
            onClick={() =>
              setExpanded(expanded === "panel2" ? false : "panel2")
            }
          >
            Toggle
          </button>
          <div>Panel 2 Content</div>
        </Accordion>
      </section>
      {/* Avatar/Badge/Chip advanced */}
      <section
        style={{
          margin: "24px 0",
          padding: 16,
          border: "1px solid #ddd",
          borderRadius: 8,
        }}
      >
        <h3>Avatar, Badge, Chip (Advanced)</h3>
        <Avatar alt="Fallback">U</Avatar>
        <Badge badgeContent={99} color="error" overlap="circular">
          <Avatar src="https://via.placeholder.com/40" alt="User" />
        </Badge>
        <Chip label="With Icon" icon={<PersonIcon />} color="primary" />
      </section>
    </div>
  );
}

function AdvancedHooksDemo() {
  // useMediaQuery
  const isLarge = useMediaQuery("(min-width: 800px)");
  // useOnlineStatus
  const online = useOnlineStatus();
  // useClipboard
  const [copy, copied] = useClipboard();
  // useInView
  const [inViewRef, inView] = useInView();
  // useFetch
  const { data, error, loading, refetch } = useFetch(
    "https://jsonplaceholder.typicode.com/todos/1"
  );

  return (
    <div style={{ marginTop: 32 }}>
      <h2>Advanced Hooks Demo</h2>
      {/* useMediaQuery */}
      <section
        style={{
          margin: "24px 0",
          padding: 16,
          border: "1px solid #bbb",
          borderRadius: 8,
        }}
      >
        <h3>useMediaQuery</h3>
        <div>
          Window is <b>{isLarge ? "at least" : "less than"}</b> 800px wide.
        </div>
      </section>
      {/* useOnlineStatus */}
      <section
        style={{
          margin: "24px 0",
          padding: 16,
          border: "1px solid #bbb",
          borderRadius: 8,
        }}
      >
        <h3>useOnlineStatus</h3>
        <div>
          Status:{" "}
          <b style={{ color: online ? "green" : "red" }}>
            {online ? "Online" : "Offline"}
          </b>
        </div>
      </section>
      {/* useClipboard */}
      <section
        style={{
          margin: "24px 0",
          padding: 16,
          border: "1px solid #bbb",
          borderRadius: 8,
        }}
      >
        <h3>useClipboard</h3>
        <button onClick={() => copy("Copied from @koharx/core-ui!")}>
          {copied ? "Copied!" : "Copy Text"}
        </button>
      </section>
      {/* useInView */}
      <section
        style={{
          margin: "24px 0",
          padding: 16,
          border: "1px solid #bbb",
          borderRadius: 8,
        }}
      >
        <h3>useInView</h3>
        <div
          style={{
            height: 100,
            overflow: "auto",
            border: "1px solid #eee",
            marginBottom: 8,
          }}
        >
          <div style={{ height: 120 }} />
          <div
            ref={inViewRef}
            style={{ padding: 16, background: inView ? "#d4edda" : "#f8d7da" }}
          >
            {inView ? "In view!" : "Scroll me into view"}
          </div>
          <div style={{ height: 120 }} />
        </div>
      </section>
      {/* useFetch */}
      <section
        style={{
          margin: "24px 0",
          padding: 16,
          border: "1px solid #bbb",
          borderRadius: 8,
        }}
      >
        <h3>useFetch</h3>
        <button
          onClick={refetch}
          disabled={loading}
          style={{ marginBottom: 8 }}
        >
          Refetch
        </button>
        {loading && <div>Loading...</div>}
        {error && <div style={{ color: "red" }}>Error: {error.message}</div>}
        {data && (
          <pre style={{ background: "#f6f8fa", padding: 8 }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </section>
    </div>
  );
}

function DateUtilsDemo() {
  const [dateStr, setDateStr] = React.useState("2024-06-01");
  const parsed = parseDate(dateStr);
  const today = new Date();
  const plusFive = addDays(today, 5);
  const before = parsed ? isBefore(parsed, today) : false;
  const after = parsed ? isAfter(parsed, today) : false;

  return (
    <div style={{ marginTop: 32 }}>
      <h2>Date Utils Demo</h2>
      <section
        style={{
          margin: "24px 0",
          padding: 16,
          border: "1px solid #aaa",
          borderRadius: 8,
        }}
      >
        <h3>formatDate</h3>
        <div>Today: {formatDate(today)}</div>
        <div>
          Custom:{" "}
          {formatDate(today, "en-GB", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          })}
        </div>
      </section>
      <section
        style={{
          margin: "24px 0",
          padding: 16,
          border: "1px solid #aaa",
          borderRadius: 8,
        }}
      >
        <h3>parseDate</h3>
        <input
          value={dateStr}
          onChange={(e) => setDateStr(e.target.value)}
          placeholder="YYYY-MM-DD"
        />
        <div>Parsed: {parsed ? parsed.toISOString() : "Invalid date"}</div>
      </section>
      <section
        style={{
          margin: "24px 0",
          padding: 16,
          border: "1px solid #aaa",
          borderRadius: 8,
        }}
      >
        <h3>addDays</h3>
        <div>Today + 5 days: {formatDate(plusFive)}</div>
      </section>
      <section
        style={{
          margin: "24px 0",
          padding: 16,
          border: "1px solid #aaa",
          borderRadius: 8,
        }}
      >
        <h3>isBefore / isAfter</h3>
        <div>
          Input date is before today? <b>{before ? "Yes" : "No"}</b>
        </div>
        <div>
          Input date is after today? <b>{after ? "Yes" : "No"}</b>
        </div>
      </section>
    </div>
  );
}

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider>
        <ToastProvider>
          <LoggerProvider config={{ level: "info", enableConsole: true }}>
            <AlertProvider maxAlerts={5} defaultDuration={5000}>
              <ApiProvider config={{ baseURL: "https://api.example.com" }}>
                <AuthProvider>
                  <div
                    style={{
                      maxWidth: "800px",
                      margin: "0 auto",
                      padding: "20px",
                    }}
                  >
                    <h1>@koharx/core-ui Demo</h1>
                    <LoginForm />
                    <ApiDemo />
                    <AlertDemo />
                    <StorageDemo />
                    <MuiDemos />
                    <AdvancedDemos />
                    <AdvancedHooksDemo />
                    <DateUtilsDemo />
                  </div>
                  <AlertContainer position="top-right" />
                </AuthProvider>
              </ApiProvider>
            </AlertProvider>
          </LoggerProvider>
        </ToastProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
