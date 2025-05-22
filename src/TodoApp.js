// src/TodoApp.js
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import { StyledPaper } from './styles/TodoAppStyles';
import TodoItem from './components/TodoItem';
import { useTodoApi } from './hooks/useTodoApi';

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // カスタムフックからAPI呼び出し関数を取得
  const { callGetUserApi, callSetTaskApi, callDeleteTaskApi } = useTodoApi();

  // 初期ロード時にタスクを取得
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await callGetUserApi();
        if (fetchedTasks) {
          setTasks(fetchedTasks);
        }
      } catch (e) {  
        console.error('Error calling:', e);
      }
    };
    fetchTasks();
  }, [callGetUserApi]);

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = async () => {
    if (newTask.trim() !== '') {
      try {
        await callSetTaskApi(newTask); // APIにタスクを追加
        setNewTask(''); // 入力フィールドをクリア
        const updatedTasks = await callGetUserApi(); // 更新されたタスクリストを再取得
        if (updatedTasks) {
          setTasks(updatedTasks);
        }
      } catch (e) {
        console.error('Error calling:', e);
      }
    }
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = async (id) => {
    try {
      await callDeleteTaskApi(id); // APIにタスク削除を要求
      setTasks(tasks.filter((task) => task.id !== id)); // UIからタスクを削除
    } catch (e) {
      console.error('Error calling:', e);
    }
  };

  return (
    <StyledPaper>
      <h1>Todoリスト</h1>
      <TextField
        label="新しいタスク"
        value={newTask}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleAddTask}>
        追加
      </Button>
      <List>
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            onToggleComplete={handleToggleComplete}
            onDeleteTask={handleDeleteTask}
          />
        ))}
      </List>
    </StyledPaper>
  );
}

export default TodoApp;