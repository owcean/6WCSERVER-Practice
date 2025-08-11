import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static('public'));

//  PAGE ROUTES 

// Home 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'home.html'));
});

// Student 
app.get('/student', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'student.html'));
});

// Admin 
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'admin.html'));
});

//  API ROUTES 

// Get student 
app.get('/getStudent', (req, res) => {
  const response = {
    studentId: req.query.studentid,
    firstName: req.query.firstName,
    lastName: req.query.lastName,
    section: req.query.section,
  };
  console.log("Student: ", response);
  res.end(`Received Student Data: ${JSON.stringify(response)}`);
});

// Get admin 
app.get('/getAdmin', (req, res) => {
  const response = {
    adminId: req.query.adminid,
    firstName: req.query.firstName,
    lastName: req.query.lastName,
    department: req.query.department,
  };
  console.log("Admin: ", response);
  res.end(`Received Admin Data: ${JSON.stringify(response)}`);
});

app.get('/info', (req, res) => {
  res.json({ message: "Welcome to the API", status: "success" });
});

// ===== START SERVER =====
const port = 5000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
