import React, { createContext, useContext, useState, useEffect } from "react";

const MockDataContext = createContext();
export const useMockData = () => useContext(MockDataContext);

export const MockDataProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [cart, setCart] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [requests, setRequests] = useState([]);
    const [purchasedBooks, setPurchasedBooks] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const API_URL = "http://localhost:5000/api"; // make sure your server runs on port 5000

    // ===================== FETCH DATA =====================
    useEffect(() => {
        fetchBooks();
    }, []);

    useEffect(() => {
        if (isAdmin) fetchRequests();
    }, [isAdmin]);

    const fetchBooks = async () => {
        try {
            const res = await fetch(`${API_URL}/books`);
            const data = await res.json();
            setBooks(Array.isArray(data) ? data : []); // make sure it's always an array
        } catch (error) {
            console.error("Error fetching books:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRequests = async () => {
        try {
            const res = await fetch(`${API_URL}/requests`);
            const data = await res.json();
            setRequests(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching requests:", error);
        }
    };

    // ===================== CART =====================
    const toggleCart = () => setIsCartOpen(!isCartOpen);
    const addToCart = (book) => setCart(prev => [...prev, book]);
    const removeFromCart = (bookId) => setCart(prev => prev.filter(item => item.id !== bookId));

    const confirmBuy = () => {
        setPurchasedBooks([...cart]);
        setCart([]);
    };

    // ===================== ADMIN AUTH =====================
    const loginAdmin = async (email, password) => {
        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (data.success) {
                setIsAdmin(true);
                return { success: true };
            }
            return { success: false, message: data.message || 'Login failed' };
        } catch (error) {
            console.error("Login error:", error);
            return { success: false, message: 'Server error' };
        }
    };

    const signupAdmin = async (email, password) => {
        try {
            const res = await fetch(`${API_URL}/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (data.success) {
                return { success: true };
            }
            return { success: false, message: data.message || 'Signup failed' };
        } catch (error) {
            console.error("Signup error:", error);
            return { success: false, message: 'Server error' };
        }
    };

    // ===================== BOOKS =====================
    const addBook = async (newBook) => {
        try {
            const formData = new FormData();
            formData.append('title', newBook.title);
            formData.append('author', newBook.author);
            formData.append('price', newBook.price);
            formData.append('category', newBook.category);
            formData.append('description', newBook.description);
            if (newBook.image) formData.append('image', newBook.image);
            if (newBook.pdfFile) formData.append('pdf_file', newBook.pdfFile);

            const res = await fetch(`${API_URL}/books`, {
                method: "POST",
                body: formData
            });
            const savedBook = await res.json();
            setBooks(prev => [...prev, savedBook]);
            return true;
        } catch (error) {
            console.error("Error adding book:", error);
            return false;
        }
    };

    const updateBook = async (id, updatedFields) => {
        try {
            const formData = new FormData();
            formData.append('title', updatedFields.title);
            formData.append('author', updatedFields.author);
            formData.append('price', updatedFields.price);
            formData.append('category', updatedFields.category);
            formData.append('description', updatedFields.description);
            if (updatedFields.image instanceof File) formData.append('image', updatedFields.image);
            if (updatedFields.pdfFile instanceof File) formData.append('pdf_file', updatedFields.pdfFile);

            const res = await fetch(`${API_URL}/books/${id}`, {
                method: "PUT",
                body: formData
            });
            const updatedBook = await res.json();
            setBooks(prev => prev.map(book => book.id === parseInt(id) ? updatedBook : book));
            return true;
        } catch (error) {
            console.error("Error updating book:", error);
            return false;
        }
    };

    const deleteBook = async (id) => {
        try {
            await fetch(`${API_URL}/books/${id}`, { method: "DELETE" });
            setBooks(prev => prev.filter(book => book.id !== id));
            return true;
        } catch (error) {
            console.error("Error deleting book:", error);
            return false;
        }
    };

    // ===================== REQUESTS =====================
    const requestBook = async (request) => {
        try {
            await fetch(`${API_URL}/requests`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(request)
            });
            fetchRequests(); // refresh requests if admin
            return true;
        } catch (error) {
            console.error("Error requesting book:", error);
            return false;
        }
    };

    const deleteRequest = async (id) => {
        try {
            await fetch(`${API_URL}/requests/${id}`, { method: "DELETE" });
            fetchRequests();
            return true;
        } catch (error) {
            console.error("Error deleting request:", error);
            return false;
        }
    };

    return (
        <MockDataContext.Provider value={{
            books,
            cart,
            addToCart,
            removeFromCart,
            isAdmin,
            loginAdmin,
            signupAdmin,
            addBook,
            updateBook,
            deleteBook,
            requests,
            requestBook,
            deleteRequest,
            purchasedBooks,
            confirmBuy,
            isCartOpen,
            toggleCart,
            loading
        }}>
            {children}
        </MockDataContext.Provider>
    );
};
