'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BookmarkNote, BookmarkNoteCreate } from '@/types';
import { apiClient } from '@/lib/api';
import { Link, Loader2, Sparkles } from 'lucide-react';

interface BookmarkFormProps {
  onSuccess?: (bookmark: BookmarkNote) => void;
  onError?: (error: string) => void;
}

interface FormData {
  url: string;
}

export default function BookmarkForm({ onSuccess, onError }: BookmarkFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      url: ''
    }
  });

  // 폼 제출 핸들러
  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    try {
      // URL 유효성 검사
      const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      if (!urlPattern.test(data.url)) {
        throw new Error('올바른 URL 형식을 입력해주세요.');
      }

      // URL이 http:// 또는 https://로 시작하지 않으면 https:// 추가
      let formattedUrl = data.url;
      if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
        formattedUrl = 'https://' + formattedUrl;
      }

      // 북마크 생성 데이터 (제목과 카테고리는 백엔드에서 자동 생성)
      const bookmarkData: BookmarkNoteCreate = {
        title: '새로운 지식', // 임시 제목, 백엔드에서 URL 메타데이터로 업데이트 예정
        url: formattedUrl,
        category: '미분류' // 기본 카테고리
      };

      // API 호출하여 북마크 생성
      const newBookmark = await apiClient.createBookmark(bookmarkData);
      
      // 성공 콜백 호출
      onSuccess?.(newBookmark);
      
      // 폼 리셋
      reset();
      
    } catch (error) {
      console.error('북마크 저장 오류:', error);
      const errorMessage = error instanceof Error ? error.message : '지식 추가 중 오류가 발생했습니다.';
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* URL 입력 필드 */}
        <div className="space-y-2">
          <label htmlFor="url" className="block text-sm font-medium text-slate-700">
            웹페이지 URL
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Link className="h-5 w-5 text-slate-400" />
            </div>
            <input
              {...register('url', {
                required: 'URL을 입력해주세요.',
                pattern: {
                  value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                  message: '올바른 URL 형식을 입력해주세요.'
                }
              })}
              type="url"
              id="url"
              placeholder="https://example.com 또는 example.com"
              className="block w-full pl-12 pr-4 py-4 text-base border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/80 transition-all duration-200 placeholder-slate-400"
              disabled={isLoading}
            />
          </div>
          {errors.url && (
            <p className="text-sm text-red-600 flex items-center mt-2">
              <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
              {errors.url.message}
            </p>
          )}
        </div>

        {/* 안내 메시지 */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <Sparkles className="h-5 w-5 text-indigo-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-indigo-700">
              <p className="font-medium mb-1">자동으로 정보를 수집합니다</p>
              <p className="text-indigo-600">
                URL을 입력하면 페이지의 제목, 설명, 카테고리를 자동으로 분석하여 저장합니다.
              </p>
            </div>
          </div>
        </div>

        {/* 제출 버튼 */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                처리 중...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 mr-3" />
                기록으로 추가
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 