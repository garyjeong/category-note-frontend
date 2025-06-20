import {
	BookmarkNote,
	BookmarkNoteCreate,
	BookmarkNoteUpdate,
	PaginatedResponse,
	Category,
	User,
} from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

class ApiClient {
	private baseURL: string;

	constructor(baseURL: string = API_BASE_URL) {
		this.baseURL = baseURL;
	}

	private async request<T>(
		endpoint: string,
		options: RequestInit = {}
	): Promise<T> {
		const url = `${this.baseURL}${endpoint}`;

		const defaultHeaders: Record<string, string> = {
			"Content-Type": "application/json",
		};

		// JWT 토큰이 있다면 헤더에 추가
		const token = localStorage.getItem("access_token");
		if (token) {
			defaultHeaders["Authorization"] = `Bearer ${token}`;
		}

		const config: RequestInit = {
			...options,
			headers: {
				...defaultHeaders,
				...options.headers,
			},
		};

		try {
			const response = await fetch(url, config);

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(
					errorData.detail || `HTTP error! status: ${response.status}`
				);
			}

			return await response.json();
		} catch (error) {
			console.error("API request failed:", error);
			throw error;
		}
	}

	// 북마크 노트 관련 API
	async getBookmarks(
		page: number = 1,
		per_page: number = 10,
		category?: string
	): Promise<PaginatedResponse<BookmarkNote>> {
		const params = new URLSearchParams({
			page: page.toString(),
			per_page: per_page.toString(),
		});

		if (category) {
			params.append("category", category);
		}

		return this.request<PaginatedResponse<BookmarkNote>>(
			`/api/bookmark/?${params}`
		);
	}

	async createBookmark(data: BookmarkNoteCreate): Promise<BookmarkNote> {
		return this.request<BookmarkNote>("/api/bookmark/", {
			method: "POST",
			body: JSON.stringify(data),
		});
	}

	async updateBookmark(
		id: number,
		data: BookmarkNoteUpdate
	): Promise<BookmarkNote> {
		return this.request<BookmarkNote>(`/api/bookmark/${id}`, {
			method: "PUT",
			body: JSON.stringify(data),
		});
	}

	async deleteBookmark(id: number): Promise<void> {
		return this.request<void>(`/api/bookmark/${id}`, {
			method: "DELETE",
		});
	}

	async getBookmark(id: number): Promise<BookmarkNote> {
		return this.request<BookmarkNote>(`/api/bookmark/${id}`);
	}

	// 카테고리 관련 API
	async getCategories(): Promise<Category[]> {
		return this.request<Category[]>("/api/bookmark/categories");
	}

	// 인증 관련 API
	async getCurrentUser(): Promise<User> {
		return this.request<User>("/auth/me");
	}

	async login(provider: "github" | "google"): Promise<void> {
		window.location.href = `${this.baseURL}/auth/login/${provider}`;
	}

	async logout(): Promise<void> {
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
	}

	// URL 메타데이터 추출 (향후 구현 예정)
	async extractUrlMetadata(
		url: string
	): Promise<{ title?: string; description?: string }> {
		try {
			return this.request<{ title?: string; description?: string }>(
				"/api/url/metadata",
				{
					method: "POST",
					body: JSON.stringify({ url }),
				}
			);
		} catch (error) {
			console.warn("URL metadata extraction failed:", error);
			return {};
		}
	}
}

export const apiClient = new ApiClient();
