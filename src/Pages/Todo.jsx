import React, { useEffect, useRef, useState } from 'react';
import { auth, db } from '../Config/firebase/firebaseConfig';
import { collection, addDoc, query } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import { updateDoc, where } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import './Todo.css';

const Todo = () => {
    // Reference to the input field for adding new todos
    const todoInput = useRef();
    // State to store the list of todos
    const [todos, setTodos] = useState([]);

    // Function to add a new todo
    const addTodo = async (e) => {
        e.preventDefault(); // Prevents page reload on form submission
        console.log(auth.currentUser.uid);

        try {
            // Add new todo document to Firestore
            const docRef = await addDoc(collection(db, "users"), {
                title: todoInput.current.value, // Get todo text from input
                uid: auth.currentUser.uid,      // Get the user ID
                date: Timestamp.fromDate(new Date()), // Add current timestamp
            });
            console.log("Document written with ID: ", docRef.id);

            // Add new todo to the state
            todos.push({
                title: todoInput.current.value,
                uid: auth.currentUser.uid,
                docid: docRef.id
            });
            setTodos([...todos]);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        console.log(todoInput.current.value);
        todoInput.current.value = ''; // Clear the input field after adding
    };

    // Function to delete a todo
    const deletetodo = async (item, index) => {
        try {
            // Delete todo from Firestore
            await deleteDoc(doc(db, "users", item.docid));
            todos.splice(index, 1); // Remove todo from the state
            setTodos([...todos]);
        } catch (error) {
            console.log(error);
        }
    }

    // Function to edit a todo
    const edittodo = async (item, index) => {
        const updatetodo = prompt("Update todo"); // Prompt user for new todo text
        try {
            const washingtonRef = doc(db, "users", item.docid);
            await updateDoc(washingtonRef, {
                title: updatetodo // Update todo text in Firestore
            });
            todos[index].title = updatetodo; // Update state with new todo text
            setTodos([...todos]);
        } catch (error) {
            console.log(error);
        }
    }

    // Fetch todos from Firestore when component mounts
    useEffect(() => {
        const getdbFromFirebase = async () => {
            const q = query(collection(db, "users"), where("uid", "==", auth.currentUser.uid));
            const querySnapshot = await getDocs(q);
            const fetchedTodos = [];
            querySnapshot.forEach((doc) => {
                fetchedTodos.push({
                    ...doc.data(),
                    docid: doc.id
                });
            });

            setTodos(fetchedTodos);
        };
        getdbFromFirebase();
    }, []);


    return (
        <div className="todo-container">
            <h1>Todo List</h1>
            <div>
                <form onSubmit={addTodo} className="todo-form">
                    <input
                        className="todo-input"
                        type="text"
                        placeholder='Add new todo...'
                        ref={todoInput}
                    />
                    <button type='submit' className="todo-button">
                        Add Todo
                    </button>
                </form>
                <ol className="todo-list">
                    {todos.length > 0 ? todos.map((item, index) => (
                        <div key={index} className="todo-item">
                            <li>{item.title}</li>
                            <div className="todo-actions">
                                <button onClick={() => edittodo(item, index)} className="edit-button">
                                    Edit
                                </button>
                                <button onClick={() => deletetodo(item, index)} className="delete-button">
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
