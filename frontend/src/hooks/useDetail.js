// hooks/useDetail.js
//
// ONE hook for both detail pages, because they are mirror images:
//
//   /students/5  ->  the student, plus the courses they take
//   /courses/3   ->  the course,  plus the students taking it
//
// Both need "one thing" and "the related things", so both are handled here by
// passing in the two functions that differ.

import { useState, useEffect } from "react";

export function useDetail(id, fetchOne, fetchRelated) {
  const [item, setItem] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // [id] means: run this again if the id in the URL changes.
  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");
      try {
        const [one, many] = await Promise.all([fetchOne(id), fetchRelated(id)]);
        setItem(one);
        setRelated(many);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return { item, related, loading, error };
}
