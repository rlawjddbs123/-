// Goshelin Restaurant Database
// Contains curated restaurants around Korea University campus

const DEFAULT_RESTAURANTS = [
  {
    id: 1,
    name: "어머니밥상",
    category: "Korean",
    categoryKo: "한식",
    mainMenu: "제육볶음 정식",
    priceCategory: "mid", // Under 7k = low, 7k~10k = mid, 10k+ = high
    priceCategoryKo: "7,000원 ~ 10,000원 (실속)",
    avgPrice: 8500,
    prepTime: "10분 이내",
    prepTimeMinutes: 10,
    description: "엄마 손맛이 그리울 때 가는 따뜻한 정후 집밥 식당.",
    walkingTimes: {
      "안암역": 4,
      "정후": 2,
      "민광": 3,
      "법후": 8,
      "노벨광장": 7
    },
    suitability: ["solo", "friends"], // solo, friends, group
    suitabilityKo: ["혼밥", "2~4인 동행"],
    ratings: {
      taste: 4.6,
      value: 4.7,
      hygiene: 4.1,
      overall: 4.5
    },
    mapCoords: { x: 52, y: 35 }, // Percentages on custom campus canvas map
    naverMapLink: "https://map.naver.com/v5/search/%EC%95%88%EC%95%94%EB%8F%99%20%EC%96%B4%EB%A8%B8%EB%8B%8B%EB%B0%A5%EC%83%81",
    kakaoMapLink: "https://map.kakao.com/?q=%EC%95%88%EC%95%94%EB%8F%99%20%EC%96%B4%EB%A8%B8%EB%8B%8B%EB%B0%A5%EC%83%81",
    oneLiner: "정후에서 제육볶음이 당길 때 무조건 가는 곳! 반찬도 이모님이 듬뿍 주십니다.",
    reviews: [
      { author: "정경대 K씨", rating: 5, taste: 5, value: 5, hygiene: 4, comment: "12시 45분 수업 끝나고 정후로 뛰어가서 제육 시키면 진짜 5분만에 나옵니다! 1시 30분 우당관 수업 가기 전에 든든하게 먹을 수 있어 제 최애 맛집이에요.", date: "2026-06-12" },
      { author: "경영학과 호랑이", rating: 4, taste: 4, value: 4, hygiene: 4, comment: "찌개류도 맛있고 반찬 가짓수가 많아서 집밥 생각날 때마다 갑니다.", date: "2026-06-05" }
    ]
  },
  {
    id: 2,
    name: "고른햇살",
    category: "Korean",
    categoryKo: "한식",
    mainMenu: "참치김밥, 라볶이",
    priceCategory: "low",
    priceCategoryKo: "7,000원 이하 (초가성비)",
    avgPrice: 4500,
    prepTime: "5분 이내",
    prepTimeMinutes: 5,
    description: "참치 캔 하나를 다 때려 박은 듯한 어마어마한 참치김밥의 성지.",
    walkingTimes: {
      "안암역": 2,
      "정후": 7,
      "민광": 8,
      "법후": 12,
      "노벨광장": 4
    },
    suitability: ["solo", "friends"],
    suitabilityKo: ["혼밥", "2~4인 동행"],
    ratings: {
      taste: 4.7,
      value: 4.9,
      hygiene: 4.2,
      overall: 4.6
    },
    mapCoords: { x: 30, y: 70 },
    naverMapLink: "https://map.naver.com/v5/search/%EC%95%88%EC%95%94%EB%8F%99%20%EA%B3%A0%EB%A5%B8%ED%96%87%EC%82%B4",
    kakaoMapLink: "https://map.kakao.com/?q=%EC%95%88%EC%95%94%EB%8F%99%20%EA%B3%A0%EB%A5%B8%ED%96%87%EC%82%B4",
    oneLiner: "참치김밥 크기가 뚝배기만 합니다. 고대 안암 가성비의 신.",
    reviews: [
      { author: "이공대 밥돌이", rating: 5, taste: 5, value: 5, hygiene: 4, comment: "여기 참치김밥은 전국 최고입니다. 라볶이랑 조합이 미쳤어요.", date: "2026-06-15" },
      { author: "보과대 요정", rating: 4, taste: 4, value: 5, hygiene: 4, comment: "양이 진짜 많아서 혼자서 김밥 한 줄 다 먹기 벅찰 정도예요. 가성비 최고!", date: "2026-06-11" }
    ]
  },
  {
    id: 3,
    name: "영철버거",
    category: "FastFood",
    categoryKo: "패스트푸드",
    mainMenu: "스트리트 버거",
    priceCategory: "low",
    priceCategoryKo: "7,000원 이하 (초가성비)",
    avgPrice: 5000,
    prepTime: "5분 이내",
    prepTimeMinutes: 5,
    description: "고려대학교 학생들과 오랜 역사를 함께한 전설적인 가성비 수제 버거.",
    walkingTimes: {
      "안암역": 3,
      "정후": 5,
      "민광": 6,
      "법후": 10,
      "노벨광장": 8
    },
    suitability: ["solo", "friends"],
    suitabilityKo: ["혼밥", "2~4인 동행"],
    ratings: {
      taste: 4.2,
      value: 4.8,
      hygiene: 4.0,
      overall: 4.3
    },
    mapCoords: { x: 38, y: 55 },
    naverMapLink: "https://map.naver.com/v5/search/%EC%95%88%EC%95%94%EB%8F%99%20%EC%98%81%EC%B2%A0%EB%B2%84%EA%B1%B0",
    kakaoMapLink: "https://map.kakao.com/?q=%EC%95%88%EC%95%94%EB%8F%99%20%EC%98%81%EC%B2%A0%EB%B2%84%EA%B1%B0",
    oneLiner: "안암의 든든한 동반자 영철버거, 이 가격에 이런 감동이.",
    reviews: [
      { author: "역사학과 학회장", rating: 5, taste: 4, value: 5, hygiene: 4, comment: "고대 역사와 함께한 버거. 학생들 주머니 사정 생각해주시는 사장님 최고.", date: "2026-06-09" }
    ]
  },
  {
    id: 4,
    name: "용초수",
    category: "Chinese",
    categoryKo: "중식",
    mainMenu: "꿔바로우, 호남볶음밥",
    priceCategory: "mid",
    priceCategoryKo: "7,000원 ~ 10,000원 (실속)",
    avgPrice: 9000,
    prepTime: "15분 이내",
    prepTimeMinutes: 12,
    description: "중국 본토의 맛을 느낄 수 있는 정경대 후문 최고의 중식당.",
    walkingTimes: {
      "안암역": 5,
      "정후": 1,
      "민광": 2,
      "법후": 7,
      "노벨광장": 6
    },
    suitability: ["friends", "group"],
    suitabilityKo: ["2~4인 동행", "단체 회식"],
    ratings: {
      taste: 4.7,
      value: 4.4,
      hygiene: 4.0,
      overall: 4.4
    },
    mapCoords: { x: 53, y: 30 },
    naverMapLink: "https://map.naver.com/v5/search/%EC%95%88%EC%95%94%EB%8F%99%20%EC%9A%A9%EC%B4%88%EC%88%98",
    kakaoMapLink: "https://map.kakao.com/?q=%EC%95%88%EC%95%94%EB%8F%99%20%EC%9A%A9%EC%B4%88%EC%88%98",
    oneLiner: "꿔바로우가 입안에서 춤을 춥니다. 정후 대표 중식 맛집.",
    reviews: [
      { author: "미디어학부 졸생", rating: 5, taste: 5, value: 4, hygiene: 4, comment: "여긴 무조건 꿔바로우랑 호남볶음밥 세트로 시켜야 함. 진짜 쫀득하고 매콤한 게 최고.", date: "2026-06-16" }
    ]
  },
  {
    id: 5,
    name: "쿠이도락",
    category: "Japanese",
    categoryKo: "일식",
    mainMenu: "돈코츠라멘, 덮밥",
    priceCategory: "mid",
    priceCategoryKo: "7,000원 ~ 10,000원 (실속)",
    avgPrice: 8500,
    prepTime: "10분 이내",
    prepTimeMinutes: 8,
    description: "라멘을 시키면 밥이 무한정 제공되는 이공계생들의 소울푸드 식당.",
    walkingTimes: {
      "안암역": 4,
      "정후": 5,
      "민광": 6,
      "법후": 10,
      "노벨광장": 3
    },
    suitability: ["solo", "friends"],
    suitabilityKo: ["혼밥", "2~4인 동행"],
    ratings: {
      taste: 4.4,
      value: 4.6,
      hygiene: 4.2,
      overall: 4.4
    },
    mapCoords: { x: 74, y: 55 },
    naverMapLink: "https://map.naver.com/v5/search/%EC%95%88%EC%95%94%EB%8F%99%20%EC%BF%A0%EC%9D%B4%EB%8F%84%EB%9D%BD",
    kakaoMapLink: "https://map.kakao.com/?q=%EC%95%88%EC%95%94%EB%8F%99%20%EC%BF%A0%EC%9D%B4%EB%8F%84%EB%9D%BD",
    oneLiner: "이공대 노벨광장 3분 컷. 밥 추가 무료로 배터지게 먹는 일식 돈부리.",
    reviews: [
      { author: "컴공 18학번", rating: 5, taste: 4, value: 5, hygiene: 5, comment: "노벨광장에서 가장 가까운 맛집 중 하나. 돈코츠 국물이 정말 깊어요.", date: "2026-06-14" }
    ]
  },
  {
    id: 6,
    name: "언덕위의 돈까스",
    category: "Western",
    categoryKo: "양식",
    mainMenu: "수제 등심돈까스",
    priceCategory: "mid",
    priceCategoryKo: "7,000원 ~ 10,000원 (실속)",
    avgPrice: 9000,
    prepTime: "10분 이내",
    prepTimeMinutes: 10,
    description: "법대 후문 골목 언덕에 자리한 숨은 경양식 돈까스 강자.",
    walkingTimes: {
      "안암역": 11,
      "정후": 8,
      "민광": 7,
      "법후": 1,
      "노벨광장": 10
    },
    suitability: ["solo", "friends"],
    suitabilityKo: ["혼밥", "2~4인 동행"],
    ratings: {
      taste: 4.3,
      value: 4.5,
      hygiene: 4.1,
      overall: 4.3
    },
    mapCoords: { x: 80, y: 15 },
    naverMapLink: "https://map.naver.com/v5/search/%EC%95%88%EC%95%94%EB%8F%99%20%EC%96%B8%EB%8D%95%EC%9C%84%EC%9D%98%20%EB%8F%9B%E3%85%8B%EC%8A%A4",
    kakaoMapLink: "https://map.kakao.com/?q=%EC%95%88%EC%95%94%EB%8F%99%20%EC%96%B8%EB%8D%95%EC%9C%84%EC%9D%98%20%EB%8F%9B%E3%85%8B%EC%8A%A4",
    oneLiner: "법후생들의 구원자, 바삭한 수제 튀김옷과 비법 달콤 소스.",
    reviews: [
      { author: "로스쿨생 A", rating: 4, taste: 4, value: 5, hygiene: 4, comment: "법후 언덕 올라가다 지칠 때 여기 돈까스 한 입이면 에너지가 충전됩니다.", date: "2026-06-11" }
    ]
  },
  {
    id: 7,
    name: "무르무르 드 구스토",
    category: "Western",
    categoryKo: "양식",
    mainMenu: "마르게리따 피자, 크림 파스타",
    priceCategory: "high",
    priceCategoryKo: "10,000원 이상",
    avgPrice: 16000,
    prepTime: "15분 이내",
    prepTimeMinutes: 15,
    description: "안암에서 분위기 내고 싶을 때 찾는 대표 이탈리안 레스토랑.",
    walkingTimes: {
      "안암역": 1,
      "정후": 7,
      "민광": 6,
      "법후": 12,
      "노벨광장": 5
    },
    suitability: ["friends", "group"],
    suitabilityKo: ["2~4인 동행", "단체 회식"],
    ratings: {
      taste: 4.6,
      value: 3.8,
      hygiene: 4.8,
      overall: 4.4
    },
    mapCoords: { x: 25, y: 65 },
    naverMapLink: "https://map.naver.com/v5/search/%EC%95%88%EC%95%94%EB%8F%99%20%EB%AC%B4%EB%A5%B4%EB%AC%B4%EB%A5%B4%20%EB%93%9C%20%EA%B5%AC%EC%8A%A4%ED%86%A0",
    kakaoMapLink: "https://map.kakao.com/?q=%EC%95%88%EC%95%94%EB%8F%99%20%EB%AC%B4%EB%A5%B4%EB%AC%B4%EB%A5%B4%20%EB%93%9C%20%EA%B5%AC%EC%8A%A4%ED%86%A0",
    oneLiner: "안암 소개팅 및 동아리 종강 모임 부동의 1위 양식당.",
    reviews: [
      { author: "심리학과 21학번", rating: 5, taste: 5, value: 3, hygiene: 5, comment: "조금 비싸지만 샐러드랑 파스타 퀄리티가 정말 좋고 분위기가 미쳤어요.", date: "2026-06-02" }
    ]
  },
  {
    id: 8,
    name: "오샬",
    category: "Asian",
    categoryKo: "아시안",
    mainMenu: "인도 커리 세트",
    priceCategory: "high",
    priceCategoryKo: "10,000원 이상",
    avgPrice: 14000,
    prepTime: "15분 이내",
    prepTimeMinutes: 12,
    description: "난과 밥이 무한 리필되는 인도 전통 커리 맛집.",
    walkingTimes: {
      "안암역": 3,
      "정후": 6,
      "민광": 5,
      "법후": 11,
      "노벨광장": 4
    },
    suitability: ["friends", "group"],
    suitabilityKo: ["2~4인 동행", "단체 회식"],
    ratings: {
      taste: 4.7,
      value: 4.5,
      hygiene: 4.5,
      overall: 4.6
    },
    mapCoords: { x: 32, y: 62 },
    naverMapLink: "https://map.naver.com/v5/search/%EC%95%88%EC%95%94%EB%8F%99%20%EC%98%A4%EC%85%9C",
    kakaoMapLink: "https://map.kakao.com/?q=%EC%95%88%EC%95%94%EB%8F%99%20%EC%98%A4%EC%85%9C",
    oneLiner: "인도 현지 셰프가 선사하는 고품격 탄두리와 난 무한제공 커리.",
    reviews: [
      { author: "정치외교 졸생", rating: 5, taste: 5, value: 5, hygiene: 4, comment: "갈릭난 진짜 맛있음. 커리 1인 1메뉴 하면 밥이랑 커리 기본형 리필해줘서 대식가 추천.", date: "2026-06-13" }
    ]
  },
  {
    id: 9,
    name: "형제닭갈비",
    category: "Korean",
    categoryKo: "한식",
    mainMenu: "치즈 닭갈비",
    priceCategory: "high",
    priceCategoryKo: "10,000원 이상",
    avgPrice: 11000,
    prepTime: "15분 이내",
    prepTimeMinutes: 14,
    description: "철판에 구워먹는 고소한 치즈 범벅 매콤 닭갈비.",
    walkingTimes: {
      "안암역": 3,
      "정후": 6,
      "민광": 7,
      "법후": 11,
      "노벨광장": 5
    },
    suitability: ["friends", "group"],
    suitabilityKo: ["2~4인 동행", "단체 회식"],
    ratings: {
      taste: 4.5,
      value: 4.2,
      hygiene: 4.1,
      overall: 4.3
    },
    mapCoords: { x: 35, y: 68 },
    naverMapLink: "https://map.naver.com/v5/search/%EC%95%88%EC%95%94%EB%8F%99%20%ED%98%95%EC%A0%9C%EB%8B%AD%EA%B0%88%E3%85%82",
    kakaoMapLink: "https://map.kakao.com/?q=%EC%95%88%EC%95%94%EB%8F%99%20%ED%98%95%EC%A0%9C%EB%8B%AD%EA%B0%88%E3%85%82",
    oneLiner: "참살이길 한가운데, 볶음밥 마무리까지 필수인 닭갈비 명소.",
    reviews: [
      { author: "체육교육과", rating: 4, taste: 5, value: 4, hygiene: 4, comment: "치즈사리 듬뿍 얹어 먹는 철판 닭갈비는 춘천 갈 필요가 없는 맛입니다.", date: "2026-05-28" }
    ]
  },
  {
    id: 10,
    name: "커피수공업",
    category: "Cafe",
    categoryKo: "카페/디저트",
    mainMenu: "바닐라빈 라떼, 수제 쿠키",
    priceCategory: "low",
    priceCategoryKo: "7,000원 이하 (초가성비)",
    avgPrice: 4000,
    prepTime: "5분 이내",
    prepTimeMinutes: 3,
    description: "직접 로스팅하고 끓인 바닐라빈 시럽으로 이름난 커피 전문점.",
    walkingTimes: {
      "안암역": 3,
      "정후": 4,
      "민광": 5,
      "법후": 8,
      "노벨광장": 5
    },
    suitability: ["solo", "friends"],
    suitabilityKo: ["혼밥", "2~4인 동행"],
    ratings: {
      taste: 4.6,
      value: 4.5,
      hygiene: 4.7,
      overall: 4.6
    },
    mapCoords: { x: 45, y: 45 },
    naverMapLink: "https://map.naver.com/v5/search/%EC%95%88%EC%95%94%EB%8F%99%20%EC%BB%A4%ED%94%BC%EC%88%98%EA%B3%B5%EC%97%85",
    kakaoMapLink: "https://map.kakao.com/?q=%EC%95%88%EC%95%94%EB%8F%99%20%EC%BB%A4%ED%94%BC%EC%88%98%EA%B3%B5%EC%97%85",
    oneLiner: "참살이길 골목길의 보물 같은 커피 향 가득한 아지트.",
    reviews: [
      { author: "영문과 대학원생", rating: 5, taste: 5, value: 4, hygiene: 5, comment: "여기 아인슈페너와 아포가토는 안암 원탑입니다. 정말 강추해요.", date: "2026-06-10" }
    ]
  },
  {
    id: 11,
    name: "스시토로",
    category: "Japanese",
    categoryKo: "일식",
    mainMenu: "토로초밥 세트",
    priceCategory: "high",
    priceCategoryKo: "10,000원 이상",
    avgPrice: 15000,
    prepTime: "15분 이내",
    prepTimeMinutes: 11,
    description: "이공대 골목에 숨겨진 신선하고 쫄깃한 식감의 스시 강자.",
    walkingTimes: {
      "안암역": 2,
      "정후": 6,
      "민광": 7,
      "법후": 11,
      "노벨광장": 3
    },
    suitability: ["solo", "friends"],
    suitabilityKo: ["혼밥", "2~4인 동행"],
    ratings: {
      taste: 4.6,
      value: 4.1,
      hygiene: 4.5,
      overall: 4.4
    },
    mapCoords: { x: 70, y: 60 },
    naverMapLink: "https://map.naver.com/v5/search/%EC%95%88%EC%95%94%EB%8F%99%20%EC%8A%A4%EC%8B%9C%ED%86%A0%EB%A1%9C",
    kakaoMapLink: "https://map.kakao.com/?q=%EC%95%88%EC%95%94%EB%8F%99%20%EC%8A%A4%EC%8B%9C%ED%86%A0%EB%A1%9C",
    oneLiner: "안암에서 제대로 된 두툼한 초밥을 먹고 싶을 때 찾는 곳.",
    reviews: [
      { author: "바이오시스템", rating: 4, taste: 5, value: 3, hygiene: 4, comment: "회 퀄리티가 좋습니다. 연어초밥이랑 활어초밥 꼭 드셔보세요.", date: "2026-06-08" }
    ]
  },
  {
    id: 12,
    name: "삼통치킨 안암본점",
    category: "LateNight",
    categoryKo: "야식/기타",
    mainMenu: "마늘치킨",
    priceCategory: "high",
    priceCategoryKo: "10,000원 이상",
    avgPrice: 19000,
    prepTime: "15분 이내",
    prepTimeMinutes: 15,
    description: "안암역 사거리 대표 명물. 달달한 마늘 소스가 듬뿍 올려진 치킨.",
    walkingTimes: {
      "안암역": 2,
      "정후": 7,
      "민광": 6,
      "법후": 12,
      "노벨광장": 6
    },
    suitability: ["friends", "group"],
    suitabilityKo: ["2~4인 동행", "단체 회식"],
    ratings: {
      taste: 4.5,
      value: 4.0,
      hygiene: 3.9,
      overall: 4.1
    },
    mapCoords: { x: 26, y: 55 },
    naverMapLink: "https://map.naver.com/v5/search/%EC%95%88%EC%95%94%EB%8F%99%20%EC%82%BC%ED%86%B5%EC%B9%98%ED%82%A8",
    kakaoMapLink: "https://map.kakao.com/?q=%EC%95%88%EC%95%94%EB%8F%99%20%EC%82%BC%ED%86%B5%EC%B9%98%ED%82%A8",
    oneLiner: "고대인들의 응원 뒤풀이 필수 코스이자 마늘 치킨의 명가.",
    reviews: [
      { author: "응원단원", rating: 5, taste: 5, value: 4, hygiene: 3, comment: "마늘치킨 소스가 진짜 중독적입니다. 시원한 맥주랑 조합 짱.", date: "2026-06-04" }
    ]
  },
  {
    id: 13,
    name: "춘자",
    category: "LateNight",
    categoryKo: "야식/기타",
    mainMenu: "김치찌개 & 계란말이",
    priceCategory: "low",
    priceCategoryKo: "7,000원 이하 (초가성비)",
    avgPrice: 6500,
    prepTime: "10분 이내",
    prepTimeMinutes: 8,
    description: "학생들의 영원한 안식처. 낮에는 푸짐한 밥집, 밤에는 저렴한 술집.",
    walkingTimes: {
      "안암역": 4,
      "정후": 5,
      "민광": 6,
      "법후": 10,
      "노벨광장": 3
    },
    suitability: ["friends", "group"],
    suitabilityKo: ["2~4인 동행", "단체 회식"],
    ratings: {
      taste: 4.0,
      value: 4.8,
      hygiene: 3.8,
      overall: 4.2
    },
    mapCoords: { x: 72, y: 48 },
    naverMapLink: "https://map.naver.com/v5/search/%EC%95%88%EC%95%94%EB%8F%99%20%EC%B2%9C%EC%9E%90",
    kakaoMapLink: "https://map.kakao.com/?q=%EC%95%88%EC%95%94%EB%8F%99%20%EC%B2%9C%EC%9E%90",
    oneLiner: "안암에서 이공계생 술값 아껴주기로 소문난 가성비 막걸리/식당.",
    reviews: [
      { author: "기계공학과 고참", rating: 4, taste: 4, value: 5, hygiene: 3, comment: "낮에 김치찌개 시키면 밥 볶아먹기도 좋고 배 두드리며 나옵니다. 위생은 정겨운 수준.", date: "2026-05-31" }
    ]
  },
  {
    id: 14,
    name: "써브웨이 안암역점",
    category: "FastFood",
    categoryKo: "패스트푸드",
    mainMenu: "이탈리안 B.M.T",
    priceCategory: "mid",
    priceCategoryKo: "7,000원 ~ 10,000원 (실속)",
    avgPrice: 8200,
    prepTime: "5분 이내",
    prepTimeMinutes: 4,
    description: "가볍고 건강하게 한 끼 때우기 좋은 안암역 앞 샌드위치 전문점.",
    walkingTimes: {
      "안암역": 1,
      "정후": 7,
      "민광": 6,
      "법후": 12,
      "노벨광장": 5
    },
    suitability: ["solo", "friends"],
    suitabilityKo: ["혼밥", "2~4인 동행"],
    ratings: {
      taste: 4.2,
      value: 4.0,
      hygiene: 4.6,
      overall: 4.3
    },
    mapCoords: { x: 23, y: 60 },
    naverMapLink: "https://map.naver.com/v5/search/%EC%8D%A8%EB%B8%8C%EC%9B%A8%EC%9D%B4%20%EC%95%9B%EC%95%94%EC%97%AD%EC%A0%90",
    kakaoMapLink: "https://map.kakao.com/?q=%EC%8D%A8%EB%B8%8C%EC%9B%A8%EC%9D%B4%20%EC%95%9B%EC%95%94%EC%97%AD%EC%A0%90",
    oneLiner: "다이어터와 바쁜 고대생들의 시간을 아껴주는 프레시 샌드위치.",
    reviews: [
      { author: "식자경 다이어터", rating: 4, taste: 4, value: 4, hygiene: 5, comment: "위생 청결하고 야채 신선해서 좋아요. 바쁠 때 랩으로 싸 들고 가면서 먹기 최적.", date: "2026-06-07" }
    ]
  }
];

