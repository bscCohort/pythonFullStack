// hooks/useResource.js
//
// ONE hook for students and courses, because they behave identically: load a
// list, add, edit, delete. Only the service differs, so we pass it in.
//
// THREE BUGS THIS FIXES, all of which made the app feel broken
//
// 1. The whole page used to go white after every save.
//    Every write called load(), load() set loading = true, and the page did
//    "if (loading) return <Spinner/>", which threw away the entire screen.
//    Now the FIRST load shows a spinner and later reloads do not, so the table
//    stays on screen and simply updates.
//
// 2. Deleting a row used to spin the "Add" button.
//    There was one shared "busy" flag, so any write lit up the form. Now we
//    remember WHICH row is busy, so the spinner appears where you clicked.
//
// 3. Messages piled up.
//    We now use react-hot-toast: one call, it appears in the corner, it fades
//    by itself. No banner state to manage and nothing left stale on screen.

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

export function useResource(service, labels) {
  const [items, setItems] = useState([]);

  // Only true while the FIRST load is happening.
  const [loading, setLoading] = useState(true);

  // Is the add/edit form waiting on the server?
  const [saving, setSaving] = useState(false);

  // Which row id is being deleted, or null. Lets the spinner go on that row.
  const [deletingId, setDeletingId] = useState(null);

  // showSpinner=false means "refresh the data quietly, leave the table up"
  const load = useCallback(
    async (showSpinner = false) => {
      if (showSpinner) setLoading(true);
      try {
        setItems(await service.getAll());
      } catch (e) {
        toast.error(e.message);
      } finally {
        if (showSpinner) setLoading(false);
      }
    },
    [service]
  );

  useEffect(() => {
    // true here: this is the first load, so a spinner is correct.
    load(true);
  }, [load]);

  async function save(action, successText) {
    setSaving(true);
    try {
      await action();
      toast.success(successText);
      await load();          // quiet refresh, page stays put
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
      await service.remove(id);
      toast.success(`${labels.one} deleted.`);
      await load();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setDeletingId(null);
    }
  }

  return {
    items,
    loading,
    saving,
    deletingId,
    add: (data) => save(() => service.create(data), `${labels.one} added.`),
    edit: (id, data) => save(() => service.update(id, data), `${labels.one} updated.`),
    remove,
  };
}
