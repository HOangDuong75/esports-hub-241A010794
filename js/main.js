/**
 * ==========================================================================
 * ESPORTS HUB - JAVASCRIPT
 * Tác giả: Lê Minh Tài (Đồ án Lập trình Web cá nhân)
 * Chức năng:
 *  1. Smooth scroll từ nút "Khám phá ngay" xuống Games Section.
 *  2. Sticky Header & Menu tương tác (Mobile Toggle & Active Link).
 *  3. Lưu game yêu thích vào LocalStorage & cập nhật số lượng trực tiếp.
 *  4. Lọc theo thể loại (MOBA, FPS, Racing, Favorites) & Tìm kiếm theo tên.
 *  5. Modal chi tiết game khi nhấn "Tìm hiểu thêm".
 *  6. Hệ thống Toast Notification thông báo thao tác.
 * ==========================================================================
 */

// --- DỮ LIỆU CHI TIẾT 5 TỰA GAME ESPORTS ---
const GAMES_DATA = {
  'lien-quan': {
    id: 'lien-quan',
    name: 'Liên Quân Mobile (Arena of Valor)',
    genre: 'MOBA (Di động)',
    category: 'moba',
    image: 'assets/images/lien-quan.jpg',
    publisher: 'Garena & TiMi Studio',
    platform: 'Android, iOS',
    teams: 'Saigon Phantom (SGP), V Gaming, Talon Esports, Flash Wolves',
    rating: '4.8 / 5.0 ⭐',
    downloads: '100tr+',
    tournaments: 'Đấu Trường Danh Vọng (AOG), AIC, AWC',
    downloadUrl: 'https://play.google.com/store/apps/details?id=com.garena.game.kgvn&hl=vi',
    shortDesc: 'Tựa game MOBA di động quốc dân số 1 Việt Nam với lối chơi chiến thuật 5v5 nghẹt thở, nhịp độ nhanh và hệ thống tướng đa dạng, nổi bật với các giải đấu Đấu Trường Danh Vọng đỉnh cao.',
    fullDesc: 'Liên Quân Mobile là tựa game thể thao điện tử trên di động thành công nhất tại Việt Nam. Trò chơi đưa 10 người chơi vào một chiến trường 5v5 chia làm 3 đường (Rồng, Caesar, Giữa) và khu rừng kỳ bí. Người chơi tự do lựa chọn hàng trăm vị tướng với các vai trò Đấu sĩ, Pháp sư (tiêu biểu như Lauriel với trang phục Thứ Nguyên Vệ Thần huyền thoại), Xạ thủ, Trợ thủ và Sát thủ để phối hợp tác chiến đập tan nhà chính đối phương.',
    tips: [
      'Quan sát bản đồ con (minimap) liên tục mỗi 3-5 giây để tránh bị gank.',
      'Tập trung kiểm soát mục tiêu lớn (Rồng Ánh Sáng, Tà Thần Caesar) trước khi giao tranh tổng.',
      'Giữ vị trí an toàn cho chủ lực xạ thủ và pháp sư trong các pha combat quyết định.'
    ]
  },
  'lol': {
    id: 'lol',
    name: 'Liên Minh Huyền Thoại (League of Legends)',
    genre: 'MOBA (PC)',
    category: 'moba',
    image: 'assets/images/lol.jpg',
    publisher: 'Riot Games',
    platform: 'PC (Windows, macOS)',
    teams: 'T1 (Faker), Gen.G, GAM Esports, Fnatic, Bilibili Gaming',
    rating: '4.9 / 5.0 ⭐',
    downloads: '131tr+',
    tournaments: 'Chung Kết Thế Giới (Worlds), Mid-Season Invitational (MSI), VCS',
    downloadUrl: 'https://lienminh.vnggames.com/dang-ky/redownload/#/error',
    shortDesc: 'Huyền thoại Thể thao điện tử toàn cầu của Riot Games với bản đồ Summoner\'s Rift 5v5 kinh điển, chiều sâu chiến thuật và giải đấu Chung Kết Thế Giới (Worlds) danh giá bậc nhất.',
    fullDesc: 'Ra mắt từ năm 2009, Liên Minh Huyền Thoại đã trở thành biểu tượng văn hóa của nền Esports thế giới. Với hơn 160 vị tướng và hàng nghìn trang bị phong phú, mỗi ván đấu là một màn đấu trí về cấm/chọn (pick & ban), kiểm soát tầm nhìn mắt, căn thời gian hồi phép bổ trợ và thi triển combo kỹ năng mãn nhãn trước hàng chục triệu khán giả theo dõi trực tiếp.',
    tips: [
      'Rèn luyện kỹ năng farm lính (Last-hit) chuẩn xác để duy trì lượng vàng ổn định.',
      'Cắm mắt kiểm soát bụi cỏ và tầm nhìn quanh khu vực Baron / Rồng Ngàn Tuổi.',
      'Hiểu rõ chất tướng đầu game / cuối game để đưa ra chiến thuật ép đường hợp lý.'
    ]
  },
  'valorant': {
    id: 'valorant',
    name: 'Valorant',
    genre: 'FPS (Bắn súng chiến thuật)',
    category: 'fps',
    image: 'assets/images/valorant.jpg',
    publisher: 'Riot Games',
    platform: 'PC (Windows)',
    teams: 'Sentinels, Paper Rex, Fnatic, DRX, Team Heretics',
    rating: '4.8 / 5.0 ⭐',
    downloads: '35tr+',
    tournaments: 'VALORANT Champions Tour (VCT), Masters, Champions',
    downloadUrl: 'https://playvalorant.com/vi-vn/',
    shortDesc: 'Siêu phẩm FPS 5v5 kết hợp giữa đấu súng chuẩn xác từng mili-giây và bộ kỹ năng đặc vụ siêu nhiên độc đáo, đòi hỏi tư duy phối hợp đồng đội ở đẳng cấp cao.',
    fullDesc: 'Valorant kết hợp nhuần nhuyễn giữa kỹ năng ngắm bắn cơ học khắt khe (gunplay) và hệ thống Đặc vụ (Agent) sở hữu chiêu thức kiểm soát không gian, tạo khói mù, do thám thông tin hay hồi máu hỗ trợ. Trong mỗi hiệp đấu 5v5 tấn công và phòng thủ khu vực đặt Spike, chiến thuật và thông tin liên lạc là chìa khóa then chốt để giành chiến thắng.',
    tips: [
      'Luôn đặt tâm súng ở ngang tầm đầu đối thủ (Head-level crosshair placement).',
      'Đứng yên hoặc di chuyển nhấp nhả (Counter-strafing) khi bắn để đường đạn đạt độ chính xác tối đa.',
      'Sử dụng kỹ năng khói (Smoke) và Flash để che góc nguy hiểm trước khi tiến vào Site.'
    ]
  },
  'pubg-mobile': {
    id: 'pubg-mobile',
    name: 'PUBG Mobile (PlayerUnknown\'s Battlegrounds)',
    genre: 'Sinh tồn / Battle Royale',
    category: 'fps',
    image: 'assets/images/pubg-mobile.webp',
    publisher: 'VNGGames, Tencent & Krafton',
    platform: 'Android, iOS',
    teams: 'D\'Xavier, Box Gaming, Vampire Esports, Alpha7 Esports',
    rating: '4.8 / 5.0 ⭐',
    downloads: '1.2 Tỷ+',
    tournaments: 'PMGC (Global Championship), PMSL SEA, PMWI',
    downloadUrl: 'https://play.google.com/store/apps/details?id=com.vng.pubgmobile',
    shortDesc: 'Đấu trường sinh tồn 100 người khốc liệt hàng đầu thế giới, thử thách kỹ năng nhảy dù, nhặt trang bị, bắn súng và tư duy chiến thuật bo để giành lấy "Bữa cơm gà".',
    fullDesc: 'PUBG Mobile là tựa game bắn súng sinh tồn (Battle Royale) trên di động phổ biến bậc nhất hành tinh. 100 chiến binh nhảy dù xuống một hòn đảo hoang vắng rộng lớn (như Erangel, Miramar, Sanhok, Livik), tìm kiếm vũ khí, áo giáp, phương tiện và đạn dược trong khi vòng bo tử thần liên tục thu hẹp. Chỉ có chiến thuật di chuyển khôn ngoan, khả năng phối hợp tổ đội (Squad) và bản lĩnh sinh tồn đỉnh cao mới giúp bạn sống sót đến cuối cùng và đoạt lấy danh hiệu "Winner Winner Chicken Dinner!".',
    tips: [
      'Luôn ưu tiên chọn địa điểm tiếp đất an toàn và thu thập giáp, mũ cấp 2, 3 cùng vũ khí sớm.',
      'Lắng nghe tiếng bước chân và tiếng súng trên minimap để phán đoán vị trí kẻ địch.',
      'Di chuyển sớm theo mép bo thông minh và tận dụng phương tiện cơ động ở những vòng bo rộng.'
    ]
  },
  'cs2': {
    id: 'pubg-mobile',
    name: 'PUBG Mobile (PlayerUnknown\'s Battlegrounds)',
    genre: 'Sinh tồn / Battle Royale',
    category: 'fps',
    image: 'assets/images/pubg-mobile.webp',
    publisher: 'VNGGames, Tencent & Krafton',
    platform: 'Android, iOS',
    teams: 'D\'Xavier, Box Gaming, Vampire Esports, Alpha7 Esports',
    rating: '4.8 / 5.0 ⭐',
    downloads: '1.2 Tỷ+',
    tournaments: 'PMGC (Global Championship), PMSL SEA, PMWI',
    downloadUrl: 'https://play.google.com/store/apps/details?id=com.vng.pubgmobile',
    shortDesc: 'Đấu trường sinh tồn 100 người khốc liệt hàng đầu thế giới, thử thách kỹ năng nhảy dù, nhặt trang bị, bắn súng và tư duy chiến thuật bo để giành lấy "Bữa cơm gà".',
    fullDesc: 'PUBG Mobile là tựa game bắn súng sinh tồn (Battle Royale) trên di động phổ biến bậc nhất hành tinh. 100 chiến binh nhảy dù xuống một hòn đảo hoang vắng rộng lớn (như Erangel, Miramar, Sanhok, Livik), tìm kiếm vũ khí, áo giáp, phương tiện và đạn dược trong khi vòng bo tử thần liên tục thu hẹp. Chỉ có chiến thuật di chuyển khôn ngoan, khả năng phối hợp tổ đội (Squad) và bản lĩnh sinh tồn đỉnh cao mới giúp bạn sống sót đến cuối cùng và đoạt lấy danh hiệu "Winner Winner Chicken Dinner!".',
    tips: [
      'Luôn ưu tiên chọn địa điểm tiếp đất an toàn và thu thập giáp, mũ cấp 2, 3 cùng vũ khí sớm.',
      'Lắng nghe tiếng bước chân và tiếng súng trên minimap để phán đoán vị trí kẻ địch.',
      'Di chuyển sớm theo mép bo thông minh và tận dụng phương tiện cơ động ở những vòng bo rộng.'
    ]
  },
  'zingspeed': {
    id: 'zingspeed',
    name: 'ZingSpeed Mobile',
    genre: 'Racing (Đua xe 3D tốc độ cao)',
    category: 'racing',
    image: 'assets/images/zingspeed.jpg',
    publisher: 'VNGGames & Tencent Games',
    platform: 'Android, iOS',
    teams: 'Ghost, King, W.Brothers, cùng các tay đua hàng đầu Vô địch Quốc gia',
    rating: '4.7 / 5.0 ⭐',
    downloads: '10tr+',
    tournaments: 'Asian Cup, National Championship ZingSpeed, Road to Glory',
    downloadUrl: 'https://play.google.com/store/apps/details?id=com.vng.speedvn',
    shortDesc: 'Đấu trường đua xe 3D đỉnh cao nơi kỹ năng drift bẻ cua, căn thời điểm phun nitro nitro-boost và những màn cạnh tranh nghẹt thở trên các cung đường vi diệu quyết định ngôi vương tốc độ.',
    fullDesc: 'ZingSpeed Mobile tái hiện trọn vẹn tinh thần đua xe drift của huyền thoại 2U/QQ Speed trên nền tảng di động. Game thủ làm chủ hàng loạt kỹ thuật drift đỉnh cao (C-CW-C drift, WCW, Dub-boost, Snap-drift), điều khiển những cỗ máy đua tương lai xé gió và so tài nghẹt thở trong hai chế độ chính: Đua Tốc Độ thuần kỹ năng và Đua Đạo Cụ đầy tính chiến thuật giải trí.',
    tips: [
      'Luyện tập thành thục kỹ thuật kéo drift chữ C và WCW boost để gia tốc tối đa sau mỗi khúc cua.',
      'Tích lũy bình Nitro đầy trước khi bước vào các đoạn đường thẳng dài để bứt phá.',
      'Trong chế độ Đạo Cụ, hãy giữ Khiên hoặc Thiên Thần để hóa giải Tên Lửa và Tia Chớp ở những giây cuối về đích.'
    ]
  }
};

