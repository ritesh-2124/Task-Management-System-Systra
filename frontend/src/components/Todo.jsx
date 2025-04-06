import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import {
  Container, TextField, Button, MenuItem, Typography,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Box, CircularProgress
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const API = 'https://task-management-system-systra-2.onrender.com/api';

const Todo = () => {
  const { user, logout } = useAuth();
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');
  const [dueDate, setDueDate] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('due_date');
  const [order, setOrder] = useState('ASC');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false); 

  const fetchTodos = async (page = 1) => {
    try {
      setLoading(true);
      const query = new URLSearchParams({ page, limit: 5, status: statusFilter, sortBy, order });
      const res = await axios.get(`${API}/tasks?${query.toString()}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTodos(res.data.tasks);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStatus('To Do');
    setDueDate('');
    setIsEditing(false);
    setEditId(null);
  };

  const addTodo = async () => {
    if (!title || !description || !dueDate) {
      return alert("All fields are required");
    }
    try {
      setLoading(true);
      await axios.post(`${API}/tasks`, {
        title, description, status, due_date: dueDate
      }, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      resetForm();
      fetchTodos(currentPage);
    } finally {
      setLoading(false);
    }
  };

  const updateTodo = async () => {
    if (!editId) return;
    try {
      setLoading(true);
      await axios.put(`${API}/tasks/${editId}`, {
        status, description, due_date: dueDate, title
      }, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      resetForm();
      fetchTodos(currentPage);
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${API}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      fetchTodos(currentPage);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (todo) => {
    setIsEditing(true);
    setEditId(todo.id);
    setStatus(todo.status);
    setTitle(todo.title);
    setDescription(todo.description);
    setDueDate(todo.due_date.split('T')[0]);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={4} mb={2}>
        <Typography variant="h5">Hello, what's up Today</Typography>
        <Typography variant="body1">Last Updated</Typography>
        <Typography variant="body1">
          {new Date().toLocaleString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
          })}
        </Typography>
        <Button onClick={logout} variant="outlined" color="secondary">Logout</Button>
      </Box>

      {/* Filters */}
      <Box display="flex" gap={2} mb={3}>
        <TextField select label="Filter by Status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} fullWidth>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="To Do">To Do</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </TextField>
        <TextField select label="Sort by" value={sortBy} onChange={(e) => setSortBy(e.target.value)} fullWidth>
          <MenuItem value="due_date">Due Date</MenuItem>
          <MenuItem value="createdAt">Created At</MenuItem>
          <MenuItem value="title">Title</MenuItem>
        </TextField>
        <TextField select label="Order" value={order} onChange={(e) => setOrder(e.target.value)} fullWidth>
          <MenuItem value="ASC">ASC</MenuItem>
          <MenuItem value="DESC">DESC</MenuItem>
        </TextField>
        <Button variant="contained" onClick={() => fetchTodos(1)}>Apply</Button>
      </Box>

      {/* Add/Edit Task */}
      <Box display="flex" gap={2} mb={3} flexWrap="wrap">
        <TextField label="Title" value={title} onChange={e => setTitle(e.target.value)} fullWidth />
        <TextField label="Description" value={description} onChange={e => setDescription(e.target.value)} fullWidth />
        <TextField type="date" label="Due Date" value={dueDate} onChange={e => setDueDate(e.target.value)} InputLabelProps={{ shrink: true }} fullWidth />
        <TextField select label="Status" value={status} onChange={e => setStatus(e.target.value)} fullWidth>
          <MenuItem value="To Do">To Do</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </TextField>
        <Button
  onClick={isEditing ? updateTodo : addTodo}
  variant="contained"
  color={isEditing ? "warning" : "primary"}
  disabled={loading} // 👈 disable button while loading
>
  {loading ? (
    <CircularProgress size={24} color="inherit" />
  ) : isEditing ? "Update Task" : "Add Task"}
</Button>
{isEditing && (
  <Button
    onClick={resetForm}
    variant="outlined"
    color="secondary"
    disabled={loading}
  >
    Cancel
  </Button>
)}

      </Box>

      {/* Loader */}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Task List */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Title</strong></TableCell>
                  <TableCell><strong>Description</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Due Date</strong></TableCell>
                  <TableCell><strong>Created At</strong></TableCell>
                  <TableCell align="center"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {todos.map(todo => (
                  <TableRow key={todo.id}>
                    <TableCell>{todo.title}</TableCell>
                    <TableCell>{todo.description}</TableCell>
                    <TableCell>{todo.status}</TableCell>
                    <TableCell>{todo.due_date?.split('T')[0]}</TableCell>
                    <TableCell>{todo.createdAt?.split('T')[0]}</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleEdit(todo)} color="primary">
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => deleteTodo(todo.id)} color="error">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {todos.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center">No tasks found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box display="flex" justifyContent="center" mt={3} gap={2}>
            <Button onClick={() => fetchTodos(currentPage - 1)} disabled={currentPage === 1}>Previous</Button>
            <Typography variant="body1" mt={1}>Page {currentPage} of {totalPages}</Typography>
            <Button onClick={() => fetchTodos(currentPage + 1)} disabled={currentPage === totalPages}>Next</Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Todo;
