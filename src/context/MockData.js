import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

const MockDataContext = createContext();
export const useMockData = () => useContext(MockDataContext);

export const MockDataProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [requests, setRequests] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  /* ===================== FETCH DATA ===================== */

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (isAdmin) fetchRequests();
  }, [isAdmin]);

  const fetchBooks = async () => {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setBooks(data || []);
    setLoading(false);
  };

  const fetchRequests = async () => {
    const { data, error } = await supabase
      .from("requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setRequests(data || []);
  };

  /* ===================== CART ===================== */

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const addToCart = (book) => {
    setCart((prev) => [...prev, book]);
  };

  const removeFromCart = (bookId) => {
    setCart((prev) => prev.filter((item) => item.id !== bookId));
  };

  /* ===================== ADMIN LOGIN ===================== */
  // SIMPLE version (no auth yet)
  const loginAdmin = async (username, password) => {
    const { data } = await supabase
      .from("admins")
      .select("*")
      .eq("username", username)
      .eq("password", password)
      .single();

    if (data) {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  /* ===================== BOOKS ===================== */

  const addBook = async (newBook) => {
    const { error } = await supabase.from("books").insert([
      {
        title: newBook.title,
        price: newBook.price,
        category: newBook.category,
        description: newBook.description,
        image: newBook.image,
        pdf_file: newBook.pdfFile?.name || null,
      },
    ]);

    if (!error) {
      fetchBooks();
      return true;
    }
    return false;
  };

  const deleteBook = async (id) => {
    const { error } = await supabase.from("books").delete().eq("id", id);

    if (!error) {
      setBooks((prev) => prev.filter((b) => b.id !== id));
      return true;
    }
    return false;
  };

  /* ===================== REQUESTS ===================== */

  const requestBook = async (request) => {
    const { error } = await supabase.from("requests").insert([
      {
        title: request.title,
        author: request.author || null,
        notes: request.notes || null,
        status: "pending",
      },
    ]);

    if (!error) return true;
    return false;
  };

  // Admin approves request (✔ button)
  const approveRequest = async (id) => {
    const { error } = await supabase
      .from("requests")
      .update({ status: "approved" })
      .eq("id", id);

    if (!error) fetchRequests();
  };

  return (
    <MockDataContext.Provider
      value={{
        books,
        cart,
        addToCart,
        removeFromCart,
        isAdmin,
        loginAdmin,
        addBook,
        deleteBook,
        requests,
        requestBook,
        approveRequest,
        isCartOpen,
        toggleCart,
        loading,
      }}
    >
      {children}
    </MockDataContext.Provider>
  );
};
