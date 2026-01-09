import { initStudentController } from "../controllers/studentController.js";
import { initCourseController } from "../controllers/courseController.js";
import { initEnrollmentController } from "../controllers/enrollmentController.js";


async function loadView(path) {
  const html = await fetch(path).then(res => res.text());
  document.querySelector("#app").innerHTML = html;
}

export async function router() {
  const path = window.location.pathname;

  if (path === "/" || path === "/home") {
    await loadView("/frontend/pages/home.html");
  }
  else if (path === "/students") {
    await loadView("/frontend/pages/students.html");
    initStudentController();
  }
  else if (path === "/courses") {
    await loadView("/frontend/pages/courses.html");
    initCourseController();
  }
  else if (path === "/enrollments") {
    await loadView("/frontend/pages/enrollments.html");
    initEnrollmentController();
  }
  else {
    await loadView("/frontend/pages/404.html");
  }
}

export function initRouterEvents() {
  document.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      history.pushState(null, "", e.target.href);
      router();
    }
  });

  window.addEventListener("popstate", router);
}