import { useState } from "react";
import type { ContentType } from "../types/contentType";
import { useGetContent, useAddContent , useDeleteContent, useUpdateContent } from "../hooks/useContent";
import AddContentModal from "./AddContentModal";

const Content = () => {
  const [showModal, setShowModal] = useState(false);
  const [editContent , setEditContent] = useState<ContentType | null>(null);
  const [filter, setFilter] = useState("all");
  const { data: contentsResponse, isLoading, isError } = useGetContent();
  const addContentMutation = useAddContent();
  const deleteContentMutation = useDeleteContent();
  const updateContentMutation = useUpdateContent();
  const contents = Array.isArray(contentsResponse)
    ? contentsResponse
    : contentsResponse?.data ?? [];

  const filteredContents =
    filter === "all"
      ? contents
      : contents.filter((item: any) => item.type === filter);

  const handleAddContent = (formData: ContentType) => {
    if(editContent){
      updateContentMutation.mutate({ id: editContent.id, data: formData });
      setShowModal(false);
      setEditContent(null);
      return;
    }
    const newContent = {
      title: formData.title,
      type: formData.type,
      schedule: formData.schedule,
    };

    addContentMutation.mutate(newContent, {
      onSuccess: () => {
        setShowModal(false);
        setEditContent(null);
      },
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleEditContent = (id: number) => {
      const contentToEdit = contents.find((item: ContentType) => item.id === id);
      if (contentToEdit) {
          setEditContent(contentToEdit);
          setShowModal(true);
      }
  };
  const handleDeleteContent = (id: number) => {
    deleteContentMutation.mutate(id);
  };
  if (isLoading) {
    return (          
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-3 text-gray-600">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          <span className="text-sm font-medium">Loading content...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-sm border border-red-200 p-6 max-w-md mx-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">Error loading data</h3>
              <p className="text-sm text-gray-500">Please try refreshing the page</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Content
            </button>

            <div className="flex items-center space-x-2">
              <label htmlFor="filter" className="text-sm font-medium text-gray-700">
                Filter:
              </label>
              <select
                id="filter"
                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="image">📸 Image</option>
                <option value="video">🎥 Video</option>
                <option value="text">📝 Text</option>
              </select>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {filteredContents.length === 0 ? (
            <div className="text-center py-16">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No content found</h3>
              <p className="text-sm text-gray-500 mb-6">Get started by adding your first piece of content.</p>
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Your First Content
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Schedule
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredContents.map((item: Partial<ContentType>) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {item.title}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.type === 'image' ? 'bg-blue-100 text-blue-800' :
                          item.type === 'video' ? 'bg-purple-100 text-purple-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {item.type === 'image' && '📸 '}
                          {item.type === 'video' && '🎥 '}
                          {item.type === 'text' && '📝 '}
                          {item.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {item.schedule} min
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <button
                          onClick={() => handleEditContent(item?.id as number)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteContent(item?.id as number)}
                          className="text-red-600 hover:text-red-900 ml-4"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <AddContentModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSubmit={handleAddContent}
        contentData={editContent || undefined}
        isEditMode={Boolean(editContent)}
      />
    </div>
  );
};

export default Content;