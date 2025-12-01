import { $, createElement } from "../utils/dom.js";

export function resetForm() {
  $("studentForm").reset();
  $("submitBtn").textContent = "Add Student";
  $("cancelBtn").style.display = "none";
}

export function fillForm(student) {
  $("name").value = student.name;
  $("email").value = student.email;
  $("course").value = student.course;
  $("year").value = student.year;

  $("submitBtn").textContent = "Update Student";
  $("cancelBtn").style.display = "inline-block";
}