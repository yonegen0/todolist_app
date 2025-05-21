import React, { useEffect, useCallback, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

// バックエンドのbaseurl
const WEB_API_URL = 'http://127.0.0.1:5000';

// スタイルを適用したPaperコンポーネントを作成
const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(2), // 周囲の余白
  padding: theme.spacing(2), // 内部の余白
}));

// スタイルを適用したListItemコンポーネントを作成
const TodoItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1, 0), // 上下の余白
}));

function TodoApp() {
  // Todoアイテムの配列を管理するstate
  const [tasks, setTasks] = useState([]);
  // 新しいTodoアイテムの入力値を管理するstate
  const [newTask, setNewTask] = useState('');
  
  // /get_user を呼び出す処理
  const callGetUserApi = useCallback(() => {
    fetch(`${WEB_API_URL}/get_user`, {
      mode: 'cors',
      method: 'GET'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response)
        }
        return response.json(); // レスポンスが OK なら JSON を解析して次の .then に渡す
      })
      .then(data => {
        // 予定の配列 (tasks) を FullCalendar が認識できるイベントオブジェクトの配列に変換
        const prev_tasks = Object.entries(data).map(([id, task])=> ({
          id:id,
          // イベントのタイトルは予定のテキスト
          text: task.task_text,
          // イベントの開始日は予定の日付
          completed: task.completed
        }));
        if (prev_tasks) {
          setTasks(...tasks, prev_tasks); // 取得したdataを tasks state に設定
        }
      })
      .catch(e => {
        console.error('Error calling:', e);
      });
    }, [WEB_API_URL]);
  
  useEffect(() => {
    // データベースの情報取得
    callGetUserApi();
  }, [callGetUserApi]);

  // /settask を呼び出す処理
  const callSetTaskApi = useCallback(() => {
    fetch(`${WEB_API_URL}/settask`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([{ text: newTask }]),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response)
        }
        return 
      })
      .catch(e => {
        console.error('Error calling:', e);
      });
    }, [newTask]);

  // タスク削除API呼び出し
  const callDeleteTaskApi = useCallback( (id) => {
    fetch(`${WEB_API_URL}/deletetask`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([{ id: id }]),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response)
      }
      return 
    })
    .catch(e => {
      console.error('Error calling:', e);
    });
  }, [WEB_API_URL]);

  // テキスト入力フィールドの値が変更用関数
  const handleInputChange = (event) => {
    setNewTask(event.target.value); // 入力された新しい値をnewTaskに設定
  };

  // 「追加」ボタン用関数
  const handleAddTask = () => {
    // 入力されたタスクが空でなければ
    if (newTask.trim() !== '') {
      // tasks配列に新しいタスクオブジェクトを追加
      callSetTaskApi();
      setNewTask(''); // 入力フィールドをクリア
      callGetUserApi()
    }
  };

  // チェックボックスの状態用関数
  const handleToggleComplete = (id) => {
    // tasks配列を更新
    setTasks(
      tasks.map((task) =>
        // クリックされたタスクのIDと一致するタスクを見つけたら、completedの値を反転させる
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // 「削除」ボタン用関数
  const handleDeleteTask = (id) => {
    // tasks配列からクリックされたタスク削除し、stateを更新
    callDeleteTaskApi(id);
  };

  return (
    <StyledPaper>
      <h1>Todoリスト</h1>
      <TextField
        label="新しいタスク" // ラベル
        value={newTask} // 現在の入力値
        onChange={handleInputChange} // 入力値が変更されたときの処理関数
        fullWidth // 幅を親要素いっぱいに広げる
        margin="normal" // 通常のマージン
      />
      <Button variant="contained" color="primary" onClick={handleAddTask}>
        追加
      </Button>
      <List>
        {/* tasks配列をループ処理して、各タスクに対応するリストアイテムを生成 */}
        {tasks.map((task) => (
          <TodoItem key={task.id}> {/* 各リストアイテムに一意のkeyを設定 */}
            <Checkbox
              checked={task.completed} // チェックボックスの状態（完了済みかどうか）
              onChange={() => handleToggleComplete(task.id)} // チェックボックスの状態が変更されたときの処理関数
            />
            <ListItemText
              primary={task.text} // タスクのテキスト
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }} // 完了済みなら取り消し線スタイルを適用
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task.id)}>
                <DeleteIcon /> {/* 削除アイコン */}
              </IconButton>
            </ListItemSecondaryAction>
          </TodoItem>
        ))}
      </List>
    </StyledPaper>
  );
}

export default TodoApp;