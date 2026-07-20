// ==========================================================
// NUCKS 홈페이지 - 인증/권한 공통 로직
// firebase-config.js 다음에 이 파일을 불러와서 사용하세요.
// ==========================================================

// 회원가입: 이메일/비밀번호로 계정 생성 + Firestore에 role 저장
// 신규 가입자는 기본적으로 'guest' 권한으로 생성되고,
// 관리자가 Firestore 콘솔에서 직접 role을 'worker' 또는 'admin'으로 승인/변경하는 구조입니다.
// (누구나 가입 즉시 근로자/관리자 권한을 갖는 걸 막기 위함)
async function signUp(email, password, displayName) {
  const cred = await auth.createUserWithEmailAndPassword(email, password);
  await db.collection("users").doc(cred.user.uid).set({
    email: email,
    displayName: displayName || "",
    role: "guest", // 기본값. 관리자가 승인 후 worker/admin으로 변경
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
  return cred.user;
}

// 로그인
async function logIn(email, password) {
  const cred = await auth.signInWithEmailAndPassword(email, password);
  return cred.user;
}

// 로그아웃
async function logOut() {
  await auth.signOut();
}

// 현재 로그인한 사용자의 role 조회 ('guest' | 'worker' | 'admin')
async function getCurrentUserRole() {
  const user = auth.currentUser;
  if (!user) return null;
  const doc = await db.collection("users").doc(user.uid).get();
  if (!doc.exists) return null;
  return doc.data().role;
}

// 페이지 접근 제어 가드
// 예) 근무일지 페이지 맨 위에 <script> requireRole(['worker','admin']); </script>
// 예) 관리자 페이지 맨 위에 <script> requireRole(['admin']); </script>
function requireRole(allowedRoles, redirectUrl = "login.html") {
  auth.onAuthStateChanged(async (user) => {
    if (!user) {
      // 비로그인 상태 -> 로그인 페이지로
      window.location.href = redirectUrl;
      return;
    }
    const role = await getCurrentUserRole();
    if (!allowedRoles.includes(role)) {
      // 권한 없음 -> 접근 불가 안내 후 홈으로
      alert("접근 권한이 없습니다.");
      window.location.href = "index.html";
    }
  });
}

// 로그인 상태에 따라 네비게이션 UI를 갱신하고 싶을 때 사용
// (예: 로그인 전 '로그인' 버튼 -> 로그인 후 '마이페이지'/'로그아웃' 버튼)
function watchAuthState(onLoggedIn, onLoggedOut) {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      const role = await getCurrentUserRole();
      onLoggedIn && onLoggedIn(user, role);
    } else {
      onLoggedOut && onLoggedOut();
    }
  });
}
