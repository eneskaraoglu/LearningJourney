// Components & Composition Demo

// Reusable Components
function Card({ title, children, className = "" }) {
  return (
    <div className={`card ${className}`}>
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-content">{children}</div>
    </div>
  );
}

function Button({ variant = "primary", children, ...rest }) {
  return (
    <button className={`btn btn-${variant}`} {...rest}>
      {children}
    </button>
  );
}

function Badge({ type = "info", children }) {
  return <span className={`badge badge-${type}`}>{children}</span>;
}

function Container({ children }) {
  return <div className="container">{children}</div>;
}

// Layout Components
function PageHeader({ title, subtitle }) {
  return (
    <header className="page-header">
      <h1>{title}</h1>
      {subtitle && <p className="subtitle">{subtitle}</p>}
    </header>
  );
}

function Section({ title, children }) {
  return (
    <section className="section">
      <h2 className="section-title">{title}</h2>
      {children}
    </section>
  );
}

// Feature Components
function ProductCard({ product }) {
  return (
    <Card title={product.name}>
      <img src={product.image} alt={product.name} className="product-image" />
      <p className="product-description">{product.description}</p>
      <div className="product-footer">
        <span className="price">${product.price}</span>
        {product.inStock ? (
          <Badge type="success">In Stock</Badge>
        ) : (
          <Badge type="danger">Out of Stock</Badge>
        )}
      </div>
      <Button variant="primary" disabled={!product.inStock}>
        Add to Cart
      </Button>
    </Card>
  );
}

function StatCard({ title, value, change, isPositive }) {
  return (
    <Card className="stat-card">
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
      <div className={`stat-change ${isPositive ? 'positive' : 'negative'}`}>
        {isPositive ? '↑' : '↓'} {change}
      </div>
    </Card>
  );
}

function NotificationList({ notifications }) {
  if (notifications.length === 0) {
    return <p className="empty-state">No notifications</p>;
  }

  return (
    <div className="notification-list">
      {notifications.map((notification) => (
        <div key={notification.id} className="notification">
          <Badge type={notification.type}>{notification.type}</Badge>
          <div className="notification-content">
            <strong>{notification.title}</strong>
            <p>{notification.message}</p>
          </div>
          <small className="notification-time">{notification.time}</small>
        </div>
      ))}
    </div>
  );
}

// Compound Component Example
function Tabs({ children }) {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <div className="tabs">
      <div className="tab-headers">
        {React.Children.map(children, (child, index) => (
          <button
            className={`tab-header ${index === activeTab ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {React.Children.toArray(children)[activeTab]}
      </div>
    </div>
  );
}

function Tab({ children }) {
  return <div className="tab-panel">{children}</div>;
}

// Main App
function App() {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      description: "Premium sound quality with noise cancellation",
      price: 199,
      inStock: true,
      image: "https://via.placeholder.com/300x200/667eea/ffffff?text=Headphones"
    },
    {
      id: 2,
      name: "Smart Watch",
      description: "Track your fitness and stay connected",
      price: 299,
      inStock: true,
      image: "https://via.placeholder.com/300x200/764ba2/ffffff?text=Watch"
    },
    {
      id: 3,
      name: "Laptop Stand",
      description: "Ergonomic design for better posture",
      price: 49,
      inStock: false,
      image: "https://via.placeholder.com/300x200/f093fb/ffffff?text=Stand"
    }
  ];

  const stats = [
    { title: "Total Sales", value: "$12,345", change: "+12.5%", isPositive: true },
    { title: "Active Users", value: "1,234", change: "+8.2%", isPositive: true },
    { title: "Revenue", value: "$45,678", change: "-2.3%", isPositive: false },
    { title: "Orders", value: "890", change: "+15.7%", isPositive: true }
  ];

  const notifications = [
    {
      id: 1,
      type: "success",
      title: "Order Completed",
      message: "Your order #1234 has been shipped",
      time: "2 hours ago"
    },
    {
      id: 2,
      type: "warning",
      title: "Payment Pending",
      message: "Payment for order #1235 is pending",
      time: "5 hours ago"
    },
    {
      id: 3,
      type: "info",
      title: "New Feature",
      message: "Check out our new dashboard features",
      time: "1 day ago"
    }
  ];

  return (
    <Container>
      <PageHeader
        title="Component Composition Demo"
        subtitle="Building complex UIs from simple, reusable components"
      />

      <Section title="Dashboard Stats">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </Section>

      <Section title="Products">
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Section>

      <Section title="Notifications & Tabs">
        <Tabs>
          <Tab label="All Notifications">
            <NotificationList notifications={notifications} />
          </Tab>
          <Tab label="Unread">
            <NotificationList notifications={notifications.slice(0, 2)} />
          </Tab>
          <Tab label="Archived">
            <NotificationList notifications={[]} />
          </Tab>
        </Tabs>
      </Section>

      <Section title="Key Concepts Demonstrated">
        <Card>
          <ul className="concept-list">
            <li><strong>Children Prop:</strong> Card, Container, Button components</li>
            <li><strong>Prop Spreading:</strong> Button component with ...rest</li>
            <li><strong>Composition:</strong> Complex UIs from simple components</li>
            <li><strong>Conditional Rendering:</strong> In Stock badges, empty states</li>
            <li><strong>Compound Components:</strong> Tabs and Tab working together</li>
            <li><strong>Reusability:</strong> Card and Button used multiple times</li>
          </ul>
        </Card>
      </Section>

      <footer className="app-footer">
        <p>Built with React + Vite | Module 02: Components & Composition</p>
      </footer>
    </Container>
  );
}

export default App;
