import { useCallback } from 'react';

// バックエンドのbaseurl
const WEB_API_URL = 'http://127.0.0.1:5000';

export const useTodoApi = () => {

  // /get_user を呼び出す処理
  const callGetUserApi = useCallback(() => {
    return fetch(`${WEB_API_URL}/get_user`, {
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
      // 予定の配列 (tasks) を適切な形式に変換
      const prev_tasks = Object.entries(data).map(([id, task]) => ({
        id: id,
        text: task.task_text,
        completed: task.completed
      }));
      return prev_tasks; // 取得したタスクデータを返す
    })
    .catch(e => {
      console.error('Error calling:', e);
    });
  }, []);

  // /settask を呼び出す処理
  const callSetTaskApi = useCallback((taskText) => {
    return fetch(`${WEB_API_URL}/settask`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([{ text: taskText }]),
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
  }, []);

  // タスク削除API呼び出し
  const callDeleteTaskApi = useCallback((taskId) => {
    return fetch(`${WEB_API_URL}/deletetask`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([{ id: taskId }]),
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
  }, []);

  // ここでAPI呼び出し関数をまとめて返す
  return {
    callGetUserApi,
    callSetTaskApi,
    callDeleteTaskApi,
  };
};