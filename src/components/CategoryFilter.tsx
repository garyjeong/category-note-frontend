'use client';

import { useState, useEffect } from 'react';
import { Category } from '@/types';
import { apiClient } from '@/lib/api';
import { Tag, Filter, X, ChevronDown, Brain } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory?: string;
  onCategorySelect: (category?: string) => void;
}

export default function CategoryFilter({ selectedCategory, onCategorySelect }: CategoryFilterProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // 카테고리 목록 로드
  const loadCategories = async () => {
    setIsLoading(true);
    try {
      const data = await apiClient.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('카테고리 로드 실패:', error);
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleCategoryClick = (category?: string) => {
    onCategorySelect(category);
  };

  const clearFilter = () => {
    onCategorySelect(undefined);
  };

  return (
    <div className="space-y-4">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
            <Filter className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800">카테고리 필터</h3>
            <p className="text-sm text-slate-500">
              {categories.length > 0 ? `${categories.length}개 카테고리` : '카테고리 로딩 중...'}
            </p>
          </div>
        </div>
        
        {/* 확장/축소 버튼 */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors duration-200"
        >
          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* 현재 선택된 카테고리 표시 */}
      {selectedCategory && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-indigo-800">
                  <strong>&apos;{selectedCategory}&apos;</strong> 카테고리의 지식을 표시 중입니다.
                </p>
              </div>
            </div>
            <button
              onClick={clearFilter}
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-indigo-700 bg-white rounded-lg hover:bg-indigo-50 transition-colors duration-200"
            >
              <X className="h-3 w-3 mr-1" />
              필터 해제
            </button>
          </div>
        </div>
      )}

      {/* 카테고리 목록 */}
      {(isExpanded || !selectedCategory) && (
        <div className="space-y-3">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <>
              {/* 전체 보기 버튼 */}
              <button
                onClick={() => handleCategoryClick(undefined)}
                className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
                  !selectedCategory
                    ? 'bg-gradient-to-r from-slate-600 to-slate-700 text-white shadow-lg'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    !selectedCategory 
                      ? 'bg-white/20' 
                      : 'bg-slate-100'
                  }`}>
                    <Tag className={`h-4 w-4 ${
                      !selectedCategory ? 'text-white' : 'text-slate-600'
                    }`} />
                  </div>
                  <span className="font-medium">전체 지식</span>
                </div>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  !selectedCategory
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {categories.reduce((total, cat) => total + cat.count, 0)}
                </span>
              </button>

              {/* 개별 카테고리 버튼들 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => handleCategoryClick(category.name)}
                    className={`flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
                      selectedCategory === category.name
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                        : 'bg-white text-slate-700 hover:bg-slate-50 hover:shadow-md border border-slate-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        selectedCategory === category.name 
                          ? 'bg-white/20' 
                          : 'bg-slate-100'
                      }`}>
                        <Tag className={`h-4 w-4 ${
                          selectedCategory === category.name ? 'text-white' : 'text-slate-600'
                        }`} />
                      </div>
                      <span className="font-medium text-sm truncate">{category.name}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      selectedCategory === category.name
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>

              {categories.length === 0 && !isLoading && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Tag className="h-8 w-8 text-slate-400" />
                  </div>
                  <p className="text-slate-500 text-sm">
                    아직 카테고리가 없습니다.<br />
                    첫 번째 지식을 추가해보세요!
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
} 