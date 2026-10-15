# Yun Lab Homepage

연구실 홈페이지 (React + TypeScript + Vite, GitHub Pages).

**Pages URL:** https://koryun8406.github.io/korea_university_test/

## 내용
- **Research**: Organ on a chip / Hematologic malignancy / Clinical chemistry / Therapeutic drug monitoring (연구실 제공)
- **Members**: Seung Gyu Yun M.D, Ph.D / Jiyeon Kang / Jiyoon Song (연구실 제공)
- **Publications**: PubMed 저자 검색(`Yun SG[Author] AND Korea University[Affiliation]`) 32건, 연도별 정렬·검색, DOI/PubMed 링크
- 링크: [Google Scholar](https://scholar.google.com/citations?user=t13fBnoAAAAJ&hl=ko), [Korea University Pure](https://pure.korea.ac.kr/en/persons/seung-gyu-yun/)

## TODO / 확인 필요 (화면에는 노란색 `TODO`로 표시)
- 연구실 공식 명칭 (`Yun Lab`은 임시), 소개 문구, 한 줄 소개
- 연구분야 4개의 설명
- 구성원 직위/역할 (PI 외 2명), 사진
- 연락처 (이메일·주소·전화)
- **논문 목록**: Google Scholar·Pure 페이지는 개발 환경에서 접속이 차단되어 열람하지 못했고, PubMed 검색 결과로 대체했습니다.
  PubMed에 없는 학회 초록 등은 빠져 있고, 동명이인 혼입 여부는 사람이 확인해야 합니다. TODO(verify)
- 소속 문구는 PubMed 소속 표기에서 가져왔습니다. TODO(verify)

## 콘텐츠 수정
- 사이트 문구: `src/data/site.ts`
- 논문: `src/data/publications.json`

## 개발
```
npm ci
npm test
npm run dev
npm run build
```
`main` 푸시 시 GitHub Actions가 테스트·빌드 후 Pages에 배포합니다 (Settings → Pages → Source: GitHub Actions).

논문 정보 출처: PubMed (https://pubmed.ncbi.nlm.nih.gov/)
