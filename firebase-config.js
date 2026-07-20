// ==========================================================
// Firebase 프로젝트 설정
// Firebase 콘솔 > 프로젝트 설정 > 내 앱 > SDK 설정 및 구성
// 에서 복사한 firebaseConfig 값을 아래에 붙여넣으세요.
// ==========================================================
const firebaseConfig = {
  apiKey: "AIzaSyAMFXVMwtQVQWPYcukB2OslN75r2JzcXvE",
  authDomain: "nucks-design.firebaseapp.com",
  projectId: "nucks-design",
  storageBucket: "nucks-design.firebasestorage.app",
  messagingSenderId: "365302226895",
  appId: "1:365302226895:web:a7287dc64e5bc42bef3cba"
};

// Firebase 초기화 (모든 페이지에서 공용으로 사용)
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
