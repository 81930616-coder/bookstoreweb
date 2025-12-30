import React, { createContext, useContext, useState, useEffect } from 'react';

const MockDataContext = createContext();

export const useMockData = () => useContext(MockDataContext);

export const MockDataProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [cart, setCart] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [requests, setRequests] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const API_URL = 'http://localhost:5000/api';

    // Fetch Books on Mount
    useEffect(() => {
        fetchBooks();
    }, []);

    // Fetch Requests if Admin
    useEffect(() => {
        if (isAdmin) {
            fetchRequests();
        }
    }, [isAdmin]);

    const fetchBooks = async () => {
        try {
            const res = await fetch(`${API_URL}/books`);
            const data = await res.json();
            setBooks(data);
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
            setRequests(data);
        } catch (error) {
            console.error("Error fetching requests:", error);
        }
    };

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    const addToCart = (book) => {
        setCart(prev => [...prev, book]);
    };

    const removeFromCart = (bookId) => {
        setCart(prev => prev.filter(item => item.id !== bookId));
    };

    const loginAdmin = async (username, password) => {
        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (data.success) {
                setIsAdmin(true);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Login error:", error);
            return false;
        }
    };

    const addBook = async (newBook) => {
        try {
            const res = await fetch(`${API_URL}/books`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newBook)
            });
            const savedBook = await res.json();
            setBooks(prev => [...prev, savedBook]);
            return true;
        } catch (error) {
            console.error("Error adding book:", error);
            return false;
        }
    };

    const requestBook = async (request) => {
        try {
            await fetch(`${API_URL}/requests`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(request)
            });
            // Optionally refetch requests if admin is viewing, or just wait
            return true;
        } catch (error) {
            console.error("Error asking for book:", error);
            return false;
        }
    };

    const deleteBook = async (id) => {
        try {
            await fetch(`${API_URL}/books/${id}`, {
                method: 'DELETE',
            });
            setBooks(prev => prev.filter(book => book.id !== id));
            return true;
        } catch (error) {
            console.error("Error deleting book:", error);
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
            addBook,
            requests,
            requestBook,
            deleteBook,
            isCartOpen,
            toggleCart,
            loading
        }}>
            {children}
        </MockDataContext.Provider>
    );
};
