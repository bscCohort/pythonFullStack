// API Base URL
const API_URL = '/api/students';

// Current editing student ID (null when adding new)
let editingStudentId = null;

// DOM Elements
const studentForm = document.getElementById('studentForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const courseInput = document.getElementById('course');
const yearInput = document.getElementById('year');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const studentsTableBody = document.getElementById('studentsTableBody');
const alertContainer = document.getElementById('alertContainer');
const loadingSpinner = document.getElementById('loadingSpinner');
const studentsTableContainer = document.getElementById('studentsTableContainer');
const noStudents = document.getElementById('noStudents');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadStudents();
    setupFormHandler();
});

// Show alert message
function showAlert(message, type = 'success') {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    alertContainer.appendChild(alert);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

// Load all students
async function loadStudents() {
    try {
        loadingSpinner.style.display = 'block';
        studentsTableContainer.style.display = 'none';
        
        const response = await fetch(API_URL);
        const students = await response.json();
        
        loadingSpinner.style.display = 'none';
        studentsTableContainer.style.display = 'block';
        
        if (students.length === 0) {
            noStudents.style.display = 'block';
            studentsTableBody.innerHTML = '';
        } else {
            noStudents.style.display = 'none';
            displayStudents(students);
        }
    } catch (error) {
        loadingSpinner.style.display = 'none';
        showAlert('Error loading students: ' + error.message, 'danger');
    }
}

// Display students in table
function displayStudents(students) {
    studentsTableBody.innerHTML = '';
    
    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
            <td>${student.year}</td>
            <td>
                <button class="btn btn-sm btn-warning" onclick="editStudent(${student.id})">
                    Edit
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteStudent(${student.id})">
                    Delete
                </button>
            </td>
        `;
        studentsTableBody.appendChild(row);
    });
}

// Setup form submit handler
function setupFormHandler() {
    studentForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const studentData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            course: courseInput.value.trim(),
            year: yearInput.value.trim()
        };
        
        if (editingStudentId) {
            await updateStudent(editingStudentId, studentData);
        } else {
            await createStudent(studentData);
        }
    });
    
    cancelBtn.addEventListener('click', function() {
        resetForm();
    });
}

// Create new student
async function createStudent(studentData) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        });
        
        if (response.ok) {
            showAlert('Student added successfully!', 'success');
            resetForm();
            loadStudents();
        } else {
            const error = await response.json();
            showAlert('Error: ' + error.error, 'danger');
        }
    } catch (error) {
        showAlert('Error creating student: ' + error.message, 'danger');
    }
}

// Edit student (load data into form)
async function editStudent(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const student = await response.json();
        
        if (response.ok) {
            editingStudentId = id;
            nameInput.value = student.name;
            emailInput.value = student.email;
            courseInput.value = student.course;
            yearInput.value = student.year;
            
            submitBtn.textContent = 'Update Student';
            submitBtn.className = 'btn btn-warning';
            cancelBtn.style.display = 'inline-block';
            
            // Scroll to form
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    } catch (error) {
        showAlert('Error loading student: ' + error.message, 'danger');
    }
}

// Update student
async function updateStudent(id, studentData) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        });
        
        if (response.ok) {
            showAlert('Student updated successfully!', 'success');
            resetForm();
            loadStudents();
        } else {
            const error = await response.json();
            showAlert('Error: ' + error.error, 'danger');
        }
    } catch (error) {
        showAlert('Error updating student: ' + error.message, 'danger');
    }
}

// Delete student
async function deleteStudent(id) {
    if (!confirm('Are you sure you want to delete this student?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            showAlert('Student deleted successfully!', 'success');
            loadStudents();
        } else {
            const error = await response.json();
            showAlert('Error: ' + error.error, 'danger');
        }
    } catch (error) {
        showAlert('Error deleting student: ' + error.message, 'danger');
    }
}

// Reset form
function resetForm() {
    studentForm.reset();
    editingStudentId = null;
    submitBtn.textContent = 'Add Student';
    submitBtn.className = 'btn btn-primary';
    cancelBtn.style.display = 'none';
}