import React from 'react';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import { TodoItem as StyledTodoItem } from '../styles/TodoAppStyles';

function TodoItem({ task, onToggleComplete, onDeleteTask }) {
  return (
    <StyledTodoItem key={task.id}>
      <Checkbox
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
      />
      <ListItemText
        primary={task.text}
        style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={() => onDeleteTask(task.id)}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </StyledTodoItem>
  );
}

export default TodoItem;