📑 Digital Signage Content Manager

A simple content management dashboard for digital signage.
Built with React + TypeScript + Tailwind + TanStack Query, using json-server as a mock backend.

🚀 Getting Started
1. Clone the repo
     
       git clone https://github.com/Athul-krishna03/Digital_Signage_Dashboard.git
       cd 

2. Install dependencies

       npm install
       cd client -> npm install
  

4. Start the server
    
       npm run dev (used concurrently so it will run the react app as well as json_server)


The React app will be available at:

http://localhost:5173

⚡ Features Implemented

📄 Content List
Displays all signage content in a table.

➕ Add Content
Add new content via a modal form.

✏️ Edit Content
Edit existing content with pre-filled modal.

❌ Delete Content
Remove content items directly from the table.

🔍 Filter by Type
Dropdown to filter content by type (image, video, text).

🗂 Mock Backend
All data is read/written from db.json via json-server.

🔄 Realtime Updates
Uses TanStack Query to re-fetch and update UI after add/edit/delete.

📂 Project Structure (important files)
src/
 ├── api/
 ├    ├── contentApi.ts
 ├── components/
 ├    ├── Header.tsx  
 ├    ├── Sidebar.tsx  
 │    ├── Content.tsx          # Main content area (table, filter, add button)
 │    ├── AddContentModal.tsx  # Modal for add/edit
 │    └── ui/Modal.tsx         # Reusable modal component
 │
 ├── hooks/
 │    └── useContent.ts        # React Query hooks (get, add, edit, delete)
 │
 ├── types/
 │    └── contentType.ts       # TypeScript types
 ├── pages/
 |    ├── Dashboard.tsx        #Dashboard Page
 │
 └── App.tsx

⚛️ React + TypeScript

🎨 Tailwind CSS

🔄 TanStack Query (react-query)

🗄 json-server (mock backend)