// --- QUẢN LÝ LOCALSTORAGE (GAME YÊU THÍCH) ---
const STORAGE_KEY = 'esports_hub_favorites_tai';

function getFavorites() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Lỗi khi đọc LocalStorage:', e);
    return [];
  }
}

function saveFavorites(favoritesArray) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favoritesArray));
    updateFavoritesBadge();
  } catch (e) {
    console.error('Lỗi khi lưu LocalStorage:', e);
  }
}

function toggleFavorite(gameId) {
  let favorites = getFavorites();
  const index = favorites.indexOf(gameId);
  const game = GAMES_DATA[gameId];
  let isFav = false;

  if (index > -1) {
    favorites.splice(index, 1);
    showToast(`Đã bỏ ${game ? game.name : 'game'} khỏi mục yêu thích.`, 'info');
  } else {
    favorites.push(gameId);
    isFav = true;
    showToast(`Đã thêm ${game ? game.name : 'game'} vào mục yêu thích! ⭐`, 'success');
  }

  saveFavorites(favorites);
  updateHeartButtonsState();

  // Nếu đang đứng ở tab "favorites", re-filter lại
  const activeTab = document.querySelector('.filter-btn.active');
  if (activeTab && activeTab.dataset.filter === 'favorites') {
    filterGames('favorites');
  }

  return isFav;
}

