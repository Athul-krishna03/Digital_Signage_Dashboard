import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addContent, deleteContent, getContent, updateContent } from "../api/contentApi";
import type { ContentType } from "../types/contentType";


export const useGetContent = () => {
    return useQuery({
        queryKey: ["content"],
        queryFn: getContent,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

export const useAddContent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addContent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["content"] });
        }
    });
}

export const useUpdateContent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<ContentType> }) => updateContent(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["content"] });
        }
    });
}

export const useDeleteContent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id:number) => deleteContent(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["content"] });
        }
    });
}