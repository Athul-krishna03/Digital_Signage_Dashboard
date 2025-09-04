import React, { useState, useEffect } from 'react';
import Modal from './ui/Modal';
import type { ContentType } from '../types/contentType';

interface AddContentModalProps {
    isOpen: boolean;
    onClose: () => void;
    isEditMode?: boolean;
    contentData?: ContentType;
    onSubmit: (formData: ContentType) => void;
}

const AddContentModal: React.FC<AddContentModalProps> = ({
    isOpen,
    onClose,
    isEditMode = false,
    contentData,
    onSubmit,
}) => {
    const [formValues, setFormValues] = useState<ContentType>({
        id: 0,
        title: '',
        type: 'image',
        schedule: 1,
    });
    useEffect(() => {
        if (isEditMode && contentData) {
        setFormValues(contentData);
        } else {
        setFormValues({
            id: 0,
            title: '',
            type: 'image',
            schedule: 1,
        });
        }
    }, [isEditMode, contentData]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({
        ...prev,
        [name]: name === 'schedule' ? Number(value) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formValues); 
        onClose();
    };

    return (
        <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={isEditMode ? 'Edit Content' : 'Add New Content'}
        >
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
            <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
            >
                Title
            </label>
            <input
                id="title"
                type="text"
                name="title"
                required
                value={formValues.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="Enter content title"
            />
            </div>
            <div>
            <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700 mb-2"
            >
                Content Type
            </label>
            <select
                id="type"
                name="type"
                required
                value={formValues.type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            >
                <option value="image">Image</option>
                <option value="video">Video</option>
                <option value="text">Text</option>
            </select>
            </div>
            <div>
            <label
                htmlFor="schedule"
                className="block text-sm font-medium text-gray-700 mb-2"
            >
                Schedule Duration
            </label>
            <div className="relative">
                <input
                id="schedule"
                type="number"
                name="schedule"
                min="1"
                max="1440"
                required
                value={formValues.schedule}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="Enter duration"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 text-sm">minutes</span>
                </div>
            </div>
            </div>
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
            >
                Cancel
            </button>
            <button
                type="submit"
                className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
            >
                <span className="flex items-center">
                <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                </svg>
                {isEditMode ? 'Update Content' : 'Save Content'}
                </span>
            </button>
            </div>
        </form>
        </Modal>
    );
};

export default AddContentModal;
