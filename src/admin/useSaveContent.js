import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useContent } from "../context/ContentContext";

export function useSaveContent() {
  const { refreshContent } = useContent();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const save = async (newData) => {
    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      // 1. Send to Supabase
      const { error } = await supabase
        .from("content")
        .update({ data: newData, updated_at: new Date().toISOString() })
        .eq("id", 1);

      if (error) throw error;

      // 2. Force the Context to re-fetch everything from Supabase
      await refreshContent();

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      return true;
    } catch (err) {
      setError(err.message || "Failed to save");
      return false;
    } finally {
      setSaving(false);
    }
  };

  return { save, saving, error, success };
}