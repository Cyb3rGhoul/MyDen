import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Popover, List, ListItem, ListItemText, Checkbox } from '@mui/material';
import { Calendar, Clock, Search, User, X, ChevronLeft, ChevronRight, Key } from 'lucide-react';
import { useHotkeys } from 'react-hotkeys-hook';
import { theme } from '../styles/theme.js';
import './Dashboard.css';
import { UserButton } from '@clerk/clerk-react';
import { Select, MenuItem, IconButton, Collapse } from '@mui/material';
import { Copy, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import WeatherAndNews from '../components/WeatherAndNews.jsx';


const Dashboard = () => {
  // State management
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [classes] = useState([
    { id: 1, name: 'Mathematics', time: '09:00 AM', professor: 'Dr. Smith' },
    { id: 2, name: 'Physics', time: '11:00 AM', professor: 'Dr. Johnson' },
    { id: 3, name: 'Computer Science', time: '02:00 PM', professor: 'Prof. Williams' }
  ]);
  const [geminiKey, setGeminiKey] = useState('');
  const [isKeyDialogOpen, setIsKeyDialogOpen] = useState(false);
  const [isCalendarPopupOpen, setIsCalendarPopupOpen] = useState(false);
  const [selectedDateTodos, setSelectedDateTodos] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  // Hotkeys
  useHotkeys('ctrl+q', () => document.querySelector('.search-input').focus());
  useHotkeys('ctrl+;', () => document.querySelector('.todo-input').focus());

  // Todo handlers
  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false, date: selectedDate }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const [categories, setCategories] = useState([
    { id: '1', name: 'GitHub', links: [], open: false },
    { id: '2', name: 'Social', links: [], open: false }
  ]);
  const [newCategory, setNewCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newLink, setNewLink] = useState({ title: '', url: '' });

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, {
        id: Date.now().toString(),
        name: newCategory,
        links: [],
        open: false
      }]);
      setNewCategory('');
    }
  };

  const handleAddLink = () => {
    if (selectedCategory && newLink.url) {
      setCategories(categories.map(cat =>
        cat.id === selectedCategory
          ? {
            ...cat, links: [...cat.links, {
              title: newLink.title || newLink.url, // If title is empty, use the URL
              url: newLink.url,
              id: Date.now().toString()
            }]
          }
          : cat
      ));
      setNewLink({ title: '', url: '' });
    }
  };

  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(url);
    // You could add a toast notification here
  };

  const handleDeleteLink = (categoryId, linkId) => {
    setCategories(categories.map(cat =>
      cat.id === categoryId
        ? { ...cat, links: cat.links.filter(link => link.id !== linkId) }
        : cat
    ));
  };

  const handleDeleteCategory = (categoryId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (confirmDelete) {
      setCategories(categories.filter(cat => cat.id !== categoryId));
    }
  };

  const toggleCategory = (categoryId) => {
    setCategories(categories.map(cat =>
      cat.id === categoryId
        ? { ...cat, open: !cat.open }  // Toggle the open state of the category
        : cat
    ));
  };

  // Calendar helpers
  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateCalendarDays = () => {
    const days = [];
    const totalDays = daysInMonth(selectedDate);
    const firstDay = firstDayOfMonth(selectedDate);

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const currentDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
      const isToday = new Date().toDateString() === currentDate.toDateString();
      const hasTodos = todos.some(todo => new Date(todo.date).toDateString() === currentDate.toDateString());

      days.push(
        <button
          key={day}
          className={`calendar-day ${isToday ? 'today' : ''} ${hasTodos ? 'has-todos' : ''}`}
          onClick={() => handleDateClick(currentDate)}
        >
          {day}
        </button>
      );
    }
    return days;
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const todosForDate = todos.filter(todo => new Date(todo.date).toDateString() === date.toDateString());
    setSelectedDateTodos(todosForDate);
    setIsCalendarPopupOpen(true);
  };

  // Handler for opening Gemini key dialog
  const handleKeyDialogOpen = () => {
    setIsKeyDialogOpen(true);
  };

  // Handler for closing Gemini key dialog
  const handleKeyDialogClose = () => {
    setIsKeyDialogOpen(false);
  };

  // Handler for submitting Gemini key
  const handleKeySubmit = () => {
    // Here you would typically save the Gemini key securely
    console.log('Gemini Key saved:', geminiKey);
    setIsKeyDialogOpen(false);
  };

  const handleAddTodoForDate = () => {
    if (newTodo.trim()) {
      const newTodoItem = { id: Date.now(), text: newTodo, completed: false, date: selectedDate };
      setTodos([...todos, newTodoItem]);
      setSelectedDateTodos([...selectedDateTodos, newTodoItem]);
      setNewTodo('');
    }
  };

  const handleRemoveTodoForDate = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
    setSelectedDateTodos(selectedDateTodos.filter(todo => todo.id !== id));
  };

  const handleSetReminder = (todo) => {
    // Here you would implement the logic to send a WhatsApp message or email
    console.log('Setting reminder for:', todo);
  };



  return (
    <ThemeProvider theme={theme}>
      <div className="dashboard">
        <div className="dashboard-container">
          {/* Header */}
          <header className="dashboard-header">
            <h1>MyDen</h1>
            <div className="header-actions">
              <Button className="gemini-key-button" onClick={handleKeyDialogOpen}>
                <Key size={24} />
              </Button>
              <Button className="user-button">
                <UserButton />
              </Button>
            </div>
          </header>

          <Dialog open={isKeyDialogOpen}
            onClose={handleKeyDialogClose}
            classes={{ paper: 'MuiDialog-paper' }}>
            <DialogTitle>Add Gemini API Key</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Gemini API Key"
                type="text"
                fullWidth
                variant="outlined"
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleKeyDialogClose}>Cancel</Button>
              <Button onClick={handleKeySubmit}>Save</Button>
            </DialogActions>
          </Dialog>

          <div className="dashboard-content">
            {/* Navbar */}
            <nav className="sidebar">
              <div className="nav-links">
                <a href="#" className="active">Dashboard</a>
                <a href="#">Calendar</a>
                <a href="#">Tasks</a>
                <a href="#">Classes</a>
                <a href="#">Settings</a>
                <a href="#">MyLinks</a>
              </div>
            </nav>

            {/* Main Content */}
            <main className="main-content">
              <div className="grid-container">
                {/* Todo Section */}
                <section className="todo-section card">
                  <h2>TODO List</h2>
                  <form onSubmit={addTodo} className="todo-form">
                    <input
                      type="text"
                      value={newTodo}
                      onChange={(e) => setNewTodo(e.target.value)}
                      placeholder="Add new task... (Ctrl+;)"
                      className="todo-input"
                    />
                    <button type="submit" className="add-todo-btn" cla>Add</button>
                  </form>
                  <ul className="todo-list">
                    {todos.map(todo => (
                      <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => toggleTodo(todo.id)}
                        />
                        <span>{todo.text}</span>
                        <button onClick={() => deleteTodo(todo.id)} className="delete-todo">
                          <X size={16} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Classes Section */}
                <section className="classes-section card">
                  <h2>Today's Classes</h2>
                  <div className="class-list">
                    {classes.map(cls => (
                      <div key={cls.id} className="class-item">
                        <div className="class-time">
                          <Clock size={16} />
                          <span>{cls.time}</span>
                        </div>
                        <div className="class-info">
                          <h3>{cls.name}</h3>
                          <p>{cls.professor}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <WeatherAndNews/>

                {/* Calendar Section */}
                <section className="calendar-section card">
                  <div className="calendar-header">
                    <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))}>
                      <ChevronLeft size={20} />
                    </button>
                    <h2>{selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                    <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))}>
                      <ChevronRight size={20} />
                    </button>
                  </div>
                  <div className="calendar-grid">
                    <div className="calendar-days-header">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="calendar-day-name">{day}</div>
                      ))}
                    </div>
                    <div className="calendar-days">
                      {generateCalendarDays()}
                    </div>
                  </div>
                </section>
              </div>

              <div className="card link-manager">
                <h2>Link Manager</h2>

                {/* Add Category */}
                <div className="add-category-form">
                  <TextField
                    size="small"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="New Category"
                    className="category-input"
                  />
                  <Button
                    onClick={handleAddCategory}
                    variant="contained"
                    startIcon={<Plus size={16} />}
                    style={{ marginTop: '-18px' }}
                  >
                    Add Category
                  </Button>
                </div>

                {/* Add Link */}
                <div className="add-link-form">
                  <Select
                    size="small"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="category-select"
                    style={{ marginTop: '-17px' }}
                  >
                    {categories.map(cat => (
                      <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                    ))}
                  </Select>
                  <TextField
                    size="small"
                    value={newLink.title}
                    onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                    placeholder="Link Title"
                    className="link-input"
                  />
                  <TextField
                    size="small"
                    value={newLink.url}
                    onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                    placeholder="URL"
                    className="link-input"
                  />
                  <Button
                    onClick={handleAddLink}
                    variant="contained"
                    startIcon={<Plus size={16} />}
                    style={{ marginTop: '-18px' }}
                  >
                    Add Link
                  </Button>
                </div>

                {/* Categories and Links */}
                <div className="categories-container">
                  {categories.map(category => (
                    <div key={category.id} className="category-section">
                      <div className="category-header">
                        <h3 onClick={() => toggleCategory(category.id)} style={{ cursor: 'pointer' }}>
                          {category.name}
                          {category.open ? <ChevronUp size={16} style={{ marginLeft: '20px' }} /> : <ChevronDown size={16} style={{ marginLeft: '20px' }} />}
                        </h3>
                        <IconButton
                          onClick={() => handleDeleteCategory(category.id)}
                          size="small"
                        >
                          <X size={16} style={{ color: '#D6C0E6' }} />
                        </IconButton>
                      </div>
                      <Collapse in={category.open}>
                        <div className="links-list">
                          {category.links.map(link => (
                            <div key={link.id} className="link-item">
                              <a href={link.url.startsWith('http') ? link.url : `https://${link.url}`} target="_blank" rel="noopener noreferrer">
                                {link.title || link.url}
                              </a>
                              <div className="link-actions">
                                <IconButton
                                  onClick={() => handleCopyLink(link.url)}
                                  size="small"
                                >
                                  <Copy size={16} style={{ color: '#D6C0E6' }} />
                                </IconButton>
                                <IconButton
                                  onClick={() => handleDeleteLink(category.id, link.id)}
                                  size="small"
                                >
                                  <X size={16} style={{ color: '#D6C0E6' }} />
                                </IconButton>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Collapse>
                    </div>
                  ))}
                </div>
              </div>

              {/* Search Bar */}
              <div className="search-container">
                <Search size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search... (Ctrl+Q)"
                  className="search-input"
                />
              </div>
            </main>
          </div>
        </div>
      </div>




      {/* Calendar Popup */}
      <Dialog open={isCalendarPopupOpen} onClose={() => setIsCalendarPopupOpen(false)}>
        <DialogTitle>{selectedDate.toDateString()}</DialogTitle>
        <DialogContent>
          <List>
            {selectedDateTodos.map((todo) => (
              <ListItem key={todo.id} className="calendar-todo-item">
                <Checkbox
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <ListItemText primary={todo.text} className="calendar-todo-text" />
                <div className="calendar-todo-actions">
                  <Button onClick={() => handleRemoveTodoForDate(todo.id)}>Remove</Button>
                  <Button onClick={() => handleSetReminder(todo)}>Set Reminder</Button>
                </div>
              </ListItem>
            ))}
          </List>
          <TextField
            margin="dense"
            label="Add new todo"
            fullWidth
            variant="outlined"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <Button onClick={handleAddTodoForDate}>Add Todo</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCalendarPopupOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default Dashboard;