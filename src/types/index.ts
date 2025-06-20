// 북마크 노트 관련 타입 정의
export interface BookmarkNote {
	id: number;
	title: string;
	description?: string;
	url: string;
	category: string;
	created_at: string;
	updated_at: string;
	user_id: number;
}

export interface BookmarkNoteCreate {
	title: string;
	description?: string;
	url: string;
	category: string;
}

export interface BookmarkNoteUpdate {
	title?: string;
	description?: string;
	category?: string;
}

// 페이지네이션 관련 타입
export interface PaginationParams {
	page: number;
	per_page: number;
}

export interface PaginatedResponse<T> {
	items: T[];
	total: number;
	page: number;
	per_page: number;
	pages: number;
}

// API 응답 타입
export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	message?: string;
	error?: string;
}

// 카테고리 관련 타입
export interface Category {
	name: string;
	count: number;
}

// 사용자 관련 타입
export interface User {
	id: number;
	github_id?: string;
	google_id?: string;
	username: string;
	email: string;
	avatar_url?: string;
	created_at: string;
}
