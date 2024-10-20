import React, { useState } from 'react';
import './App.css';

function App() {
  // 管理留言列表
  const [messages, setMessages] = useState([]);
  // 暱稱和留言的狀態
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');

  // 提交表單，新增留言
  const handleSubmit = (e) => {
    e.preventDefault();
    if (nickname && message) {
      const newMessage = { id: Date.now(), nickname, message };
      setMessages([newMessage, ...messages]); // 新留言加在最上方
      setNickname(''); // 清空表單欄位
      setMessage('');
    }
  };

  // 刪除留言
  const handleDelete = (id) => {
    setMessages(messages.filter((msg) => msg.id !== id));
  };

  // 一鍵刪除所有留言
  const handleDeleteAll = () => {
    setMessages([]);
  };

  const handleDownloadCSV = () => {
    if (messages.length === 0) return;

    const csvContent = [
      [ '暱稱', '留言'], // CSV 標頭
      ...messages.map((msg) => [msg.nickname, msg.message]), // 逐一加入留言資料
    ]
      .map((row) => row.join(',')) // 每列用逗號分隔
      .join('\n'); // 每行用換行符號分隔

    

    // 加入 UTF-8 BOM 避免亂碼
    const bom = '\uFEFF';
    const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'messages.csv'); // 設定檔名
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click(); // 模擬點擊下載
    document.body.removeChild(link); // 完成後移除連結
  };



  return (
    <div className="container">
      <h1>留言板</h1>
      {/* 表單 */}
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>暱稱：</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
        </div>
        <div>
          <label>留言：</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-btn">提交留言</button>
      </form>

      {/* 一鍵刪除所有留言按鈕 */}
      {messages.length > 0 && (
      <div className="actions">
        <button onClick={handleDeleteAll} className="delete-all-btn">
          刪除所有留言
        </button>
        <button onClick={handleDownloadCSV} className="download-btn">
        下載 CSV
        </button>
      </div>
      )}

      {/* 留言列表 */}
      <div className="message-list">
        {messages.map((msg) => (
          <div key={msg.id} className="message-box">
            <p><strong>{msg.nickname}</strong>: {msg.message}</p>
            <button onClick={() => handleDelete(msg.id)} className="delete-btn">刪除</button>
          </div>
        ))}
      </div>
    </div>
  );
}




export default App;
