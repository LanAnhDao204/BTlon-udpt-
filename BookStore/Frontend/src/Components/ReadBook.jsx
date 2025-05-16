import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import API_URL from '../config';

const ReadBook = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fontSize, setFontSize] = useState(16);
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const fetchBook = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_URL}/book/read/${id}`);
                setBook(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching book:', error);
                toast.error('Failed to load book content');
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    const increaseFontSize = () => {
        if (fontSize < 24) {
            setFontSize(fontSize + 2);
        }
    };

    const decreaseFontSize = () => {
        if (fontSize > 12) {
            setFontSize(fontSize - 2);
        }
    };

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500"></div>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <h1 className="text-2xl font-bold text-red-500">Book not found</h1>
                <Link to="/" className="mt-4 text-pink-500 hover:text-pink-700">
                    Go back to home
                </Link>
            </div>
        );
    }

    const bgColor = theme === 'light' ? 'bg-slate-100' : 'bg-slate-900';
    const textColor = theme === 'light' ? 'text-slate-900' : 'text-white';

    return (
        <div className={`min-h-screen ${bgColor} ${textColor} transition-colors duration-300`}>
            <div className="container mx-auto py-10 px-4 md:px-10">
                <div className="flex justify-between items-center mb-8">
                    <Link to="/" className="flex items-center text-pink-500 hover:text-pink-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Books
                    </Link>
                    <div className="flex items-center space-x-4">
                        <button 
                            onClick={decreaseFontSize} 
                            className="p-2 rounded-full bg-pink-500 text-white hover:bg-pink-700"
                        >
                            A-
                        </button>
                        <button 
                            onClick={increaseFontSize} 
                            className="p-2 rounded-full bg-pink-500 text-white hover:bg-pink-700"
                        >
                            A+
                        </button>
                        <button 
                            onClick={toggleTheme} 
                            className="p-2 rounded-full bg-pink-500 text-white hover:bg-pink-700"
                        >
                            {theme === 'light' ? '🌙' : '☀️'}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row mb-10">
                    <div className="md:w-1/4 mb-6 md:mb-0 flex justify-center">
                        <img 
                            src={book.image} 
                            alt={book.name} 
                            className="w-48 h-64 object-cover rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="md:w-3/4 md:pl-10">
                        <h1 className="text-3xl font-bold mb-2">{book.name}</h1>
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="px-3 py-1 bg-pink-500 text-white rounded-full text-sm">
                                {book.category}
                            </span>
                            <span className="px-3 py-1 bg-gray-500 text-white rounded-full text-sm">
                                {book.lang}
                            </span>
                        </div>
                        <p className="text-lg mb-6">{book.title}</p>
                    </div>
                </div>

                <div className="border-t border-gray-300 dark:border-gray-700 pt-8">
                    <div 
                        className="prose prose-lg max-w-none dark:prose-invert"
                        style={{ fontSize: `${fontSize}px` }}
                    >
                        {book.content ? (
                            <div className="whitespace-pre-line">{book.content}</div>
                        ) : (
                            <div className="text-center p-10 text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <p className="text-xl">No content available for this book yet.</p>
                                <p className="mt-2">Please check back later or try another book.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReadBook; 