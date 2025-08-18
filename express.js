//Tienzo, Kriseasn G. 
import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// File Path Setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize app
const app = express();

// ===== Multer storage config =====
var storage = multer.diskStorage({
destination: (req, file, callback) => {
callback(null, 'uploads/');
},
filename: (req, file, callback) => {
callback(null, file.originalname);
}
});
var upload = multer({ storage: storage }).single('file');

// ===== Static files =====
app.use('/uploads', express.static(__dirname + '/uploads'));



// PAGE ROUTES 

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

// API ROUTES 

// Get student 
app.get('/getStudent', (req, res) => {
  const response = {
    studentId: req.query.studentid,
    firstName: req.query.firstName,
    lastName: req.query.lastName,
    section: req.query.section,
  };
  console.log("Student: ", response);
  res.json({
    status: "success",
    message: "Received Student Data",
    data: response
  });
});

// Get admin (POST)
app.post('/postAdmin', upload, (req, res) => {
  const response = {
    adminId: req.body.adminid,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    department: req.body.department,
  };
  console.log("Admin: ", response);
  res.json({
    status: "success",
    message: "Received Admin Data",
    data: response
  });
});

app.get('/info', (req, res) => {
  res.json({ message: "Welcome to the API", status: "success" });
});

// ===== START SERVER =====
const port = 5000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});