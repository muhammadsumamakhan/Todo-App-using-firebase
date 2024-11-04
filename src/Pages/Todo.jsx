import React, { useEffect, useRef, useState } from 'react';
import { auth, db } from '../Config/firebase/firebaseConfig';
import { collection, addDoc, query, doc, deleteDoc, updateDoc, where, getDocs, Timestamp } from "firebase/firestore";
import './Todo.css';

const Todo = () => {
    const todoInput = useRef();
    const [todos, setTodos] = useState([]);

    // Function to add a new todo
    const addTodo = async (e) => {
        e.preventDefault();

        try {
            const docRef = await addDoc(collection(db, "users"), {
                title: todoInput.current.value,
                uid: auth.currentUser.uid,
                date: Timestamp.fromDate(new Date()),
            });

            setTodos([...todos, {
                title: todoInput.current.value,
                uid: auth.currentUser.uid,
                docid: docRef.id
            }]);

            todoInput.current.value = ''; // Clear input
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    // Function to delete a todo
    const deleteTodo = async (item, index) => {
        try {
            await deleteDoc(doc(db, "users", item.docid));
            const updatedTodos = todos.filter((_, i) => i !== index);
            setTodos(updatedTodos);
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };

    // Function to edit a todo
    const editTodo = async (item, index) => {
        const updatedTitle = prompt("Update todo", item.title);
        if (updatedTitle) {
            try {
                const todoRef = doc(db, "users", item.docid);
                await updateDoc(todoRef, { title: updatedTitle });
                const updatedTodos = [...todos];
                updatedTodos[index].title = updatedTitle;
                setTodos(updatedTodos);
            } catch (error) {
                console.error("Error updating document: ", error);
            }
        }
    };

    // Fetch todos from Firestore on component mount
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const q = query(collection(db, "users"), where("uid", "==", auth.currentUser.uid));
                const querySnapshot = await getDocs(q);
                const fetchedTodos = querySnapshot.docs.map(doc => ({
                    ...doc.data(),
                    docid: doc.id
                }));
                setTodos(fetchedTodos);
            } catch (error) {
                console.error("Error fetching documents: ", error);
            }
        };
        fetchTodos();
    }, []);

    return (
        <div className="todo-container">
            <h1>Todo List</h1>
            <div>
                <form onSubmit={addTodo} className="todo-form">
                    <input
                        className="todo-input"
                        type="text"
                        placeholder="Add new todo..."
                        ref={todoInput}
                    />
                    <button type="submit" className="todo-button">
                        Add Todo
                    </button>
                </form>
                <ol className="todo-list">
                    {todos.length > 0 ? todos.map((item, index) => (
                        <div key={item.docid} className="todo-item">
                            <li>{item.title}</li>
                            <div className="todo-actions">
                                <button onClick={() => editTodo(item, index)} className="edit-button">
                                    Edit
                                </button>
                                <button onClick={() => deleteTodo(item, index)} className="delete-button">
                                    Delete
                                </button>
                            </div>
                        </div>
                    )) : <h5>No Data Found...</h5>}
                </ol>
            </div>
        </div>
    );
};

export default Todo;
