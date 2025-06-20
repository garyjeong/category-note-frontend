'use client';

import { useState, useEffect, useCallback } from 'react';
import { BookmarkNote, PaginatedResponse } from '@/types';
import { apiClient } from '@/lib/api';
import { ExternalLink, Trash2, Calendar, Tag, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface BookmarkTableProps {
  selectedCategory?: string;
  refreshTrigger?: number;
}

export default function BookmarkTable({ selectedCategory, refreshTrigger }: BookmarkTableProps) {
  const [bookmarks, setBookmarks] = useState<PaginatedResponse<BookmarkNote> | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 지식 데이터 로드
  const loadBookmarks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiClient.getBookmarks(currentPage, perPage, selectedCategory);
      setBookmarks(data);
    } catch (error) {
      console.error('지식 로드 실패:', error);
      setError('지식을 불러오는데 실패했습니다.');
      setBookmarks(null);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, perPage, selectedCategory]);

  // 데이터 로드 트리거
  useEffect(() => {
    loadBookmarks();
  }, [loadBookmarks, refreshTrigger]);

  // 카테고리 변경 시 첫 페이지로 이동
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // 페이지 변경
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 페이지당 항목 수 변경
  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1); // 첫 페이지로 리셋
  };

  // 지식 삭제
  const handleDelete = async (id: number) => {
    if (!confirm('이 지식을 정말 삭제하시겠습니까?')) return;
    
    try {
      await apiClient.deleteBookmark(id);
      loadBookmarks(); // 목록 새로고침
    } catch (error) {
      console.error('지식 삭제 실패:', error);
      alert('지식 삭제에 실패했습니다.');
    }
  };

  // 페이지네이션 정보 계산
  const totalPages = bookmarks?.pages || 0;
  const startItem = bookmarks ? (currentPage - 1) * perPage + 1 : 0;
  const endItem = bookmarks ? Math.min(currentPage * perPage, bookmarks.total) : 0;

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // URL 도메인 추출
  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return url;
    }
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Trash2 className="h-8 w-8 text-red-500" />
        </div>
        <p className="text-red-600 font-medium">{error}</p>
        <button
          onClick={loadBookmarks}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 상단 컨트롤 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6">
        <div className="flex items-center space-x-4">
          <select
            value={perPage}
            onChange={(e) => handlePerPageChange(Number(e.target.value))}
            className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            disabled={isLoading}
          >
            <option value={10}>10개씩 보기</option>
            <option value={20}>20개씩 보기</option>
            <option value={50}>50개씩 보기</option>
          </select>
          
          {bookmarks && (
            <span className="text-sm text-slate-600">
              총 <span className="font-semibold text-indigo-600">{bookmarks.total}</span>개의 지식
            </span>
          )}
        </div>

        {/* 새로고침 버튼 */}
        <button
          onClick={loadBookmarks}
          disabled={isLoading}
          className="inline-flex items-center px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50"
        >
          <MoreHorizontal className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          새로고침
        </button>
      </div>

      {/* 로딩 상태 */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      )}

      {/* 지식 목록 */}
      {!isLoading && bookmarks && (
        <>
          {bookmarks.items.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Tag className="h-8 w-8 text-slate-400" />
              </div>
              <p className="text-slate-500 font-medium mb-2">
                {selectedCategory ? `'${selectedCategory}' 카테고리에` : ''} 저장된 지식이 없습니다
              </p>
              <p className="text-sm text-slate-400">
                첫 번째 지식을 추가해보세요!
              </p>
            </div>
          ) : (
            <div className="space-y-3 px-6">
              {bookmarks.items.map((bookmark) => (
                <div
                  key={bookmark.id}
                  className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:bg-slate-50 transition-all duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      {/* 제목과 URL */}
                      <div className="mb-3">
                        <h3 className="text-lg font-semibold text-slate-800 mb-1 line-clamp-2">
                          {bookmark.title}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-slate-500">
                          <span className="px-2 py-1 bg-slate-100 rounded-md font-mono">
                            {getDomain(bookmark.url)}
                          </span>
                          <span>•</span>
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(bookmark.created_at)}
                          </div>
                        </div>
                      </div>

                      {/* 설명 */}
                      {bookmark.description && (
                        <p className="text-slate-600 text-sm mb-3 line-clamp-2">
                          {bookmark.description}
                        </p>
                      )}

                      {/* 카테고리 */}
                      <div className="flex items-center space-x-2">
                        <div className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                          <Tag className="h-3 w-3 mr-1" />
                          {bookmark.category}
                        </div>
                      </div>
                    </div>

                    {/* 액션 버튼들 */}
                    <div className="flex items-center space-x-2 ml-4">
                      <a
                        href={bookmark.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        보기
                      </a>
                      
                      <button
                        onClick={() => handleDelete(bookmark.id)}
                        className="inline-flex items-center px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200">
              <div className="text-sm text-slate-600">
                {startItem}-{endItem} / {bookmarks.total}개 지식
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {/* 페이지 번호들 */}
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                    if (pageNum > totalPages) return null;
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                          currentPage === pageNum
                            ? 'bg-indigo-600 text-white'
                            : 'text-slate-600 bg-white hover:bg-slate-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
} 