function updateHeartButtonsState() {
  const favorites = getFavorites();
  const heartBtns = document.querySelectorAll('.game-card__favorite-btn');

  heartBtns.forEach(btn => {
    const cardId = btn.closest('.game-card').dataset.id;
    if (favorites.includes(cardId)) {
      btn.classList.add('is-favorite');
      btn.setAttribute('aria-label', 'Bỏ lưu yêu thích');
      btn.setAttribute('title', 'Đã lưu vào danh sách yêu thích');
    } else {
      btn.classList.remove('is-favorite');
      btn.setAttribute('aria-label', 'Thêm vào yêu thích');
      btn.setAttribute('title', 'Lưu vào danh sách yêu thích');
    }
  });
}

function updateFavoritesBadge() {
  const favorites = getFavorites();
  const count = favorites.length;
  
  // Cập nhật số lượng trên header badge
  const headerBadge = document.getElementById('favorites-badge');
  if (headerBadge) {
    headerBadge.textContent = count;
  }

  // Cập nhật số lượng trên tab filter
  const tabBadge = document.getElementById('filter-favorites-count');
  if (tabBadge) {
    tabBadge.textContent = count;
  }
}

// --- SMOOTH SCROLL VÀ STICKY HEADER ---
function setupNavigation() {
  const header = document.querySelector('.header');
  const ctaBtn = document.getElementById('cta-explore-btn');
  const gamesSection = document.getElementById('games-section');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');

  // 1. Yêu cầu đề bài: Thêm Event Listener cho nút "Khám phá ngay" cuộn mượt xuống Games Section
  if (ctaBtn && gamesSection) {
    ctaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      gamesSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  }

  // 2. Nút "Xem hướng dẫn" cuộn mượt
  const guideCtaBtn = document.getElementById('cta-guides-btn');
  const guidesSection = document.getElementById('guides-section');
  if (guideCtaBtn && guidesSection) {
    guideCtaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      guidesSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // 3. Header Scrolled shadow effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Tự động highlight active nav link theo vị trí cuộn
    highlightActiveNavLink();
  });

  // 4. Mobile Menu Toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Tự động đóng menu mobile khi click vào một link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // 5. Nút Header Favorites Counter click nhảy tới tab Favorites
  const favoritesCounterBtn = document.getElementById('header-favorites-btn');
  if (favoritesCounterBtn) {
    favoritesCounterBtn.addEventListener('click', () => {
      gamesSection.scrollIntoView({ behavior: 'smooth' });
      const favTab = document.querySelector('.filter-btn[data-filter="favorites"]');
      if (favTab) {
        favTab.click();
      }
    });
  }
}

