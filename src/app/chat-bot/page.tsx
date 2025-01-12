// import ChatList from './components/ChatList';
import React from 'react';
import Sidebar from '../../components/Sidebar';
import ChatWindow from '../../components/ChatWindow';

const Chat = () => {
    return (
        <div className='h-screen bg-blue-200 flex justify-center items-center'>
            <div className='h-[97%] w-[97%] bg-gray-900 rounded-3xl flex'>
                <Sidebar/>
                <div className='flex items-center w-full space-x-2'>
                    <ChatWindow/>
                </div>
            </div>
        </div>
    );
};

export default Chat;
