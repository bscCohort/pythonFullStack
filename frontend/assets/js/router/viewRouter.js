import { initStudentController } from "../controllers/studentController.js";
import { initCourseController } from "../controllers/courseController.js";
import { initEnrollmentController } from "../controllers/enrollmentController.js";
import { initEnrollmentReportController } from "../controllers/reportController.js";

async function loadView(path) {
  const res = await fetch(path);

  // If the view file is missing, show 404 view
  if (!res.ok) {
    const fallback = await fetch("/frontend/pages/404.html").then((r) => r.text());
    document.querySelector("#app").innerHTML = fallback;
    return;
  }

  const html = await res.text();
  document.querySelector("#app").innerHTML = html;

  // If Mermaid is available, re-render diagrams after HTML injection
  if (window.mermaid) {
    try {
      await window.mermaid.run({ querySelector: "#app .mermaid" });
    } catch (e) {
      console.warn("Mermaid render skipped:", e);
    }
  }
}

export async function router() {
  // Normalize path: remove trailing slash (except "/")
  let path = window.location.pathname;
  if (path.length > 1) path = path.replace(/\/$/, "");

  if (path === "/" || path === "/home") {
    await loadView("/frontend/pages/home.html");
  } else if (path === "/students") {
    await loadView("/frontend/pages/students.html");
    initStudentController();
  } else if (path === "/courses") {
    await loadView("/frontend/pages/courses.html");
    initCourseController();
  } else if (path === "/enrollments") {
    await loadView("/frontend/pages/enrollments.html");
    initEnrollmentController();
  } else if (path === "/reports/enrollments") {
    await loadView("/frontend/pages/report_enrollments.html");
    initEnrollmentReportController();
  } else if (path === "/docs/flow") {
    await loadView("/frontend/pages/flow.html");
  } else {
    await loadView("/frontend/pages/404.html");
  }
}

export function initRouterEvents() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-link]");
    if (!link) return;

    e.preventDefault();
    history.pushState(null, "", link.getAttribute("href"));
    router();
  });

  window.addEventListener("popstate", router);
}