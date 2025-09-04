import { useState } from 'react'
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Content from '../components/Content';

const Dashboard = () => {
  const [activePage, setActivePage] = useState("content"); // default page

    return (
        <div className="flex h-screen">
        <Sidebar onSelect={setActivePage} activePage={activePage} />
        <div className="flex-1 flex flex-col">
            <Header />
            <main className="p-6 flex-1 overflow-auto">
            {activePage === "content" && <Content />}
            </main> 
        </div>
        </div>
    );
}

export default Dashboard