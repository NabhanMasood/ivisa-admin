import { useApi } from "./useApi";

interface Guide {
    id: number;
    slug: string;
    title: string;
    description: string;
    content: string;
    category: string;
    featuredImage?: string;
    isPublished: boolean;
    isFeatured?: boolean;
    viewCount: number;
    relatedGuideIds?: number[];
    createdAt: string;
    updatedAt: string;
}

interface CreateGuideData {
    slug: string;
    title: string;
    description: string;
    content: string;
    category: string;
    featuredImage?: string;
    isPublished?: boolean;
    isFeatured?: boolean;
    relatedGuideIds?: number[];
}

interface UpdateGuideData {
    slug?: string;
    title?: string;
    description?: string;
    content?: string;
    category?: string;
    featuredImage?: string;
    isPublished?: boolean;
    isFeatured?: boolean;
    relatedGuideIds?: number[];
}

interface GetGuidesParams {
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
    includeUnpublished?: boolean;
}

export const useGuidesApi = () => {
    const api = useApi();

    const getAllGuides = async (params?: GetGuidesParams) => {
        try {
            // Build query params, ensuring includeUnpublished is passed if true
            const queryParams: any = {};
            if (params?.category) queryParams.category = params.category;
            if (params?.search) queryParams.search = params.search;
            if (params?.page) queryParams.page = params.page;
            if (params?.limit) queryParams.limit = params.limit;
            if (params?.includeUnpublished === true) {
                queryParams.includeUnpublished = true;
            }

            const response = await api.get("/guides", { params: queryParams });
            const backendResponse = response.data;
            console.log("Backend response structure:", backendResponse);

            // Handle different response formats
            let guidesData: any[] = [];
            if (Array.isArray(backendResponse)) {
                // If response is directly an array
                guidesData = backendResponse;
            } else if (backendResponse.guides && Array.isArray(backendResponse.guides)) {
                guidesData = backendResponse.guides;
            } else if (backendResponse.data && Array.isArray(backendResponse.data)) {
                guidesData = backendResponse.data;
            } else if (backendResponse.guide && Array.isArray(backendResponse.guide)) {
                guidesData = backendResponse.guide;
            }

            // Normalize guide data - ensure isPublished and isFeatured are properly set
            const normalizedGuides = guidesData.map((guide: any) => {
                // Log first guide to see structure
                if (guidesData.indexOf(guide) === 0) {
                    console.log("Sample guide from API:", guide);
                    console.log("Available fields:", Object.keys(guide));
                }

                return {
                    ...guide,
                    // Normalize isPublished - check multiple possible field names
                    isPublished: guide.isPublished !== undefined
                        ? guide.isPublished
                        : (guide.published !== undefined
                            ? guide.published
                            : (guide.is_published !== undefined
                                ? guide.is_published
                                : false)),
                    // Normalize isFeatured
                    isFeatured: guide.isFeatured !== undefined
                        ? guide.isFeatured
                        : (guide.featured !== undefined
                            ? guide.featured
                            : (guide.is_featured !== undefined
                                ? guide.is_featured
                                : false)),
                };
            });

            return {
                success: backendResponse.status === true || backendResponse.status === undefined || Array.isArray(backendResponse),
                data: normalizedGuides,
                total: backendResponse.total || normalizedGuides.length,
                page: backendResponse.page || 1,
                limit: backendResponse.limit || 10,
            };
        } catch (error: any) {
            console.error("Error fetching guides:", error);

            let errorMessage = "Failed to fetch guides";
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }

            return {
                success: false,
                message: errorMessage,
                data: [],
                total: 0,
                page: 1,
                limit: 10,
            };
        }
    };

    const getGuideBySlug = async (slug: string) => {
        try {
            const response = await api.get(`/guides/${slug}`);
            const backendResponse = response.data;
            return {
                success: backendResponse.status === true || backendResponse.status === undefined,
                data: backendResponse.guide || backendResponse.data as Guide,
            };
        } catch (error: any) {
            console.error("Error fetching guide:", error);

            let errorMessage = "Failed to fetch guide";
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }

            return {
                success: false,
                message: errorMessage,
                data: null,
            };
        }
    };

    const getGuideById = async (id: number) => {
        try {
            // First try to get by ID directly if backend supports it
            try {
                const directResponse = await api.get(`/guides/${id}`);
                const directBackendResponse = directResponse.data;

                // Check if we got a guide directly
                if (directBackendResponse.guide || directBackendResponse.data) {
                    const guide = directBackendResponse.guide || directBackendResponse.data;
                    if (guide && guide.id) {
                        return {
                            success: true,
                            data: guide as Guide,
                        };
                    }
                }
            } catch (directError: any) {
                // If direct endpoint doesn't exist or fails, fall back to getting all guides
                console.log("Direct ID endpoint not available, fetching all guides");
            }

            // Fallback: Get all guides and filter by ID
            // Include unpublished guides so we can edit drafts too
            const response = await api.get(`/guides`, {
                params: {
                    includeUnpublished: true,
                    // Get a large limit to ensure we find the guide
                    limit: 1000
                }
            });
            const backendResponse = response.data;

            // Handle different response formats
            let guides: any[] = [];
            if (Array.isArray(backendResponse)) {
                guides = backendResponse;
            } else if (backendResponse.guides && Array.isArray(backendResponse.guides)) {
                guides = backendResponse.guides;
            } else if (backendResponse.data && Array.isArray(backendResponse.data)) {
                guides = backendResponse.data;
            } else if (backendResponse.guide && Array.isArray(backendResponse.guide)) {
                guides = backendResponse.guide;
            }

            console.log(`Searching for guide ID ${id} in ${guides.length} guides`);
            console.log("Available guide IDs:", guides.map((g: any) => ({ id: g.id, idType: typeof g.id, title: g.title })));

            // Find guide by ID (handle both number and string IDs)
            const guide = guides.find((g: any) => {
                const guideId = typeof g.id === 'string' ? parseInt(g.id, 10) : g.id;
                const searchId = typeof id === 'string' ? parseInt(id, 10) : id;
                return guideId === searchId || g.id === id || g.id === String(id);
            });

            if (guide) {
                return {
                    success: true,
                    data: guide as Guide,
                };
            } else {
                console.error("Guide not found. Available guides:", guides.map((g: any) => ({ id: g.id, title: g.title })));
                return {
                    success: false,
                    message: `Guide with ID ${id} not found`,
                    data: null,
                };
            }
        } catch (error: any) {
            console.error("Error fetching guide:", error);

            let errorMessage = "Failed to fetch guide";
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }

            return {
                success: false,
                message: errorMessage,
                data: null,
            };
        }
    };

    const getCategories = async () => {
        try {
            const response = await api.get("/guides/categories");
            const backendResponse = response.data;
            return {
                success: backendResponse.status === true || backendResponse.status === undefined,
                data: backendResponse.categories || backendResponse.data || [],
            };
        } catch (error: any) {
            console.error("Error fetching categories:", error);

            let errorMessage = "Failed to fetch categories";
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }

            return {
                success: false,
                message: errorMessage,
                data: [],
            };
        }
    };

    const createGuide = async (guideData: CreateGuideData) => {
        try {
            const response = await api.post("/guides", guideData);
            const backendResponse = response.data;
            return {
                success: backendResponse.status === true || backendResponse.status === undefined,
                data: backendResponse.guide || backendResponse.data as Guide,
                message: backendResponse.message || "Guide created successfully",
            };
        } catch (error: any) {
            console.error("Error creating guide:", error);

            let errorMessage = "Failed to create guide";
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }

            return {
                success: false,
                message: errorMessage,
                data: null,
            };
        }
    };

    const updateGuide = async (id: number, guideData: UpdateGuideData) => {
        try {
            const response = await api.patch(`/guides/${id}`, guideData);
            const backendResponse = response.data;
            return {
                success: backendResponse.status === true || backendResponse.status === undefined,
                data: backendResponse.guide || backendResponse.data as Guide,
                message: backendResponse.message || "Guide updated successfully",
            };
        } catch (error: any) {
            console.error("Error updating guide:", error);

            let errorMessage = "Failed to update guide";
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }

            return {
                success: false,
                message: errorMessage,
                data: null,
            };
        }
    };

    const deleteGuide = async (id: number) => {
        try {
            const response = await api.delete(`/guides/${id}`);
            const backendResponse = response.data;
            return {
                success: backendResponse.status === true || backendResponse.status === undefined,
                message: backendResponse.message || "Guide deleted successfully",
            };
        } catch (error: any) {
            console.error("Error deleting guide:", error);

            let errorMessage = "Failed to delete guide";
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }

            return {
                success: false,
                message: errorMessage,
            };
        }
    };

    return {
        getAllGuides,
        getGuideBySlug,
        getGuideById,
        getCategories,
        createGuide,
        updateGuide,
        deleteGuide,
    };
};

