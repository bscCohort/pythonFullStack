// hooks/useEnrollments.js
//
// Enrollments need THREE things from the backend: the enrollments themselves,
// plus the students and courses to fill the two dropdowns. That extra loading
// is why this is not just useResource().
//
// Same fixes as useResource: the first load shows a spinner, later refreshes do
// not, and the delete spinner belongs to the row you clicked rather than to the
// form's button.

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import * as api from "../services/api.js";

export function useEnrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const load = useCallback(async (showSpinner = false) => {
    if (showSpinner) setLoading(true);
    try {
      // Promise.all asks for all three at once instead of one after another.
      const [e, s, c] = await Promise.all([
        api.enrollments.getAll(),
        api.students.getAll(),
        api.courses.getAll(),
      ]);
      setEnrollments(e);
      setStudents(s);
      setCourses(c);
    } catch (err) {
      toast.error(err.message);
    } finally {
      if (showSpinner) setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(true);
  }, [load]);

  async function add(data) {
    setSaving(true);
    try {
      await api.enrollments.create(data);
      toast.success("Student enrolled.");
      await load();          // quiet refresh
      return true;
    } catch (e) {
      toast.error(e.message);
      return false;
    } finally {
      setSaving(false);
    }
  }

  async function remove(id) {
    setDeletingId(id);
    try {
      await api.enrollments.remove(id);
      toast.success("Enrollment removed.");
      await load();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setDeletingId(null);
    }
  }

  return { enrollments, students, courses, loading, saving, deletingId, add, remove };
}
