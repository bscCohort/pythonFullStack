// services/api.js
//
// EVERY endpoint this app can call, in one file.
//
// It used to be five files (studentService, courseService, enrollmentService,
// reportService and profileService) that were each a handful of one-line
// wrappers. One file is easier to hold in your head: if you want to know what
// the backend offers, you read this and you are done.
//
// Nothing here knows that React exists. These are plain functions that return
// promises, so you could use this same file in any JavaScript project.

import { get, post, put, remove } from "./http.js";

// Grouping by resource keeps the call sites readable:
//     api.students.getAll()
//     api.courses.create(data)

export const students = {
  getAll: () => get("/students"),
  getOne: (id) => get(`/students/${id}`),
  create: (data) => post("/students", data),
  update: (id, data) => put(`/students/${id}`, data),
  remove: (id) => remove(`/students/${id}`),
};

export const courses = {
  getAll: () => get("/courses"),
  getOne: (id) => get(`/courses/${id}`),
  create: (data) => post("/courses", data),
  update: (id, data) => put(`/courses/${id}`, data),
  remove: (id) => remove(`/courses/${id}`),
};

// Enrollments have no update: you either create the link or remove it.
export const enrollments = {
  getAll: () => get("/enrollments"),
  create: (data) => post("/enrollments", data),
  remove: (id) => remove(`/enrollments/${id}`),
};

// The report is one read-only query where the DATABASE does the joining.
export const report = {
  getAll: () => get("/reports/enrollments"),
};

// ---------------------------------------------------------------------------
// The two detail pages
// ---------------------------------------------------------------------------
//
// There is no "courses for one student" endpoint on the backend, so we ask for
// the whole joined report and keep the rows we want. That is fine for a
// class-sized database. For a large one you would add a proper endpoint.
//
// These two are mirror images, which is exactly what a join table gives you:
// the same rows, looked at from either end.

export async function coursesForStudent(studentId) {
  const rows = await report.getAll();
  return rows.filter((row) => Number(row.student_id) === Number(studentId));
}

export async function studentsForCourse(courseId) {
  const rows = await report.getAll();
  return rows.filter((row) => Number(row.course_id) === Number(courseId));
}
