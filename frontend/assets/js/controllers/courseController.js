import { apiGetAll, apiGetOne, apiCreate, apiUpdate, apiDelete } from "../services/courseService.js";
import { showAlert } from "../components/Alert.js";
import { renderCourseTable } from "../components/CourseTable.js";
import { resetCourseForm, fillCourseForm } from "../components/CourseForm.js";
import { setState, getState } from "../state/store.js";
import { $ } from "../utils/dom.js";

export function initCourseController() {
  loadCourses();

  $("courseForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      title: $("title").value.trim(),
      code: $("code").value.trim()
    };

    const { editingId } = getState();

    editingId
      ? await updateCourse(editingId, data)
      : await createNewCourse(data);
  });

  $("cancelBtn").addEventListener("click", () => {
    setState({ editingId: null });
    resetCourseForm();
  });
}

async function loadCourses() {
  const spinner = $("loadingSpinner");
  const table = $("coursesTableContainer");

  spinner.style.display = "block";
  table.style.display = "none";

  const courses = await apiGetAll();
  setState({ courses });
  renderCourseTable(courses);

  spinner.style.display = "none";
  table.style.display = "block";
}

async function createNewCourse(data) {
  const res = await apiCreate(data);
  if (res.ok) {
    showAlert("Course added!");
    resetCourseForm();
    loadCourses();
  }
}

export async function editCourse(id) {
  const course = await apiGetOne(id);
  setState({ editingId: id });
  fillCourseForm(course);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function updateCourse(id, data) {
  const res = await apiUpdate(id, data);
  if (res.ok) {
    showAlert("Course updated!");
    resetCourseForm();
    setState({ editingId: null });
    loadCourses();
  }
}

export async function deleteCourseAction(id) {
  if (!confirm("Delete this course?")) return;
  const res = await apiDelete(id);
  if (res.ok) {
    showAlert("Course deleted!");
    loadCourses();
  }
}