// frontend/assets/js/controllers/profileController.js
import { $ } from "../utils/dom.js";
import { exportProfileToCSV, exportProfileToPDF } from "../utils/exportTools.js";

function show(id, yes) {
  const el = $(id);
  if (!el) return;
  el.classList[yes ? "remove" : "add"]("hidden");
}

function setText(id, value) {
  const el = $(id);
  if (el) el.textContent = value ?? "";
}

function normalizeEnrollments(rows) {
  return (rows || []).map((r) => ({
    enrollment_id: r.enrollment_id ?? r.id ?? "-",
    course_title: r.course_title ?? "-",
    course_code: r.course_code ?? r.code ?? "-",
    teacher_name: r.teacher_name ?? "-",
    fees: r.fees ?? "-",
    duration_weeks: r.duration_weeks ?? "-",
    enrolled_on: r.enrolled_on ?? "-",
    student_id: r.student_id,
  }));
}

const PROFILE_EXPORT_CONFIG = {
  studentFields: [
    { key: "id", label: "Student ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "year", label: "Year" },
  ],
  rowColumns: [
    { key: "enrollment_id", label: "Enroll ID" },
    { key: "course_title", label: "Course" },
    { key: "course_code", label: "Code" },
    { key: "teacher_name", label: "Teacher" },
    { key: "fees", label: "Fees" },
    { key: "duration_weeks", label: "Weeks" },
    { key: "enrolled_on", label: "Enrolled On" },
  ],
};

export async function initProfileController(studentId) {
  let student = null;
  let enrollments = [];

  // Wire export buttons (reuses the util fully)
  $("profileExportCsvBtn")?.addEventListener("click", () => {
    if (!student) return;
    exportProfileToCSV(`student_${student.id}_profile.csv`, student, enrollments, PROFILE_EXPORT_CONFIG);
  });

  $("profileExportPdfBtn")?.addEventListener("click", () => {
    if (!student) return;
    exportProfileToPDF(`Student ${student.id} - Profile`, student, enrollments, PROFILE_EXPORT_CONFIG);
  });

  try {
    show("basicLoading", true);
    show("basicDetails", false);
    show("joinLoading", true);
    show("joinTableContainer", false);
    show("noEnrollments", false);

    // student
    const studentRes = await fetch(`/api/students/${studentId}`);
    if (!studentRes.ok) throw new Error("Student not found");
    student = await studentRes.json();

    setText("studentId", student.id);
    setText("studentName", student.name);
    setText("studentEmail", student.email);
    setText("studentYear", student.year);

    show("basicLoading", false);
    show("basicDetails", true);

    // enrollments report (JOIN)
    const repRes = await fetch(`/api/reports/enrollments`);
    if (!repRes.ok) throw new Error("Report failed");
    const all = await repRes.json();

    enrollments = normalizeEnrollments(
      (all || []).filter((r) => Number(r.student_id) === Number(studentId))
    );

    // total
    setText("totalEnrollments", enrollments.length);

    // render table
    const body = $("joinTableBody");
    if (body) body.innerHTML = "";

    if (!enrollments.length) {
      show("noEnrollments", true);
    } else {
      enrollments.forEach((r) => {
        const tr = document.createElement("tr");
        tr.className = "border-b";
        tr.innerHTML = `
          <td class="px-3 py-2">${r.enrollment_id}</td>
          <td class="px-3 py-2">${r.course_title}</td>
          <td class="px-3 py-2">${r.course_code}</td>
          <td class="px-3 py-2">${r.teacher_name}</td>
          <td class="px-3 py-2">${r.fees}</td>
          <td class="px-3 py-2">${r.duration_weeks}</td>
          <td class="px-3 py-2">${r.enrolled_on}</td>
        `;
        body?.appendChild(tr);
      });
    }

    show("joinLoading", false);
    show("joinTableContainer", true);
  } catch (err) {
    console.error("[profileController] error:", err);
    show("basicLoading", false);
    show("joinLoading", false);
    show("noEnrollments", true);
    setText("totalEnrollments", 0);
  }
}

export default { initProfileController };