import { supabase } from "./src/supabaseClient";

const test = async () => {
  const { data, error } = await supabase.from("books").select("*");
  if (error) console.log("Error:", error);
  else console.log("Books:", data);
};

test();
