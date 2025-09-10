import './App.css'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import { Modal } from 'antd'
import styles from './index.module.scss'

function App() {
  const location = useLocation()
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Google Analytics
    console.log(location, 'location')
  }, [location]);
  const handleClick = () => {
    qiankunWindow.EVENT_BUS.emit('user-login', { userId: 123 });
    // 子应用读取
    const data = JSON.parse(localStorage.getItem('sharedData') as string);
    console.log(data, 'data')
  }
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div>react-child-app</div>
      <button onClick={handleClick}>click</button>
      <button onClick={showModal}>openDialog</button>
      <p className={styles.red}>p标签</p>
      <Modal
        getContainer={() => document.getElementById('subapp-container') || document.body}
        title="Basic Modal"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p className={styles.red}>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  )
}

export default App
