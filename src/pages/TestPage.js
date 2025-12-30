import { useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function TestPage() {
  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await supabase.from("books").select("*");
      console.log("Books data:", data);
      console.log("Error:", error);
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Testing Supabase Connection</h1>
      <p>Open console to see results.</p>
    </div>
  );
}
