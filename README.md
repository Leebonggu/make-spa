# Make SPA

## 요구사항

### 구현
- ES6 문법 사용
- 상태관리 library 사용 불가
- 사용 가능한 library
    - 정적 파일 제공을 위한 express 사용 가능
    - axios 및 HTTP 관련 library 사용 가능
    - CSS 전처리기 자율적으로 사용 가능하며, 이에 따라 필요한 library 사용 가능
    - 이미지 업로드는 아래에서 추가 설명
- 디자인
    - 기본적인 가이드라인은 지켜야 함 (단 색상, 폰트 등은 제약 없음)
    - 모바일 기준으로, 가로 넓이는 최대 640px
- 이미지 업로드는 URL 만 가능함
  - [unsplash](https://unsplash.com/documentation#get-a-random-photo)에서 제공하는 랜덤 이미지
  - 직접 구현 가능하지만, 업로드 이후 저장은 URL만 가능
  
### 코드버전관리
- Git
### 배포
- AWS, 네이버 Cloud...

### API

- 게시글 
  - [GET] - /posts
  - [GET] - /post/:postId
  - [POST] -/post
  - [PATCH] - /post/:postId 
  - [DELETE] - /post/:postId
- 댓글
  - [POST] - /comment/:postId
  - [DELETE] - /comment/:commentId


## TODO