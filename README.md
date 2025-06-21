# Category Note Frontend

YouTube와 지식 웹 페이지를 정리하는 프론트엔드 애플리케이션입니다. 2025년 최신 디자인 트렌드를 적용하여 현대적이고 직관적인 사용자 경험을 제공합니다.

## 📋 목차

- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [개발 규칙](#개발-규칙)
- [프로젝트 구조](#프로젝트-구조)
- [설치 및 실행](#설치-및-실행)
- [테스트](#테스트)
- [백엔드 연동](#백엔드-연동)
- [디자인 시스템](#디자인-시스템)
- [개발 가이드](#개발-가이드)
- [환경변수 설정](#환경변수-설정)
- [배포](#배포)

## 🚀 주요 기능

- ✅ **2025 트렌드 UI/UX**: Low light mode, Glassmorphism, Micro-interactions 적용
- ✅ **OAuth 소셜 로그인**: GitHub/Google 로그인 완전 연동
- ✅ **JWT 토큰 기반 인증**: 자동 토큰 관리 및 갱신
- ✅ **타입 안전한 API 통신**: TypeScript + 백엔드 API 완전 연동
- ✅ **현대적 상태 관리**: Zustand를 통한 전역 상태 관리
- ✅ **TDD 기반 개발**: 포괄적인 테스트 커버리지
- ✅ **반응형 디자인**: 모든 디바이스에서 최적화된 경험
- ✅ **접근성 준수**: ARIA 라벨 및 키보드 네비게이션 지원

## 🛠 기술 스택

### 프레임워크 & 언어
- **Next.js 15.1.6** - 메타 프레임워크 (최신 버전)
- **TypeScript 5.7.2** - 타입 안전성 (최신 버전)
- **React 19** - UI 라이브러리 (최신 버전)

### 스타일링 & UI
- **Tailwind CSS 3.4.17** - 유틸리티 퍼스트 CSS (최신 버전)
- **Radix UI** - 접근성 준수 UI 컴포넌트
- **Lucide React** - 아이콘 라이브러리
- **Framer Motion** - 애니메이션 라이브러리 (예정)

### 상태 관리 & 데이터 페칭
- **Zustand 5.0.2** - 경량 상태 관리 (최신 버전)
- **TanStack Query (React Query) v5** - 서버 상태 관리 (예정)
- **React Hook Form** - 폼 상태 관리 (예정)

### 테스트
- **Vitest 2.1.8** - 빠른 테스트 러너 (최신 버전)
- **@testing-library/react 16.1.0** - React 컴포넌트 테스트 (최신 버전)
- **@testing-library/jest-dom 6.6.3** - DOM 테스트 유틸리티 (최신 버전)
- **jsdom 26.0.0** - DOM 환경 시뮬레이션 (최신 버전)

### 개발 도구
- **pnpm** - 빠른 패키지 매니저
- **ESLint 9** - 코드 품질 관리 (최신 버전)
- **PostCSS** - CSS 후처리
- **Tailwind CSS IntelliSense** - 개발 도구

## 📏 **개발 규칙**

Category Note 프로젝트는 **직관적 명칭**과 **OOP 설계 원칙**을 기반으로 개발됩니다. 자세한 내용은 **[RULE.md](./RULE.md)**를 참조하세요.

### **핵심 원칙**

#### **1. 직관적 명칭 (Intuitive Naming)**
- ✅ **목적이 명확한 이름**: `createNewBookmarkNote()` vs `create()`
- ✅ **동사 + 명사 조합**: `fetchUserBookmarkList()`, `validateEmailAddress()`
- ✅ **축약어 금지**: `BookmarkApiClient` vs `ApiClient`
- ✅ **한국어 주석**: `// 북마크 목록을 조회합니다`

#### **2. OOP 설계 원칙**
- ✅ **단일 책임 원칙**: 하나의 클래스는 하나의 책임
- ✅ **의존성 주입**: 추상화에 의존, 구체화에 의존하지 않음
- ✅ **인터페이스 분리**: API 클라이언트와 상태 관리 분리
- ✅ **확장 가능한 설계**: 컴포넌트와 훅 기반 구조

### **예시 코드 스타일**

#### **API 클라이언트 (TypeScript)**
```typescript
class BookmarkApiClient {
    /**
     * 북마크 관련 API 통신을 담당하는 클라이언트
     */
    public async createNewBookmarkNote(bookmarkData: BookmarkCreateRequest): Promise<BookmarkNote> {
        // API 호출 로직
    }
    
    public async fetchUserBookmarkList(userId: number): Promise<BookmarkNote[]> {
        // API 호출 로직
    }
}
```

#### **상태 관리 (Zustand)**
```typescript
interface BookmarkStoreState {
  bookmarkList: BookmarkNote[]
  currentBookmark: BookmarkNote | null
  isLoadingBookmarks: boolean
  bookmarkCreationError: string | null
}

interface BookmarkStoreActions {
  createNewBookmark: (data: BookmarkCreateData) => Promise<void>
  fetchUserBookmarks: (userId: number) => Promise<void>
  updateBookmarkContent: (id: number, content: string) => Promise<void>
  deleteBookmarkNote: (id: number) => Promise<void>
}
```

#### **컴포넌트 설계 (React)**
```typescript
interface BookmarkFormComponentProps {
  onBookmarkCreate: (bookmark: BookmarkNote) => void
  initialData?: BookmarkNote
}

function BookmarkFormComponent({ onBookmarkCreate, initialData }: BookmarkFormComponentProps) {
    /**
     * 북마크 생성/수정 폼 컴포넌트
     */
    const handleFormSubmission = async (formData: BookmarkFormData): Promise<void> => {
        // 폼 제출 처리 로직
    }
    
    const validateBookmarkData = (data: BookmarkFormData): ValidationResult => {
        // 폼 데이터 검증 로직
    }
    
    return (
        // JSX 반환
    )
}
```

### **체크리스트**
- [ ] **컴포넌트명**이 역할을 명확히 표현하는가?
- [ ] **함수명**이 수행하는 액션을 정확히 설명하는가?
- [ ] **변수명**이 저장하는 데이터의 의미를 명확히 전달하는가?
- [ ] **한국어 주석**으로 의도를 명확히 설명했는가?
- [ ] **OOP 원칙**을 준수하여 확장 가능한 구조로 설계했는가?

> **📖 자세한 규칙**: [RULE.md](./RULE.md)에서 전체 개발 가이드라인을 확인하세요.

## 📁 프로젝트 구조

```
category-note-frontend/
├── src/                              # 소스 코드
│   ├── app/                         # Next.js App Router
│   │   ├── auth/                    # 인증 관련 페이지
│   │   │   ├── login/              # 로그인 페이지
│   │   │   │   └── page.tsx        # 로그인 페이지 컴포넌트
│   │   │   └── success/            # OAuth 성공 콜백 페이지
│   │   │       └── page.tsx        # 콜백 처리 컴포넌트
│   │   ├── globals.css             # 전역 스타일
│   │   ├── layout.tsx              # 루트 레이아웃
│   │   └── page.tsx                # 홈 페이지
│   ├── components/                  # 재사용 가능한 컴포넌트
│   │   ├── auth/                   # 인증 관련 컴포넌트
│   │   │   ├── LoginPage.tsx       # 로그인 페이지 컴포넌트
│   │   │   └── LoginPage.test.tsx  # 로그인 페이지 테스트
│   │   └── ui/                     # UI 컴포넌트 (Radix UI 기반)
│   ├── lib/                        # 유틸리티 및 설정
│   │   ├── api.ts                  # API 클라이언트
│   │   ├── api.test.ts             # API 클라이언트 테스트
│   │   └── utils.ts                # 공통 유틸리티
│   ├── stores/                     # Zustand 스토어
│   │   ├── auth.ts                 # 인증 상태 관리
│   │   └── auth.test.ts            # 인증 스토어 테스트
│   ├── test/                       # 테스트 설정
│   │   └── setup.ts                # 테스트 환경 설정
│   └── types/                      # TypeScript 타입 정의
│       └── index.ts                # 공통 타입 정의
├── public/                          # 정적 파일
├── .eslintrc.json                   # ESLint 설정
├── next.config.ts                   # Next.js 설정
├── package.json                     # 패키지 정보
├── pnpm-lock.yaml                   # pnpm 잠금 파일
├── postcss.config.mjs               # PostCSS 설정
├── tailwind.config.ts               # Tailwind CSS 설정
├── tsconfig.json                    # TypeScript 설정
├── vitest.config.ts                 # Vitest 테스트 설정
└── README.md                        # 프로젝트 문서
```

## 🔧 설치 및 실행

### 1. 저장소 클론

```bash
git clone <repository-url>
cd category-note-frontend
```

### 2. 패키지 매니저 설치

```bash
# pnpm 설치 (권장)
npm install -g pnpm

# 또는 corepack 사용 (Node.js 16.10+)
corepack enable
corepack prepare pnpm@latest --activate
```

### 3. 의존성 설치

```bash
# pnpm 사용 (권장)
pnpm install

# 또는 npm 사용
npm install

# 또는 yarn 사용
yarn install
```

### 4. 백엔드 서버 실행

프론트엔드를 실행하기 전에 백엔드 서버가 실행되어 있어야 합니다:

```bash
# 백엔드 디렉토리로 이동
cd ../category-note-backend

# 백엔드 서버 실행 (포트 8000)
uv run python run.py
```

### 5. 개발 서버 실행

```bash
# 개발 서버 실행 (포트 3000)
pnpm dev

# 또는
npm run dev
# yarn dev
```

서버가 성공적으로 실행되면 다음 주소에서 접근할 수 있습니다:
- **프론트엔드**: http://localhost:3000
- **로그인 페이지**: http://localhost:3000/auth/login

## 🧪 테스트

이 프로젝트는 TDD(Test-Driven Development) 방식으로 개발되어 포괄적인 테스트를 제공합니다.

### 전체 테스트 실행

```bash
# 모든 테스트 실행
pnpm test

# 감시 모드로 테스트 실행
pnpm test:watch

# 커버리지와 함께 테스트 실행
pnpm test:coverage

# UI 모드로 테스트 실행
pnpm test:ui
```

### 개별 테스트 실행

```bash
# API 클라이언트 테스트
pnpm test src/lib/api.test.ts

# 인증 스토어 테스트
pnpm test src/stores/auth.test.ts

# 로그인 페이지 컴포넌트 테스트
pnpm test src/components/auth/LoginPage.test.tsx
```

### 테스트 카테고리

#### 1. API 클라이언트 테스트 (`src/lib/api.test.ts`)
- ✅ OAuth 로그인 초기화
- ✅ 사용자 정보 조회
- ✅ 로그아웃 처리
- ✅ 에러 처리 및 토큰 관리

#### 2. 인증 스토어 테스트 (`src/stores/auth.test.ts`)
- ✅ 초기 상태 설정
- ✅ 로그인 상태 관리
- ✅ 사용자 정보 저장
- ✅ 로그아웃 처리
- ✅ 토큰 관리

#### 3. 로그인 페이지 테스트 (`src/components/auth/LoginPage.test.tsx`)
- ✅ 컴포넌트 렌더링
- ✅ GitHub/Google 로그인 버튼
- ✅ 2025 트렌드 UI 요소
- ✅ 접근성 준수
- ✅ 에러 상태 처리

### 테스트 결과 예시

```
✓ src/lib/api.test.ts (4)
✓ src/stores/auth.test.ts (5)
✓ src/components/auth/LoginPage.test.tsx (6)

Test Files  3 passed (3)
Tests  15 passed (15)
Start at 10:30:00
Duration  1.23s
```

## 🔗 백엔드 연동

### API 엔드포인트 연동

프론트엔드는 다음 백엔드 API와 연동됩니다:

| 기능 | 메서드 | 엔드포인트 | 구현 상태 |
|------|--------|------------|-----------|
| OAuth 로그인 | `GET` | `/auth/login/{provider}` | ✅ |
| OAuth 콜백 | `GET` | `/auth/callback/{provider}` | ✅ |
| 사용자 정보 | `GET` | `/auth/me` | ✅ |
| 로그아웃 | `POST` | `/auth/logout` | ✅ |
| 북마크 생성 | `POST` | `/api/bookmark/` | 🔄 |
| 북마크 목록 | `GET` | `/api/bookmark/` | 🔄 |

### 인증 플로우

1. **로그인 시작**: 사용자가 GitHub/Google 로그인 버튼 클릭
2. **OAuth 리다이렉트**: 백엔드의 OAuth 엔드포인트로 리다이렉트
3. **콜백 처리**: OAuth 제공자에서 콜백 URL로 리다이렉트
4. **토큰 저장**: JWT 토큰을 로컬스토리지에 저장
5. **사용자 정보 조회**: 토큰을 사용하여 사용자 정보 조회
6. **상태 업데이트**: Zustand 스토어에 인증 상태 저장

### API 클라이언트 사용법

```typescript
import { apiClient } from '@/lib/api';

// OAuth 로그인 시작
await apiClient.initiateOAuth('github');

// 현재 사용자 정보 조회
const user = await apiClient.getCurrentUser();

// 로그아웃
await apiClient.logout();
```

## 🎨 디자인 시스템

### 2025 디자인 트렌드 적용

#### 1. Low Light Mode
- 다크모드의 진화된 형태
- 낮은 대비와 차분한 미학
- 눈의 피로를 줄이는 색상 팔레트

#### 2. Glassmorphism
- 반투명 유리 효과
- 배경 블러 처리
- 미묘한 그라데이션 보더

#### 3. Micro-interactions
- 의미 있는 작은 애니메이션
- 호버 효과 및 전환 애니메이션
- 사용자 피드백 향상

#### 4. 전략적 컬러 포인트
- 미니멀한 베이스 색상
- 중요한 요소에만 컬러 적용
- 브랜드 색상의 일관된 사용

### 색상 팔레트

```css
/* 기본 색상 */
--background: 0 0% 3.9%;
--foreground: 0 0% 98%;

/* 강조 색상 */
--primary: 346.8 77.2% 49.8%;
--primary-foreground: 355.7 100% 97.3%;

/* 보조 색상 */
--secondary: 240 3.7% 15.9%;
--secondary-foreground: 0 0% 98%;

/* 유리 효과 */
--glass-bg: rgba(255, 255, 255, 0.05);
--glass-border: rgba(255, 255, 255, 0.1);
```

### 컴포넌트 스타일링

```typescript
// Glassmorphism 버튼 예시
const GlassButton = () => (
  <button className="
    relative overflow-hidden
    bg-white/5 backdrop-blur-md
    border border-white/10
    rounded-xl px-6 py-3
    text-white font-medium
    transition-all duration-300
    hover:bg-white/10 hover:scale-105
    focus:outline-none focus:ring-2 focus:ring-pink-500/50
  ">
    GitHub로 로그인
  </button>
);
```

## 💻 개발 가이드

### 코딩 스타일

- **TypeScript 우선**: 모든 컴포넌트와 유틸리티에 타입 정의
- **함수형 컴포넌트**: React Hooks 사용
- **Tailwind CSS**: 유틸리티 클래스 우선 사용
- **컴포넌트 분리**: 재사용 가능한 작은 컴포넌트로 분리

### 폴더 구조 규칙

```
src/
├── app/          # Next.js App Router 페이지
├── components/   # 재사용 가능한 컴포넌트
│   ├── ui/      # 기본 UI 컴포넌트
│   └── [domain]/ # 도메인별 컴포넌트
├── lib/         # 유틸리티 및 설정
├── stores/      # 상태 관리 (Zustand)
├── types/       # TypeScript 타입 정의
└── test/        # 테스트 설정 및 유틸리티
```

### 새 컴포넌트 추가 시 절차

1. **테스트 작성** (TDD)
   ```bash
   # 테스트 파일 생성
   touch src/components/[domain]/NewComponent.test.tsx
   ```

2. **컴포넌트 구현**
   ```typescript
   // src/components/[domain]/NewComponent.tsx
   interface NewComponentProps {
     // props 타입 정의
   }
   
   export const NewComponent = ({ }: NewComponentProps) => {
     return (
       <div className="...">
         {/* 컴포넌트 내용 */}
       </div>
     );
   };
   ```

3. **스토리북 추가** (예정)
   ```typescript
   // src/components/[domain]/NewComponent.stories.tsx
   ```

### Git 워크플로우

```bash
# 새 기능 브랜치 생성
git checkout -b feature/new-component

# 변경사항 커밋
git add .
git commit -m "feat: add new component with tests"

# 테스트 실행
pnpm test

# 브랜치 푸시
git push origin feature/new-component
```

## 🌍 환경변수 설정

### 개발 환경

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 환경변수를 설정하세요:

```env
# 백엔드 API URL
NEXT_PUBLIC_API_URL=http://localhost:8000

# OAuth 리다이렉트 URL (선택사항)
NEXT_PUBLIC_OAUTH_REDIRECT_URL=http://localhost:3000/auth/success

# 개발 모드 플래그
NODE_ENV=development
```

### 프로덕션 환경

```env
# 프로덕션 백엔드 API URL
NEXT_PUBLIC_API_URL=https://api.categorynote.com

# 프로덕션 OAuth 리다이렉트 URL
NEXT_PUBLIC_OAUTH_REDIRECT_URL=https://categorynote.com/auth/success

# 프로덕션 모드
NODE_ENV=production
```

### 환경변수 사용법

```typescript
// API 클라이언트에서 사용
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// OAuth 리다이렉트 URL
const OAUTH_REDIRECT_URL = process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URL || 'http://localhost:3000/auth/success';
```

## 🚀 배포

### Vercel 배포 (권장)

1. **Vercel 계정 연결**
   ```bash
   npm install -g vercel
   vercel login
   ```

2. **프로젝트 배포**
   ```bash
   vercel --prod
   ```

3. **환경변수 설정**
   - Vercel 대시보드에서 환경변수 설정
   - `NEXT_PUBLIC_API_URL` 등 필수 변수 추가

### 기타 플랫폼 배포

#### Netlify
```bash
# 빌드 명령어
pnpm build

# 출력 디렉토리
.next
```

#### Docker
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

## 🔧 문제 해결

### 일반적인 문제들

#### 1. 백엔드 연결 오류

**문제**: API 호출 시 CORS 오류 또는 연결 실패

**해결책**:
```bash
# 백엔드 서버 상태 확인
curl http://localhost:8000/health

# 백엔드 서버 재시작
cd ../category-note-backend
uv run python run.py
```

#### 2. OAuth 로그인 실패

**문제**: GitHub/Google 로그인 시 리다이렉트 오류

**해결책**:
- 백엔드 OAuth 설정 확인
- 콜백 URL 설정 확인
- 브라우저 개발자 도구에서 네트워크 탭 확인

#### 3. 테스트 실행 오류

**문제**: Vitest 테스트가 실행되지 않음

**해결책**:
```bash
# 의존성 재설치
rm -rf node_modules pnpm-lock.yaml
pnpm install

# 테스트 환경 확인
pnpm test --reporter=verbose
```

#### 4. 스타일링 문제

**문제**: Tailwind CSS 클래스가 적용되지 않음

**해결책**:
```bash
# Tailwind CSS 재빌드
pnpm dev

# 캐시 클리어
rm -rf .next
pnpm dev
```

### 개발 도구

#### VS Code 확장 추천

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "vitest.explorer"
  ]
}
```

#### 디버깅

```typescript
// React DevTools 사용
// Zustand DevTools 연동
const useAuthStore = create<AuthState>()(
  devtools(
    (set, get) => ({
      // 스토어 구현
    }),
    { name: 'auth-store' }
  )
);
```

## 📚 추가 리소스

### 공식 문서
- [Next.js 문서](https://nextjs.org/docs)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [Zustand 문서](https://zustand-demo.pmnd.rs/)
- [Vitest 문서](https://vitest.dev/)

### 디자인 참고 자료
- [2025 UI 트렌드](https://uxdesign.cc/ui-ux-design-trends-2025)
- [Glassmorphism 가이드](https://uxdesign.cc/glassmorphism-in-user-interfaces)
- [Low Light Design](https://www.designsystems.com/low-light-design)

### 관련 프로젝트
- [Radix UI 컴포넌트](https://www.radix-ui.com/)
- [Tailwind UI](https://tailwindui.com/)
- [shadcn/ui](https://ui.shadcn.com/)

## 🤝 기여하기

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Write tests for your changes
4. Implement your changes
5. Ensure all tests pass (`pnpm test`)
6. Submit a pull request

### 기여 가이드라인

- TDD 방식으로 개발
- TypeScript 타입 정의 필수
- 접근성 준수
- 2025 디자인 트렌드 반영
- 테스트 커버리지 유지

---

**개발자**: Category Note Team  
**백엔드 연동**: [category-note-backend](../category-note-backend/README.md)  
**라이센스**: MIT