function highlightActiveNavLink() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const scrollY = window.pageYOffset + 120;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop;
    const sectionId = current.getAttribute('id');
    const targetLink = document.querySelector(`.nav__link[href*="${sectionId}"]`);

    if (targetLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll('.nav__link').forEach(l => l.classList.remove('active'));
        targetLink.classList.add('active');
      }
    }
  });
}

// --- BỘ LỌC GAME (FILTER TABS) & TÌM KIẾM (SEARCH) ---
let currentCategory = 'all';
let currentSearchTerm = '';

function setupFilterAndSearch() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('game-search-input');

  // Xử lý click Filter Tab
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.filter;
      applyFilters();
    });
  });

  // Xử lý ô Tìm kiếm theo thời gian thực (real-time input)
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchTerm = e.target.value.toLowerCase().trim();
      applyFilters();
    });
  }
}

function applyFilters() {
  const cards = document.querySelectorAll('.game-card');
  const emptyState = document.getElementById('games-empty');
  const favorites = getFavorites();
  let visibleCount = 0;

  cards.forEach(card => {
    const cardId = card.dataset.id;
    const cardCategory = card.dataset.category;
    const cardTitle = card.querySelector('.game-card__title').textContent.toLowerCase();
    const cardDesc = card.querySelector('.game-card__desc').textContent.toLowerCase();
    const cardGenre = card.dataset.genre ? card.dataset.genre.toLowerCase() : '';

    // Kiểm tra danh mục
    let matchesCategory = false;
    if (currentCategory === 'all') {
      matchesCategory = true;
    } else if (currentCategory === 'favorites') {
      matchesCategory = favorites.includes(cardId);
    } else if (cardCategory === currentCategory) {
      matchesCategory = true;
    }

    // Kiểm tra từ khóa tìm kiếm
    let matchesSearch = true;
    if (currentSearchTerm !== '') {
      matchesSearch = cardTitle.includes(currentSearchTerm) ||
                            cardDesc.includes(currentSearchTerm) ||
                            cardGenre.includes(currentSearchTerm);
    }

    if (matchesCategory && matchesSearch) {
      card.style.display = 'flex';
      card.style.animation = 'fadeIn 0.3s ease forwards';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  // Hiển thị trạng thái rỗng nếu không tìm thấy game nào
  if (emptyState) {
    if (visibleCount === 0) {
      emptyState.classList.add('visible');
    } else {
      emptyState.classList.remove('visible');
    }
  }
}

function filterGames(category) {
  currentCategory = category;
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(b => {
    if (b.dataset.filter === category) {
      b.classList.add('active');
    } else {
      b.classList.remove('active');
    }
  });
  applyFilters();
}

// --- INTERACTIVE MODAL (TÌM HIỂU THÊM) ---
function setupGameModal() {
  const modalOverlay = document.getElementById('game-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalFooterCloseBtn = document.getElementById('modal-footer-close-btn');
  const learnMoreBtns = document.querySelectorAll('.btn-learn-more');

  // Gán sự kiện cho từng nút "Tìm hiểu thêm" trên các thẻ Card
  learnMoreBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = btn.closest('.game-card');
      const gameId = card.dataset.id;
      openGameModal(gameId);
    });
  });

  // Đóng Modal khi bấm nút X
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeGameModal);
  }

  // Đóng Modal khi bấm nút Đóng ở chân modal
  if (modalFooterCloseBtn) {
    modalFooterCloseBtn.addEventListener('click', closeGameModal);
  }

  // Đóng Modal khi bấm ra ngoài vùng nội dung (Click Overlay)
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeGameModal();
      }
    });
  }

  // Đóng Modal khi nhấn phím ESC
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeGameModal();
    }
  });
}

