import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import * as localContent from "../data/content";

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [content, setContent] = useState(localContent);
  const [loading, setLoading] = useState(true);
  const [usingSupabase, setUsingSupabase] = useState(false);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from("content")
        .select("data")
        .eq("id", 1)
        .single();

      if (error) throw error;

      if (data?.data && Object.keys(data.data).length > 0) {
        setContent({ ...localContent, ...data.data });
        setUsingSupabase(true);
      }
    } catch (err) {
      console.warn("⚠️ Supabase load failed:", err.message);
    }
  };

  useEffect(() => {
    async function load() {
      await fetchContent();
      setLoading(false);
    }
    load();
  }, []);

  return (
    <ContentContext.Provider value={{ content, loading, usingSupabase, refreshContent: fetchContent }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used inside ContentProvider");
  return ctx;
}