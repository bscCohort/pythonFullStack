// import { apiGetAll, apiGetOne, apiCreate, apiUpdate, apiDelete } 
//   from "../services/studentService.js";

// import { showAlert } from "../components/Alert.js";
// import { renderStudentTable } from "../components/StudentTable.js";
// import { resetForm, fillForm } from "../components/StudentForm.js";

// import { setState, getState } from "../state/store.js";
// import { $, createElement } from "../utils/dom.js";

// // Setup event listeners and load initial data
// export function initStudentController() {
//   loadStudents();

//   // Handle form submit (create or update)
//   $("studentForm").addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const data = {
//       name: $("name").value.trim(),
//       email: $("email").value.trim(),
//       course: $("course").value.trim(),
//       year: $("year").value.trim()
//     };

//     const { editingId } = getState();

//     editingId
//       ? await updateStudent(editingId, data)
//       : await createNewStudent(data);
//   });

//   // Cancel editing
//   $("cancelBtn").addEventListener("click", () => {
//     setState({ editingId: null });
//     resetForm();
//   });
// }

// // Fetch students and update UI
// export async function loadStudents() {
//   const spinner = $("loadingSpinner");
//   const table = $("studentsTableContainer");

//   spinner.style.display = "block";
//   table.style.display = "none";

//   const students = await apiGetAll();

//   setState({ students });
//   renderStudentTable(students);

//   spinner.style.display = "none";
//   table.style.display = "block";
// }

// // Create a new student
// export async function createNewStudent(data) {
//   const res = await apiCreate(data);
//   if (res.ok) {
//     showAlert("Student added!");
//     resetForm();
//     loadStudents();
//   }
// }

// // Load a student into the form for editing
// export async function editStudent(id) {
//   const student = await apiGetOne(id);

//   setState({ editingId: id });
//   fillForm(student);

//   window.scrollTo({ top: 0, behavior: "smooth" });
// }

// // Update an existing student
// export async function updateStudent(id, data) {
//   const res = await apiUpdate(id, data);
//   if (res.ok) {
//     showAlert("Updated!");
//     resetForm();
//     setState({ editingId: null });
//     loadStudents();
//   }
// }

// // Delete a student
// export async function deleteStudentAction(id) {
//   if (!confirm("Delete this student?")) return;

//   const res = await apiDelete(id);
//  	if (res.ok) {
//     showAlert("Deleted!");
//     loadStudents();
//   }
// }