class GoshelinDB {
  constructor() {
    this.restaurants = [];
    this.init();
  }

  init() {
    const localData = localStorage.getItem("goshelin_restaurants");
    if (localData) {
      try {
        this.restaurants = JSON.parse(localData);
      } catch (e) {
        console.error("Failed to parse local restaurants data", e);
        this.restaurants = [...DEFAULT_RESTAURANTS];
      }
    } else {
      this.restaurants = [...DEFAULT_RESTAURANTS];
      this.saveToStorage();
    }
  }

  saveToStorage() {
    localStorage.setItem("goshelin_restaurants", JSON.stringify(this.restaurants));
  }

  getAll() {
    return this.restaurants;
  }

  getById(id) {
    return this.restaurants.find(r => r.id === parseInt(id));
  }

  addReview(restaurantId, review) {
    const restaurant = this.getById(restaurantId);
    if (!restaurant) return false;

    // Add author, date if not provided
    const newReview = {
      author: review.author || "고대생",
      rating: parseFloat(review.rating),
      taste: parseFloat(review.taste),
      value: parseFloat(review.value),
      hygiene: parseFloat(review.hygiene),
      comment: review.comment || "",
      date: new Date().toISOString().split('T')[0]
    };

    if (!restaurant.reviews) {
      restaurant.reviews = [];
    }
    restaurant.reviews.unshift(newReview);

    // Recalculate average ratings
    const totalReviews = restaurant.reviews.length;
    let sumTaste = 0;
    let sumValue = 0;
    let sumHygiene = 0;
    let sumRating = 0;

    restaurant.reviews.forEach(rev => {
      sumTaste += rev.taste;
      sumValue += rev.value;
      sumHygiene += rev.hygiene;
      sumRating += rev.rating;
    });

    restaurant.ratings.taste = parseFloat((sumTaste / totalReviews).toFixed(1));
    restaurant.ratings.value = parseFloat((sumValue / totalReviews).toFixed(1));
    restaurant.ratings.hygiene = parseFloat((sumHygiene / totalReviews).toFixed(1));
    restaurant.ratings.overall = parseFloat((sumRating / totalReviews).toFixed(1));

    this.saveToStorage();
    return restaurant;
  }

  reset() {
    this.restaurants = [...DEFAULT_RESTAURANTS];
    this.saveToStorage();
    return this.restaurants;
  }
}

// Instantiate globally
window.goshelinDB = new GoshelinDB();
console.log("Goshelin DB Initialized with " + window.goshelinDB.getAll().length + " restaurants.");
