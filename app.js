// Goshelin Web App Logic
// Managing application state, UI rendering, filters, matching algorithm, canvas maps, and sound-equipped roulette

document.addEventListener("DOMContentLoaded", () => {
  // --- State Variables ---
  let activeView = "view-home";
  let historyStack = ["view-home"];
  let selectedLocation = "";
  let activeCategories = ["all"];
  let gpsActivated = false;

  // Sound Engine using Web Audio API
  let audioCtx = null;

  // --- DOM Elements ---
  const views = {
    home: document.getElementById("view-home"),
    filter: document.getElementById("view-filter"),
    results: document.getElementById("view-results"),
    detail: document.getElementById("view-detail"),
    roulette: document.getElementById("view-roulette")
  };

  const navButtons = {
    back: document.getElementById("back-btn"),
    home: document.getElementById("home-nav-btn"),
    logo: document.getElementById("header-logo"),
    tabHome: document.getElementById("tab-home"),
    tabMatch: document.getElementById("tab-match"),
    tabRoulette: document.getElementById("tab-roulette")
  };

  // Home view buttons
  const goFilterBtn = document.getElementById("go-filter-btn");
  const goRouletteBtn = document.getElementById("go-roulette-btn");

  // Filter form elements
  const filterForm = document.getElementById("filter-form");
  const gpsBtn = document.getElementById("gps-btn");
  const gpsStatus = document.getElementById("gps-status");
  const locationPills = document.querySelectorAll(".loc-pill");
  const selectedLocInput = document.getElementById("selected-location");
  const categoryChips = document.querySelectorAll(".chip");

  // Results elements
  const resultsList = document.getElementById("results-list");
  const resultsSummaryText = document.getElementById("results-summary-text");
  const resultsEmpty = document.getElementById("results-empty");
  const resetFilterBtn = document.getElementById("reset-filter-btn");
  const retryFilterBtn = document.getElementById("retry-filter-btn");

  // Detail view elements
  const detailName = document.getElementById("detail-name");
  const detailCategory = document.getElementById("detail-category-badge");
  const detailDescription = document.getElementById("detail-description");
  const detailOverallRating = document.getElementById("detail-overall-rating");
  const detailReviewCount = document.getElementById("detail-review-count");
  const detailMainMenu = document.getElementById("detail-main-menu");
  const detailAvgPrice = document.getElementById("detail-avg-price");
  const detailPrepTime = document.getElementById("detail-prep-time");
  const detailDistanceList = document.getElementById("detail-distance-list");
  const naverMapBtn = document.getElementById("naver-map-btn");
  const kakaoMapBtn = document.getElementById("kakao-map-btn");
  const barTasteVal = document.getElementById("bar-taste-val");
  const barTasteFill = document.getElementById("bar-taste-fill");
  const barValueVal = document.getElementById("bar-value-val");
  const barValueFill = document.getElementById("bar-value-fill");
  const barHygieneVal = document.getElementById("bar-hygiene-val");
  const barHygieneFill = document.getElementById("bar-hygiene-fill");
  const detailReviewsList = document.getElementById("detail-reviews-list");
  const reviewSubmitForm = document.getElementById("review-submit-form");

  // Review Form Slider Indicators
  const sliderTaste = document.getElementById("range-taste");
  const tasteInd = document.getElementById("taste-indicator");
  const sliderValue = document.getElementById("range-value");
  const valueInd = document.getElementById("value-indicator");
  const sliderHygiene = document.getElementById("range-hygiene");
  const hygieneInd = document.getElementById("hygiene-indicator");

  // Roulette elements
  const rouletteWheel = document.getElementById("roulette-wheel");
  const spinBtn = document.getElementById("spin-btn");
  const rouletteCurrentLoc = document.getElementById("roulette-current-loc");
  const rouletteResultCard = document.getElementById("roulette-result-card");
  const rouletteResultName = document.getElementById("roulette-result-name");
  const rouletteResultMenu = document.getElementById("roulette-result-menu");
  const rouletteResultWalk = document.getElementById("roulette-result-walk");
  const rouletteResultRating = document.getElementById("roulette-result-rating");
  const rouletteResultComment = document.getElementById("roulette-result-comment");
  const rouletteDetailBtn = document.getElementById("roulette-detail-btn");
  const rouletteRetryBtn = document.getElementById("roulette-retry-btn");

  let rouletteActiveRestaurants = [];
  let currentSpinnedRestaurant = null;

  // --- Initial Setup & Navigation ---
  
  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  function playTickSound(frequency = 400, duration = 0.05) {
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn("Audio playback failed", e);
    }
  }

  function playSuccessSound() {
    if (!audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      const gainNode = audioCtx.createGain();
      gainNode.connect(audioCtx.destination);
      gainNode.gain.setValueAtTime(0.1, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      const osc1 = audioCtx.createOscillator();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.frequency.setValueAtTime(659.25, now + 0.15); // E5
      osc1.frequency.setValueAtTime(783.99, now + 0.3); // G5
      osc1.frequency.setValueAtTime(1046.50, now + 0.45); // C6
      
      osc1.connect(gainNode);
      osc1.start(now);
      osc1.stop(now + 0.6);
    } catch (e) {
      console.warn("Success audio failed", e);
    }
  }

  function showView(viewId, pushToHistory = true) {
    // Hide all views
    Object.keys(views).forEach(key => {
      views[key].classList.remove("active");
    });

    // Show selected view
    const targetView = document.getElementById(viewId);
    if (targetView) {
      targetView.classList.add("active");
      activeView = viewId;
    }

    // Update history stack
    if (pushToHistory && historyStack[historyStack.length - 1] !== viewId) {
      historyStack.push(viewId);
    }

    // Toggle Back button visibility (Home view has no back)
    if (historyStack.length > 1 && viewId !== "view-home") {
      navButtons.back.classList.remove("hide");
    } else {
      navButtons.back.classList.add("hide");
    }

    // Update Bottom Nav active state
    navButtons.tabHome.classList.remove("active");
    navButtons.tabMatch.classList.remove("active");
    navButtons.tabRoulette.classList.remove("active");

    if (viewId === "view-home") {
      navButtons.tabHome.classList.add("active");
    } else if (viewId === "view-filter" || viewId === "view-results") {
      navButtons.tabMatch.classList.add("active");
    } else if (viewId === "view-roulette") {
      navButtons.tabRoulette.classList.add("active");
    }

    // Scroll view content to top
    document.querySelector(".app-content").scrollTop = 0;
  }

  function goBack() {
    if (historyStack.length > 1) {
      historyStack.pop(); // Remove current view
      const prevView = historyStack[historyStack.length - 1];
      showView(prevView, false);
    }
  }

  // Bind Navigation Events
  navButtons.back.addEventListener("click", goBack);
  navButtons.home.addEventListener("click", () => {
    historyStack = ["view-home"];
    showView("view-home");
  });
  navButtons.logo.addEventListener("click", () => {
    historyStack = ["view-home"];
    showView("view-home");
  });
  navButtons.tabHome.addEventListener("click", () => {
    historyStack = ["view-home"];
    showView("view-home");
  });
  navButtons.tabMatch.addEventListener("click", () => {
    showView("view-filter");
  });
  navButtons.tabRoulette.addEventListener("click", () => {
    setupRoulette();
    showView("view-roulette");
  });

  goFilterBtn.addEventListener("click", () => showView("view-filter"));
  goRouletteBtn.addEventListener("click", () => {
    setupRoulette();
    showView("view-roulette");
  });

  // --- Step 1: Location & GPS ---
  
  gpsBtn.addEventListener("click", () => {
    gpsStatus.textContent = "GPS 신호 탐색 중...";
    gpsBtn.classList.add("active");
    initAudio();
    playTickSound(600, 0.1);

    setTimeout(() => {
      // Pick a random campus node representing current location
      const hubs = ["안암역", "정후", "민광", "법후", "노벨광장"];
      const randomHub = hubs[Math.floor(Math.random() * hubs.length)];
      
      // Activate landmark pill
      locationPills.forEach(pill => {
        if (pill.getAttribute("data-loc") === randomHub) {
          pill.classList.add("active");
        } else {
          pill.classList.remove("active");
        }
      });

      selectedLocation = randomHub;
      selectedLocInput.value = randomHub;
      gpsStatus.textContent = `위치 인증 성공: ${randomHub}`;
      gpsStatus.classList.add("active");
      gpsActivated = true;
      playTickSound(800, 0.15);
    }, 800);
  });

  locationPills.forEach(pill => {
    pill.addEventListener("click", (e) => {
      locationPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      
      selectedLocation = pill.getAttribute("data-loc");
      selectedLocInput.value = selectedLocation;
      
      // Reset GPS status badge since user manually picked
      gpsStatus.textContent = "직접 선택됨";
      gpsStatus.classList.remove("active");
      gpsBtn.classList.remove("active");
      gpsActivated = false;
      
      initAudio();
      playTickSound(440, 0.05);
    });
  });

  // --- Step 2: Food Category Multi-select ---
  
  categoryChips.forEach(chip => {
    chip.addEventListener("click", () => {
      const category = chip.getAttribute("data-cat");
      initAudio();
      playTickSound(480, 0.05);

      if (category === "all") {
        activeCategories = ["all"];
        categoryChips.forEach(c => {
          if (c.getAttribute("data-cat") === "all") c.classList.add("active");
          else c.classList.remove("active");
        });
      } else {
        // Deactivate "all"
        const allChip = document.querySelector('.chip[data-cat="all"]');
        allChip.classList.remove("active");
        if (activeCategories.includes("all")) {
          activeCategories = [];
        }

        // Toggle category
        if (activeCategories.includes(category)) {
          activeCategories = activeCategories.filter(cat => cat !== category);
          chip.classList.remove("active");
        } else {
          activeCategories.push(category);
          chip.classList.add("active");
        }

        // If nothing selected, revert to all
        if (activeCategories.length === 0) {
          activeCategories = ["all"];
          allChip.classList.add("active");
        }
      }
    });
  });

  // --- Slider Indicator Bindings ---
  
  sliderTaste.addEventListener("input", (e) => tasteInd.textContent = parseFloat(e.target.value).toFixed(1));
  sliderValue.addEventListener("input", (e) => valueInd.textContent = parseFloat(e.target.value).toFixed(1));
  sliderHygiene.addEventListener("input", (e) => hygieneInd.textContent = parseFloat(e.target.value).toFixed(1));

  // --- Filter Form Submit & Matching ---

  filterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!selectedLocation) {
      alert("현재 위치 거점을 선택해 주세요!");
      // Shake location selector box
      const locGroup = document.querySelector(".filter-group");
      locGroup.style.animation = "shake 0.5s ease";
      setTimeout(() => locGroup.style.animation = "", 500);
      return;
    }

    const priceRange = filterForm.price.value;
    const walkLimit = parseInt(filterForm.walk.value);
    const purpose = filterForm.purpose.value;

    calculateRecommendations(selectedLocation, activeCategories, priceRange, walkLimit, purpose);
  });

  function calculateRecommendations(location, categories, price, walkLimit, purpose) {
    const allRestaurants = window.goshelinDB.getAll();
    const matches = [];

    allRestaurants.forEach(restaurant => {
      const walkTime = restaurant.walkingTimes[location];
      
      // Constraint 1: Walk limit
      if (walkTime > walkLimit) return;

      // Constraint 2: Category filter
      if (!categories.includes("all") && !categories.includes(restaurant.category)) {
        return;
      }

      // Constraint 3: Price range
      if (price !== "all" && restaurant.priceCategory !== price) {
        return;
      }

      // If constraints are passed, calculate match score
      let matchScore = 55; // Base score

      // Category matching bonus
      if (!categories.includes("all") && categories.includes(restaurant.category)) {
        matchScore += 15;
      }

      // Price matching bonus
      if (price !== "all" && restaurant.priceCategory === price) {
        matchScore += 10;
      }

      // Walk time bonus (closer is better)
      const walkDiff = walkLimit - walkTime;
      matchScore += walkDiff * 1.5;

      // Purpose match
      if (restaurant.suitability.includes(purpose)) {
        matchScore += 12;
      } else {
        matchScore -= 5;
      }

      // Rating bonus
      const ratingBonus = (restaurant.ratings.overall - 3.8) * 10;
      matchScore += ratingBonus;

      // Cap score between 0 and 100
      matchScore = Math.min(100, Math.max(0, Math.round(matchScore)));

      matches.push({
        ...restaurant,
        matchScore,
        currentDistance: walkTime
      });
    });

    // Sort by Match Score descending
    matches.sort((a, b) => b.matchScore - a.matchScore);

    // Limit to Top 5
    const topMatches = matches.slice(0, 5);

    renderResults(topMatches, location);
  }

  function renderResults(results, location) {
    resultsList.innerHTML = "";
    resultsSummaryText.innerHTML = `<strong>${location}</strong> 기준 선택하신 조건의 추천 밥집`;

    if (results.length === 0) {
      resultsEmpty.classList.remove("hide");
      resultsList.classList.add("hide");
    } else {
      resultsEmpty.classList.add("hide");
      resultsList.classList.remove("hide");

      results.forEach((item, index) => {
        const isTopChoice = index === 0;
        const card = document.createElement("div");
        card.className = "restaurant-card";
        card.setAttribute("data-id", item.id);

        card.innerHTML = `
          <div class="card-header">
            <span class="match-score-badge">${item.matchScore}% 일치</span>
            <div class="card-tag-row">
              ${isTopChoice ? '<span class="card-tag crimson">추천 1순위</span>' : ''}
              <span class="card-tag">${item.categoryKo}</span>
            </div>
          </div>
          <div class="card-title-row">
            <h3 class="card-name">${item.name}</h3>
            <p class="card-menu">${item.mainMenu}</p>
          </div>
          <div class="card-specs">
            <div class="spec-item">🚶 <strong>${item.currentDistance}분</strong></div>
            <div class="spec-item"><span class="stars">★</span> <strong>${item.ratings.overall.toFixed(1)}</strong></div>
            <div class="spec-item">💰 <strong>₩${item.avgPrice.toLocaleString()}</strong></div>
          </div>
          <div class="card-review-box">
            ${item.oneLiner}
          </div>
        `;

        card.addEventListener("click", () => {
          openDetailView(item.id);
        });

        resultsList.appendChild(card);
      });
    }

    showView("view-results");
  }

  resetFilterBtn.addEventListener("click", () => {
    filterForm.reset();
    locationPills.forEach(p => p.classList.remove("active"));
    selectedLocation = "";
    selectedLocInput.value = "";
    gpsStatus.textContent = "미확인 (거점을 터치하세요)";
    gpsStatus.classList.remove("active");
    gpsBtn.classList.remove("active");
    gpsActivated = false;
    
    activeCategories = ["all"];
    categoryChips.forEach(c => {
      if (c.getAttribute("data-cat") === "all") c.classList.add("active");
      else c.classList.remove("active");
    });
    
    showView("view-filter");
  });

  retryFilterBtn.addEventListener("click", () => {
    showView("view-filter");
  });

  // --- Detail View Logic ---

  function openDetailView(restaurantId) {
    const restaurant = window.goshelinDB.getById(restaurantId);
    if (!restaurant) return;

    // Reset Review form inputs
    reviewSubmitForm.reset();
    reviewSubmitForm.setAttribute("data-restaurant-id", restaurantId);
    tasteInd.textContent = "5.0";
    valueInd.textContent = "5.0";
    hygieneInd.textContent = "5.0";

    // Set header banner bg based on category
    const banners = {
      "Korean": "linear-gradient(180deg, rgba(138, 21, 56, 0.35) 0%, rgba(8, 12, 20, 0) 100%)",
      "Japanese": "linear-gradient(180deg, rgba(49, 130, 206, 0.25) 0%, rgba(8, 12, 20, 0) 100%)",
      "Chinese": "linear-gradient(180deg, rgba(229, 62, 62, 0.25) 0%, rgba(8, 12, 20, 0) 100%)",
      "Western": "linear-gradient(180deg, rgba(72, 187, 120, 0.25) 0%, rgba(8, 12, 20, 0) 100%)"
    };
    const defaultBanner = "linear-gradient(180deg, rgba(138, 21, 56, 0.3) 0%, rgba(8, 12, 20, 0) 100%)";
    document.getElementById("detail-hero-banner").style.background = banners[restaurant.category] || defaultBanner;

    // Basic fields
    detailName.textContent = restaurant.name;
    detailCategory.textContent = restaurant.categoryKo;
    detailDescription.textContent = restaurant.description;
    detailOverallRating.textContent = restaurant.ratings.overall.toFixed(1);
    detailReviewCount.textContent = `(후기 ${restaurant.reviews ? restaurant.reviews.length : 0}개)`;
    detailMainMenu.textContent = restaurant.mainMenu;
    detailAvgPrice.textContent = `₩${restaurant.avgPrice.toLocaleString()}`;
    detailPrepTime.textContent = restaurant.prepTime;

    // Ratings breakdown bars
    barTasteVal.textContent = restaurant.ratings.taste.toFixed(1);
    barTasteFill.style.width = `${(restaurant.ratings.taste / 5) * 100}%`;
    barValueVal.textContent = restaurant.ratings.value.toFixed(1);
    barValueFill.style.width = `${(restaurant.ratings.value / 5) * 100}%`;
    barHygieneVal.textContent = restaurant.ratings.hygiene.toFixed(1);
    barHygieneFill.style.width = `${(restaurant.ratings.hygiene / 5) * 100}%`;

    // Campuses Walk times
    detailDistanceList.innerHTML = "";
    Object.keys(restaurant.walkingTimes).forEach(hub => {
      const minutes = restaurant.walkingTimes[hub];
      let speedClass = "slow";
      if (minutes <= 5) speedClass = "fast";
      else if (minutes <= 10) speedClass = "normal";

      // Percentage for progress bar (max 15 mins)
      const percentage = Math.min(100, (minutes / 15) * 100);

      const item = document.createElement("div");
      item.className = "dist-progress-item";
      item.innerHTML = `
        <span class="dist-label">${hub}</span>
        <div class="dist-bar-track">
          <div class="dist-bar-fill ${speedClass}" style="width: ${percentage}%;"></div>
        </div>
        <span class="dist-val">${minutes}분</span>
      `;
      detailDistanceList.appendChild(item);
    });

    // Set External Map Links
    naverMapBtn.href = restaurant.naverMapLink;
    kakaoMapBtn.href = restaurant.kakaoMapLink;

    // Render Review List
    renderReviews(restaurant.reviews);

    // Draw Map on Canvas
    drawCampusMap(selectedLocation || "안암역", restaurant);

    showView("view-detail");
  }

  function renderReviews(reviews) {
    detailReviewsList.innerHTML = "";
    if (!reviews || reviews.length === 0) {
      detailReviewsList.innerHTML = `<p class="gps-status" style="text-align:center; padding: 10px 0;">첫 후기를 작성해 주세요!</p>`;
    } else {
      reviews.forEach(rev => {
        const item = document.createElement("div");
        item.className = "review-item";
        item.innerHTML = `
          <div class="review-meta">
            <span class="review-author">${rev.author}</span>
            <span class="review-stars">★ ${rev.rating.toFixed(1)}</span>
          </div>
          <p class="review-comment">${rev.comment}</p>
        `;
        detailReviewsList.appendChild(item);
      });
    }
  }

  // Draw stylized campus map linking hubs and restaurants
  function drawCampusMap(currHub, restaurant) {
    const canvas = document.getElementById("campus-map");
    const ctx = canvas.getContext("2d");
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Coordinates of hubs in pixels on 360x240 canvas
    const hubCoords = {
      "안암역": { x: 90, y: 170, label: "안암역" },
      "정후": { x: 170, y: 80, label: "정경대후문" },
      "민광": { x: 190, y: 130, label: "민주광장" },
      "법후": { x: 280, y: 50, label: "법대후문" },
      "노벨광장": { x: 250, y: 170, label: "노벨광장" }
    };

    // Draw grid background
    ctx.strokeStyle = "rgba(255,255,255,0.02)";
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let j = 0; j < canvas.height; j += 20) {
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(canvas.width, j);
      ctx.stroke();
    }

    // Draw streets/paths (simplistic map lines)
    ctx.strokeStyle = "rgba(255,255,255,0.06)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    // Chamsari street (Anam Stn to Nobel)
    ctx.moveTo(hubCoords["안암역"].x, hubCoords["안암역"].y);
    ctx.lineTo(hubCoords["노벨광장"].x, hubCoords["노벨광장"].y);
    // Main campus street (Anam Stn to Jeonghu)
    ctx.moveTo(hubCoords["안암역"].x, hubCoords["안암역"].y);
    ctx.lineTo(hubCoords["정후"].x, hubCoords["정후"].y);
    // Jeonghu to Mingwang
    ctx.moveTo(hubCoords["정후"].x, hubCoords["정후"].y);
    ctx.lineTo(hubCoords["민광"].x, hubCoords["민광"].y);
    // Mingwang to Law School
    ctx.moveTo(hubCoords["민광"].x, hubCoords["민광"].y);
    ctx.lineTo(hubCoords["법후"].x, hubCoords["법후"].y);
    ctx.stroke();

    // Map coordinates for restaurant (scale percentage coords to canvas pixels)
    // database coords x,y are in percentages
    const restX = Math.round((restaurant.mapCoords.x / 100) * canvas.width);
    const restY = Math.round((restaurant.mapCoords.y / 100) * canvas.height);

    // Draw path between selected hub and restaurant
    const startLoc = hubCoords[currHub] || hubCoords["안암역"];
    ctx.strokeStyle = "#D69E2E"; // Gold path line
    ctx.lineWidth = 2.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(startLoc.x, startLoc.y);
    ctx.lineTo(restX, restY);
    ctx.stroke();
    ctx.setLineDash([]); // Reset dash

    // Draw all campus hubs
    Object.keys(hubCoords).forEach(key => {
      const hub = hubCoords[key];
      const isSelected = key === currHub;

      // Circle
      ctx.beginPath();
      ctx.arc(hub.x, hub.y, isSelected ? 8 : 5, 0, Math.PI * 2);
      ctx.fillStyle = isSelected ? "#3182ce" : "rgba(255,255,255,0.3)";
      ctx.fill();
      
      // Halo around selected hub
      if (isSelected) {
        ctx.strokeStyle = "rgba(49, 130, 206, 0.4)";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(hub.x, hub.y, 12, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Label text
      ctx.fillStyle = isSelected ? "#90CDF4" : "rgba(255,255,255,0.5)";
      ctx.font = isSelected ? "bold 10px var(--font-sans)" : "9px var(--font-sans)";
      ctx.fillText(hub.label, hub.x - 18, hub.y - 12);
    });

    // Draw Restaurant pin (Glow & Circle)
    ctx.shadowColor = "#8A1538";
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(restX, restY, 9, 0, Math.PI * 2);
    ctx.fillStyle = "#8A1538"; // Crimson pin
    ctx.fill();
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.shadowBlur = 0; // Reset shadow

    // Little Gold star inside restaurant pin
    ctx.fillStyle = "#D69E2E";
    ctx.font = "bold 9px var(--font-sans)";
    ctx.fillText("★", restX - 4.5, restY + 3);

    // Restaurant label
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 11px var(--font-sans)";
    ctx.fillText(restaurant.name, restX - (restaurant.name.length * 4.5), restY - 14);
  }

  // --- Review Form Submission ---
  
  reviewSubmitForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = reviewSubmitForm.getAttribute("data-restaurant-id");
    if (!id) return;

    const author = document.getElementById("review-author").value;
    const rating = parseFloat(document.querySelector('input[name="overall-rating"]:checked').value);
    const taste = parseFloat(sliderTaste.value);
    const value = parseFloat(sliderValue.value);
    const hygiene = parseFloat(sliderHygiene.value);
    const comment = document.getElementById("review-comment").value;

    const updated = window.goshelinDB.addReview(id, {
      author,
      rating,
      taste,
      value,
      hygiene,
      comment
    });

    if (updated) {
      initAudio();
      playSuccessSound();
      alert("후기가 소중히 등록되었습니다!");
      
      // Re-populate detail view to show the new review and updated rating average
      openDetailView(id);
    }
  });

  // --- Roulette Section ("오늘 뭐 먹지?") ---

  function setupRoulette() {
    rouletteResultCard.classList.add("hide");
    rouletteWheel.style.transition = "none";
    rouletteWheel.style.transform = "rotate(0deg)";

    const loc = selectedLocation || "안암역";
    rouletteCurrentLoc.textContent = loc;

    // Filter restaurants close by (< 10 min) and high rating (>= 4.0)
    const all = window.goshelinDB.getAll();
    rouletteActiveRestaurants = all.filter(r => r.walkingTimes[loc] <= 10 && r.ratings.overall >= 4.0);

    // Fallback if none matches
    if (rouletteActiveRestaurants.length === 0) {
      rouletteActiveRestaurants = all.slice(0, 8); // just take first 8
    }

    // Shuffle and cap at 8 wedges for ideal wheel visualization
    rouletteActiveRestaurants = shuffleArray(rouletteActiveRestaurants).slice(0, 8);
    
    // Fill up to 8 if database slice is smaller
    while (rouletteActiveRestaurants.length < 8) {
      rouletteActiveRestaurants = rouletteActiveRestaurants.concat(rouletteActiveRestaurants).slice(0, 8);
    }

    renderRouletteWedges(rouletteActiveRestaurants);
  }

  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function renderRouletteWedges(restaurants) {
    rouletteWheel.innerHTML = "";
    const colors = ["#8A1538", "#1A2333", "#D69E2E", "#2B364A", "#A21C42", "#0F1524", "#9B7524", "#232A3B"];

    // Set conic-gradient background dynamically
    let conicGrad = "conic-gradient(from 270deg, ";
    const degreePerWedge = 360 / restaurants.length;

    restaurants.forEach((r, idx) => {
      const startDeg = idx * degreePerWedge;
      const endDeg = (idx + 1) * degreePerWedge;
      const color = colors[idx % colors.length];
      conicGrad += `${color} ${startDeg}deg ${endDeg}deg${idx === restaurants.length - 1 ? "" : ", "}`;
    });
    conicGrad += ")";
    rouletteWheel.style.background = conicGrad;

    // Draw text elements
    restaurants.forEach((r, idx) => {
      const wedge = document.createElement("div");
      wedge.className = "roulette-wedge";
      // Position wedge rotation
      const rotation = idx * degreePerWedge;
      wedge.style.transform = `rotate(${rotation}deg)`;
      
      const txt = document.createElement("div");
      txt.className = "roulette-text";
      txt.textContent = r.name;
      // Offset rotate text to fit nicely inside the wedge center angle
      txt.style.transform = `rotate(${degreePerWedge / 2}deg)`;
      
      wedge.appendChild(txt);
      rouletteWheel.appendChild(wedge);
    });
  }

  // Spin Wheel trigger
  spinBtn.addEventListener("click", () => {
    initAudio();
    if (spinBtn.disabled) return;
    
    spinBtn.disabled = true;
    rouletteResultCard.classList.add("hide");

    // Random choice index
    const count = rouletteActiveRestaurants.length;
    const choiceIdx = Math.floor(Math.random() * count);
    currentSpinnedRestaurant = rouletteActiveRestaurants[choiceIdx];

    // Calc rotation angles
    const degreePerWedge = 360 / count;
    // Wedge angle range: choiceIdx * degreePerWedge to (choiceIdx + 1) * degreePerWedge
    // Target is the pointer at 12 o'clock (270 degrees in canvas coords, but wheel rotates, so we must calculate)
    // To align the winning wedge at the top center pointer (which is -90 deg or 270 deg):
    // Rotation Angle = 360 * rotations - (choiceIdx * degreePerWedge + degreePerWedge / 2)
    // Add 5-7 rotations
    const totalSpins = 5 + Math.floor(Math.random() * 3);
    const rotationAngle = (totalSpins * 360) - (choiceIdx * degreePerWedge + degreePerWedge / 2);

    rouletteWheel.style.transition = "transform 4.5s cubic-bezier(0.15, 0.95, 0.25, 1)";
    rouletteWheel.style.transform = `rotate(${rotationAngle}deg)`;

    // Play tick sounds at changing intervals to simulate wheel rotation slow-down
    let spinDuration = 4500;
    let ticks = 28;
    let elapsed = 0;

    for (let i = 0; i < ticks; i++) {
      // Exponential delay scaling to slow down tick speeds
      const delay = Math.pow(i / ticks, 2.5) * spinDuration;
      setTimeout(() => {
        playTickSound(350 + (i * 5), 0.04);
      }, delay);
    }

    // Show Results Popup Card when animation ends
    setTimeout(() => {
      spinBtn.disabled = false;
      playSuccessSound();
      
      // Update result card info
      const loc = selectedLocation || "안암역";
      const walkTime = currentSpinnedRestaurant.walkingTimes[loc] || 5;

      rouletteResultName.textContent = currentSpinnedRestaurant.name;
      rouletteResultMenu.textContent = `대표 메뉴: ${currentSpinnedRestaurant.mainMenu}`;
      rouletteResultWalk.textContent = walkTime;
      rouletteResultRating.textContent = currentSpinnedRestaurant.ratings.overall.toFixed(1);
      rouletteResultComment.textContent = `“${currentSpinnedRestaurant.oneLiner}”`;

      rouletteResultCard.classList.remove("hide");
      
      // Auto scroll to reveal popup
      document.querySelector(".app-content").scrollTop = 500;
    }, 4700);
  });

  // Action links on roulette results
  rouletteDetailBtn.addEventListener("click", () => {
    if (currentSpinnedRestaurant) {
      openDetailView(currentSpinnedRestaurant.id);
    }
  });

  rouletteRetryBtn.addEventListener("click", () => {
    rouletteResultCard.classList.add("hide");
    setupRoulette();
    spinBtn.click(); // Auto click spin
  });

  // Initial routing
  showView("view-home");
});
