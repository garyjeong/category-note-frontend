'use client';

import { useState } from 'react';
import BookmarkForm from '@/components/BookmarkForm';
import BookmarkTable from '@/components/BookmarkTable';
import CategoryFilter from '@/components/CategoryFilter';
import { BookmarkNote } from '@/types';
import { Brain, Plus, List, Sparkles } from 'lucide-react';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [showForm, setShowForm] = useState(true);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  // 북마크 성공적으로 추가되었을 때
  const handleBookmarkSuccess = (bookmark: BookmarkNote) => {
    setNotification({
      type: 'success',
      message: `지식 '${bookmark.title}'이(가) 성공적으로 추가되었습니다!`
    });
    setRefreshTrigger(prev => prev + 1);
    // 3초 후 알림 제거
    setTimeout(() => setNotification(null), 3000);
  };

  // 북마크 추가 실패시
  const handleBookmarkError = (error: string) => {
    setNotification({
      type: 'error',
      message: `지식 추가 실패: ${error}`
    });
    // 5초 후 알림 제거
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <div className="min-h-screen">
      {/* 헤더 */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Brain className="h-8 w-8 text-indigo-600" />
                <Sparkles className="h-4 w-4 text-yellow-500 absolute -top-1 -right-1" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-indigo-600">
                  Category Note
                </h1>
                <p className="text-sm text-slate-500">지식을 정리하고 카테고리별로 관리하세요</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowForm(!showForm)}
                className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  showForm
                    ? 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-700'
                    : 'bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50'
                }`}
              >
                {showForm ? <List className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                {showForm ? '지식 목록 보기' : '새로운 지식 추가'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 알림 */}
      {notification && (
        <div className="fixed top-20 right-4 z-50">
          <div className={`px-6 py-4 rounded-xl shadow-lg border backdrop-blur-sm ${
            notification.type === 'success'
              ? 'bg-emerald-50/90 border-emerald-200 text-emerald-800'
              : 'bg-red-50/90 border-red-200 text-red-800'
          }`}>
            <div className="flex items-center space-x-2">
              <div className={`h-2 w-2 rounded-full animate-pulse ${
                notification.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
              }`} />
              <p className="text-sm font-medium">{notification.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* 메인 컨텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showForm ? (
          <div className="space-y-8">
            {/* 폼 섹션 */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4">
                  <Plus className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-2">새로운 지식 추가</h2>
                <p className="text-slate-600">URL을 입력하여 새로운 지식을 저장하고 정리하세요</p>
              </div>
              
              <BookmarkForm 
                onSuccess={handleBookmarkSuccess}
                onError={handleBookmarkError}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* 필터 섹션 */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <CategoryFilter 
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
              />
            </div>

            {/* 테이블 섹션 */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
              <div className="p-6 border-b border-slate-200/60">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <List className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-800">저장된 지식</h2>
                    <p className="text-sm text-slate-500">
                      {selectedCategory ? `'${selectedCategory}' 카테고리` : '모든 카테고리'}
                    </p>
                  </div>
                </div>
              </div>
              
              <BookmarkTable 
                selectedCategory={selectedCategory}
                refreshTrigger={refreshTrigger}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
