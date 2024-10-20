import React, { useState, useEffect } from 'react';
import './App.css';

const FormComponent = () => {
  // 定義狀態來儲存表單輸入的資料
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');
  const [savedData, setSavedData] = useState({ nickname: '', message: '' });

  // 當組件加載時從 localStorage 讀取資料
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('formData'));
    if (storedData) {
      setSavedData(storedData); // 更新畫面上顯示的資料
    }
  }, []);

  // 表單提交時的處理函數
  const handleSubmit = (e) => {
    e.preventDefault(); // 防止預設的表單提交行為（刷新頁面）

    // 將輸入的資料存儲到 localStorage
    const formData = { nickname, message };
    localStorage.setItem('formData', JSON.stringify(formData));

    // 更新頁面上顯示的已儲存資料
    setSavedData(formData);

    // 清空輸入框
    setNickname('');
    setMessage('');
  };

  return (
    <div>
      <h1>React 表單</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>暱稱：</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)} // 監聽輸入變更
            required
          />
        </div>
        <div>
          <label>想說的話：</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)} // 監聽輸入變更
            required
          />
        </div>
        <button type="submit">提交</button>
      </form>

      <h2>已儲存的資料：</h2>
      <p>暱稱：{savedData.nickname}</p>
      <p>想說的話：{savedData.message}</p>
    </div>
  );
};

export default FormComponent;