function openGameModal(gameId) {
  const game = GAMES_DATA[gameId];
  if (!game) return;

  const modalOverlay = document.getElementById('game-modal');
  const modalImg = document.getElementById('modal-img');
  const modalBadge = document.getElementById('modal-genre-badge');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalPublisher = document.getElementById('modal-publisher');
  const modalPlatform = document.getElementById('modal-platform');
  const modalTeams = document.getElementById('modal-teams');
  const modalTournaments = document.getElementById('modal-tournaments');
  const modalDownloads = document.getElementById('modal-downloads');
  const modalRating = document.getElementById('modal-rating');
  const modalTipsList = document.getElementById('modal-tips-list');
  const modalFavBtn = document.getElementById('modal-favorite-toggle');
  const modalDownloadBtn = document.getElementById('modal-download-btn');

  // Đổ dữ liệu vào modal
  modalImg.src = game.image;
  modalImg.alt = game.name;
  modalBadge.textContent = game.genre;
  modalTitle.textContent = game.name;
  modalDesc.textContent = game.fullDesc;
  modalPublisher.textContent = game.publisher;
  modalPlatform.textContent = game.platform;
  modalTeams.textContent = game.teams;
  modalTournaments.textContent = game.tournaments;
  if (modalDownloads) modalDownloads.textContent = game.downloads || '100tr+';
  if (modalRating) modalRating.textContent = game.rating || '4.8 / 5.0 ⭐';

  // Cập nhật link tải nút "Tải ngay"
  if (modalDownloadBtn) {
    if (game.downloadUrl) {
      modalDownloadBtn.href = game.downloadUrl;
      modalDownloadBtn.style.display = 'inline-flex';
    } else {
      modalDownloadBtn.style.display = 'none';
    }
  }

  // Render danh sách mẹo chơi (tips)
  modalTipsList.innerHTML = '';
  game.tips.forEach(tip => {
    const li = document.createElement('li');
    li.style.marginBottom = '6px';
    li.style.fontSize = '0.9rem';
    li.style.color = '#334155';
    li.innerHTML = `💡 ${tip}`;
    modalTipsList.appendChild(li);
  });

  // Đồng bộ trạng thái nút yêu thích trên Modal
  if (modalFavBtn) {
    const favorites = getFavorites();
    const isFav = favorites.includes(gameId);
    updateModalFavButtonText(modalFavBtn, isFav);

    // Xóa listener cũ và gán listener mới
    const newBtn = modalFavBtn.cloneNode(true);
    modalFavBtn.parentNode.replaceChild(newBtn, modalFavBtn);
    newBtn.addEventListener('click', () => {
      const nowFav = toggleFavorite(gameId);
      updateModalFavButtonText(newBtn, nowFav);
    });
  }

  // Mở modal và khóa cuộn body
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function updateModalFavButtonText(btn, isFav) {
  if (isFav) {
    btn.innerHTML = `❤️ Đã lưu vào yêu thích`;
    btn.style.backgroundColor = '#fee2e2';
    btn.style.color = '#ef4444';
    btn.style.borderColor = '#fca5a5';
  } else {
    btn.innerHTML = `🤍 Thêm vào yêu thích`;
    btn.style.backgroundColor = 'var(--sky-50)';
    btn.style.color = 'var(--sky-600)';
    btn.style.borderColor = 'var(--border-sky)';
  }
}

function closeGameModal() {
  const modalOverlay = document.getElementById('game-modal');
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// --- CÀI ĐẶT & THAO TÁC NÂNG CAO ---
function setupSettings() {
  const clearFavBtn = document.getElementById('btn-clear-favorites');
  if (clearFavBtn) {
    clearFavBtn.addEventListener('click', () => {
      if (confirm('Bạn có chắc chắn muốn xóa toàn bộ danh sách game yêu thích?')) {
        saveFavorites([]);
        updateHeartButtonsState();
        applyFilters();
        showToast('Đã dọn sạch danh sách game yêu thích!', 'info');
      }
    });
  }
}

// --- QUẢN LÝ TÀI KHOẢN & GOOGLE AUTH ---
const USER_STORAGE_KEY = 'esports_hub_user_tai';

function getCurrentUser() {
  try {
    const data = localStorage.getItem(USER_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
}

function saveCurrentUser(user) {
  try {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } catch (e) {
    console.error('Lỗi khi lưu thông tin người dùng:', e);
  }
}

function setupAuth() {
  const authModal = document.getElementById('auth-modal');
  const btnOpenAuth = document.getElementById('btn-open-auth');
  const authCloseBtn = document.getElementById('auth-close-btn');
  const btnGoogleAction = document.getElementById('btn-google-action');
  const tabBtnLogin = document.getElementById('tab-btn-login');
  const tabBtnRegister = document.getElementById('tab-btn-register');
  const formLogin = document.getElementById('form-login');
  const formRegister = document.getElementById('form-register');

  const userLoggedBox = document.getElementById('user-logged-box');
  const userProfileToggle = document.getElementById('user-profile-toggle');
  const userDropdownCard = document.getElementById('user-dropdown-card');
  const btnLogout = document.getElementById('btn-logout');

  // Kiểm tra và render trạng thái đã đăng nhập nếu có
  updateAuthState();

  // Mở modal Đăng nhập / Tạo tài khoản
  if (btnOpenAuth) {
    btnOpenAuth.addEventListener('click', () => {
      openAuthModal();
    });
  }

  // Đóng modal
  if (authCloseBtn) {
    authCloseBtn.addEventListener('click', () => {
      closeAuthModal();
    });
  }

  if (authModal) {
    authModal.addEventListener('click', (e) => {
      if (e.target === authModal) {
        closeAuthModal();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (authModal && authModal.classList.contains('active')) {
        closeAuthModal();
      }
      if (userDropdownCard) {
        userDropdownCard.classList.remove('open');
      }
    }
  });

  // Chuyển tab Đăng nhập
  if (tabBtnLogin && tabBtnRegister) {
    tabBtnLogin.addEventListener('click', () => {
      tabBtnLogin.classList.add('active');
      tabBtnRegister.classList.remove('active');
      formLogin.style.display = 'flex';
      formRegister.style.display = 'none';
    });

    // Chuyển tab Tạo tài khoản
    tabBtnRegister.addEventListener('click', () => {
      tabBtnRegister.classList.add('active');
      tabBtnLogin.classList.remove('active');
      formRegister.style.display = 'flex';
      formLogin.style.display = 'none';
    });
  }

  // ĐĂNG NHẬP / LIÊN KẾT GOOGLE
  if (btnGoogleAction) {
    btnGoogleAction.addEventListener('click', () => {
      const googleUser = {
        name: 'Lê Minh Tài',
        email: 'leminhtai.esports@gmail.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tai&backgroundColor=b6e3f4',
        provider: 'Google'
      };
      saveCurrentUser(googleUser);
      updateAuthState();
      closeAuthModal();
      showToast('Đăng nhập thành công với tài khoản Google! Chào mừng Lê Minh Tài 🎉', 'success');
    });
  }

  // Xử lý Form Đăng Nhập Email
  if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('login-email').value.trim();
      let displayName = emailInput.split('@')[0];
      displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);

      const user = {
        name: displayName,
        email: emailInput.includes('@') ? emailInput : `${emailInput}@esportshub.vn`,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(displayName)}`,
        provider: 'Email'
      };
      saveCurrentUser(user);
      updateAuthState();
      closeAuthModal();
      showToast(`Đăng nhập thành công! Chào mừng ${user.name} trở lại 🎉`, 'success');
    });
  }

  // Xử lý Form Tạo Tài Khoản
  if (formRegister) {
    formRegister.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('register-name').value.trim();
      const email = document.getElementById('register-email').value.trim();

      const user = {
        name: name,
        email: email,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
        provider: 'Tài khoản mới'
      };
      saveCurrentUser(user);
      updateAuthState();
      closeAuthModal();
      showToast(`Tạo tài khoản thành công! Chào mừng ${user.name} gia nhập Esports Hub 🎉`, 'success');
    });
  }

  // Bật / tắt Menu Dropdown Profile
  if (userProfileToggle && userDropdownCard) {
    userProfileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      userDropdownCard.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!userDropdownCard.contains(e.target) && !userProfileToggle.contains(e.target)) {
        userDropdownCard.classList.remove('open');
      }
    });
  }

  // Xử lý Đăng xuất
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      localStorage.removeItem(USER_STORAGE_KEY);
      if (userDropdownCard) userDropdownCard.classList.remove('open');
      updateAuthState();
      showToast('Bạn đã đăng xuất khỏi tài khoản thành công.', 'info');
    });
  }
}

function openAuthModal() {
  const authModal = document.getElementById('auth-modal');
  if (authModal) {
    authModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeAuthModal() {
  const authModal = document.getElementById('auth-modal');
  if (authModal) {
    authModal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function updateAuthState() {
  const currentUser = getCurrentUser();
  const btnOpenAuth = document.getElementById('btn-open-auth');
  const userLoggedBox = document.getElementById('user-logged-box');

  const headerAvatar = document.getElementById('header-user-avatar');
  const headerName = document.getElementById('header-user-name');
  const dropdownAvatar = document.getElementById('dropdown-user-avatar');
  const dropdownName = document.getElementById('dropdown-user-name');
  const dropdownEmail = document.getElementById('dropdown-user-email');

  if (currentUser) {
    if (btnOpenAuth) btnOpenAuth.style.display = 'none';
    if (userLoggedBox) userLoggedBox.style.display = 'inline-flex';

    if (headerAvatar) headerAvatar.src = currentUser.avatar;
    if (headerName) headerName.textContent = currentUser.name;
    if (dropdownAvatar) dropdownAvatar.src = currentUser.avatar;
    if (dropdownName) dropdownName.textContent = currentUser.name;
    if (dropdownEmail) dropdownEmail.textContent = currentUser.email;
  } else {
    if (btnOpenAuth) btnOpenAuth.style.display = 'inline-flex';
    if (userLoggedBox) userLoggedBox.style.display = 'none';
  }
}

// --- HỆ THỐNG TOAST THÔNG BÁO ---
function showToast(message, type = 'info') {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  const iconSvg = type === 'success' 
    ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
    : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;

  toast.innerHTML = `
    <span class="toast-icon">${iconSvg}</span>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  // Kích hoạt animation trượt vào
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  // Tự động gỡ sau 3.2 giây
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 400);
  }, 3200);
}

// --- KHỞI CHẠY KHI TẢI XONG TRANG (DOM CONTENT LOADED) ---
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupFilterAndSearch();
  setupGameModal();
  setupSettings();
  setupAuth();

  // Gán sự kiện click nút trái tim yêu thích cho từng card
  const favoriteButtons = document.querySelectorAll('.game-card__favorite-btn');
  favoriteButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.game-card');
      const gameId = card.dataset.id;
      toggleFavorite(gameId);
    });
  });

  // Khởi tạo trạng thái từ LocalStorage
  updateFavoritesBadge();
  updateHeartButtonsState();

  console.log('⚡ Esports Hub Landing Page - Khởi chạy hoàn tất! Tác giả: Lê Minh Tài.');
});
