// ============================
// Student Management JS
// ============================

// API Base URL
const API_URL = '/api/students';

// Current editing student ID
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

// --------------------
// Initialize app
// --------------------
document.addEventListener('DOMContentLoaded', () => {
  loadStudents();
  setupFormHandler();
});

// --------------------
// Show alert message
// --------------------
function showAlert(message, type='success') {
  const alert = document.createElement('div');
  alert.className = `px-4 py-2 rounded shadow text-white ${
    type==='success' ? 'bg-green-500' : 'bg-red-500'
  }`;
  alert.textContent = message;
  alertContainer.appendChild(alert);

  setTimeout(() => alert.remove(), 3000);
}

// --------------------
// Load all students
// --------------------
async function loadStudents() {
  loadingSpinner.style.display = 'block';
  studentsTableContainer.style.display = 'none';

  try {
    const res = await fetch(API_URL);
    const students = await res.json();

    loadingSpinner.style.display = 'none';
    studentsTableContainer.style.display = 'block';

    if (students.length === 0) {
      noStudents.style.display = 'block';
      studentsTableBody.innerHTML = '';
    } else {
      noStudents.style.display = 'none';
      displayStudents(students);
    }
  } catch(err) {
    loadingSpinner.style.display = 'none';
    showAlert('Error loading students: ' + err.message, 'danger');
  }
}

// --------------------
// Display students
// --------------------
function displayStudents(students) {
  studentsTableBody.innerHTML = '';

  students.forEach(student => {
    const row = document.createElement('tr');
    row.className = 'border-b';

    row.innerHTML = `
      <td class="px-3 py-2">${student.id}</td>
      <td class="px-3 py-2">${student.name}</td>
      <td class="px-3 py-2">${student.email}</td>
      <td class="px-3 py-2">${student.course}</td>
      <td class="px-3 py-2">${student.year}</td>
      <td class="px-3 py-2 flex space-x-2">
        <button class="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded"
          onclick="editStudent(${student.id})">Edit</button>
        <button class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
          onclick="deleteStudent(${student.id})">Delete</button>
      </td>
    `;

    studentsTableBody.appendChild(row);
  });
}

// --------------------
// Setup form submit handler
// --------------------
function setupFormHandler() {
  studentForm.addEventListener('submit', async e => {
    e.preventDefault();
    const data = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      course: courseInput.value.trim(),
      year: yearInput.value.trim()
    };

    if (editingStudentId) {
      await updateStudent(editingStudentId, data);
    } else {
      await createStudent(data);
    }
  });

  cancelBtn.addEventListener('click', resetForm);
}

// --------------------
// Create student
// --------------------
async function createStudent(data) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    });

    if (res.ok) {
      showAlert('Student added successfully!');
      resetForm();
      loadStudents();
    } else {
      const err = await res.json();
      showAlert(err.error || 'Error adding student', 'danger');
    }
  } catch(err) {
    showAlert('Error: ' + err.message, 'danger');
  }
}

// --------------------
// Edit student
// --------------------
async function editStudent(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const student = await res.json();

    if (res.ok) {
      editingStudentId = id;
      nameInput.value = student.name;
      emailInput.value = student.email;
      courseInput.value = student.course;
      yearInput.value = student.year;

      submitBtn.textContent = 'Update Student';
      submitBtn.className = 'flex-1 bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded';
      cancelBtn.className = 'flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded';
      cancelBtn.style.display = 'inline-block';

      window.scrollTo({top:0, behavior:'smooth'});
    }
  } catch(err) {
    showAlert('Error loading student: ' + err.message, 'danger');
  }
}

// --------------------
// Update student
// --------------------
async function updateStudent(id, data) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    });

    if (res.ok) {
      showAlert('Student updated successfully!');
      resetForm();
      loadStudents();
    } else {
      const err = await res.json();
      showAlert(err.error || 'Error updating student', 'danger');
    }
  } catch(err) {
    showAlert('Error: ' + err.message, 'danger');
  }
}

// --------------------
// Delete student
// --------------------
async function deleteStudent(id) {
  if(!confirm('Are you sure you want to delete this student?')) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, {method:'DELETE'});
    if(res.ok) {
      showAlert('Student deleted successfully!');
      loadStudents();
    } else {
      const err = await res.json();
      showAlert(err.error || 'Error deleting student', 'danger');
    }
  } catch(err) {
    showAlert('Error: ' + err.message, 'danger');
  }
}

// --------------------
// Reset form
// --------------------
function resetForm() {
  studentForm.reset();
  editingStudentId = null;
  submitBtn.textContent = 'Add Student';
  submitBtn.className = 'flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded';
  cancelBtn.style.display = 'none';
}
