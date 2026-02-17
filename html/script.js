// Glassmorphism UI - QB-Garages Modernization
// State Management
let allVehicles = [];
let filteredVehicles = [];
let currentFilter = 'all';
let currentSearch = '';

// SVG Icons Library
const icons = {
    close: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>`,
    search: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>`,
    filter: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>`,
    fuel: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
    </svg>`,
    engine: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>`,
    car: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
    </svg>`,
    plate: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>`,
    mileage: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>`,
    key: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
    </svg>`,
    map: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>`,
    dollar: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>`,
    carSilhouette: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
    </svg>`,
    airplane: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
    </svg>`,
    boat: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l.02-1.91C19.01 17.04 17.64 16 16 16c-1.63 0-3.01 1.04-4.05 2.09C10.91 16.04 9.53 15 8 15c-1.63 0-3.01 1.04-4.05 2.09L3.95 19zM13 12.5v-6c0-.83-.67-1.5-1.5-1.5S10 5.67 10 6.5v6c-1.22-.64-2.72-.62-3.79.35L2 12.5V14l6.86-2.36c.52-.19 1.09-.16 1.58.09.49.25.84.71.96 1.25.02.1.03.2.03.3v3.5c-1.65 0-3 1.35-3 3h10c0-1.65-1.35-3-3-3v-3.5c0-.1.01-.2.03-.3.12-.54.47-1 .96-1.25.49-.25 1.06-.28 1.58-.09L22 12.5V14l-4.21-2.15c-1.07-.97-2.57-.99-3.79-.35z"/>
    </svg>`,
    truck: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
    </svg>`,
    body: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>`,
    empty: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>`
};

// Vehicle Category Detection
function getVehicleCategory(vehicleName) {
    const name = vehicleName.toLowerCase();

    // Aircraft detection
    if (name.includes('heli') || name.includes('helicopter') ||
        name.includes('plane') || name.includes('jet') ||
        name.includes('buzzard') || name.includes('savage') ||
        name.includes('annihil') || name.includes('volatus') ||
        name.includes('swift') || name.includes('frogger')) {
        return 'air';
    }

    // Sea vehicles detection
    if (name.includes('boat') || name.includes('speeder') ||
        name.includes('squalo') || name.includes('suntrap') ||
        name.includes('toro') || name.includes('jetmax') ||
        name.includes('marquis') || name.includes('dinghy') ||
        name.includes('seashark')) {
        return 'sea';
    }

    // Heavy vehicles/Rigs detection
    if (name.includes('truck') || name.includes('rig') ||
        name.includes('haul') || name.includes('packer') ||
        name.includes('phantom') || name.includes('barracks') ||
        name.includes('crusader') || name.includes('halftrack') ||
        name.includes('monster') || name.includes('cerberus')) {
        return 'rigs';
    }

    // Default to cars
    return 'cars';
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// NUI Message Listener
window.addEventListener("message", function (event) {
    const data = event.data;
    if (data.action === "VehicleList") {
        const garageLabel = data.garageLabel;
        const vehicles = data.vehicles;
        allVehicles = vehicles;
        populateVehicleList(garageLabel, vehicles);
        displayUI();
    }
});

// Close button
document.getElementById("close-btn").addEventListener("click", closeGarageMenu);

// Escape key
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeGarageMenu();
    }
});

// Search functionality
const searchInput = document.getElementById("search-input");
const clearSearchBtn = document.getElementById("clear-search");

searchInput.addEventListener("input", debounce(handleSearch, 300));

clearSearchBtn.addEventListener("click", function() {
    searchInput.value = "";
    currentSearch = "";
    clearSearchBtn.classList.remove("visible");
    applyFilters();
});

function handleSearch(e) {
    currentSearch = e.target.value.toLowerCase().trim();

    if (currentSearch) {
        clearSearchBtn.classList.add("visible");
    } else {
        clearSearchBtn.classList.remove("visible");
    }

    applyFilters();
}

// Category filter functionality
const categoryFilter = document.getElementById("category-filter");
categoryFilter.addEventListener("change", function(e) {
    currentFilter = e.target.value;
    applyFilters();
});

// Apply filters (search + category)
function applyFilters() {
    filteredVehicles = allVehicles.filter(vehicle => {
        // Category filter
        const category = getVehicleCategory(vehicle.vehicle);
        const matchesCategory = currentFilter === 'all' || category === currentFilter;

        // Search filter
        const matchesSearch = currentSearch === '' ||
            vehicle.vehicleLabel.toLowerCase().includes(currentSearch) ||
            vehicle.plate.toLowerCase().includes(currentSearch);

        return matchesCategory && matchesSearch;
    });

    renderVehicles(filteredVehicles);
}

// Display UI
function displayUI() {
    const container = document.querySelector(".container");
    container.style.display = "block";
}

// Close garage menu
function closeGarageMenu() {
    const container = document.querySelector(".container");
    container.style.display = "none";

    // Reset filters
    searchInput.value = "";
    currentSearch = "";
    clearSearchBtn.classList.remove("visible");
    categoryFilter.value = "all";
    currentFilter = "all";

    fetch("https://qb-garages/closeGarage", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({}),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data === "ok") {
                return;
            } else {
                console.error("Failed to close Garage UI");
            }
        });
}

// Populate vehicle list
function populateVehicleList(garageLabel, vehicles) {
    const garageHeader = document.getElementById("garage-header");
    garageHeader.textContent = garageLabel;

    // Initial render with all vehicles
    filteredVehicles = vehicles;
    renderVehicles(vehicles);
}

// Render vehicles
function renderVehicles(vehicles) {
    const vehicleContainer = document.getElementById("vehicle-container");
    const vehicleCount = document.getElementById("vehicle-count");
    const noResults = document.getElementById("no-results");

    // Clear container
    vehicleContainer.innerHTML = "";

    // Update vehicle count
    vehicleCount.textContent = `${vehicles.length} vehicle${vehicles.length !== 1 ? 's' : ''}`;

    // Show/hide no results
    if (vehicles.length === 0) {
        noResults.style.display = "flex";
        return;
    } else {
        noResults.style.display = "none";
    }

    // Render each vehicle
    vehicles.forEach((v, index) => {
        const vehicleCard = createVehicleCard(v, index);
        vehicleContainer.appendChild(vehicleCard);

        // Trigger animation with stagger
        setTimeout(() => {
            vehicleCard.classList.add("visible");
        }, index * 50);
    });
}

// Create vehicle card
function createVehicleCard(vehicle, index) {
    const card = document.createElement("div");
    card.classList.add("vehicle-card");

    const category = getVehicleCategory(vehicle.vehicle);

    // Determine status badge text and state
    let badgeText = "";
    let badgeState = "";
    if (vehicle.state === 1) {
        badgeText = "In Garage";
        badgeState = "1";
    } else if (vehicle.state === 0) {
        badgeText = "Out";
        badgeState = "0";
    } else if (vehicle.state === 2) {
        badgeText = "Impound";
        badgeState = "2";
    }

    // Vehicle image placeholder
    const vehicleImage = document.createElement("div");
    vehicleImage.classList.add("vehicle-image");

    const vehiclePlaceholder = document.createElement("div");
    vehiclePlaceholder.classList.add("vehicle-placeholder", category);

    // Add appropriate silhouette based on category
    if (category === "air") {
        vehiclePlaceholder.innerHTML = icons.airplane;
    } else if (category === "sea") {
        vehiclePlaceholder.innerHTML = icons.boat;
    } else if (category === "rigs") {
        vehiclePlaceholder.innerHTML = icons.truck;
    } else {
        vehiclePlaceholder.innerHTML = icons.carSilhouette;
    }

    vehicleImage.appendChild(vehiclePlaceholder);

    // Status badge
    const badge = document.createElement("div");
    badge.classList.add("vehicle-badge");
    badge.setAttribute("data-state", badgeState);
    badge.textContent = badgeText;

    vehicleImage.appendChild(badge);
    card.appendChild(vehicleImage);

    // Vehicle info
    const vehicleInfo = document.createElement("div");
    vehicleInfo.classList.add("vehicle-info");

    // Vehicle header
    const vehicleHeader = document.createElement("div");
    vehicleHeader.classList.add("vehicle-header");

    const vehicleName = document.createElement("h3");
    vehicleName.classList.add("vehicle-name");
    vehicleName.textContent = vehicle.vehicleLabel;

    const vehicleMeta = document.createElement("div");
    vehicleMeta.classList.add("vehicle-meta");

    // Plate
    const plate = document.createElement("span");
    plate.classList.add("plate");
    plate.innerHTML = `${icons.plate} ${vehicle.plate}`;

    // Mileage
    const mileage = document.createElement("span");
    mileage.classList.add("mileage");
    mileage.innerHTML = `${icons.mileage} ${vehicle.distance} mi`;

    vehicleMeta.appendChild(plate);
    vehicleMeta.appendChild(mileage);

    vehicleHeader.appendChild(vehicleName);
    vehicleHeader.appendChild(vehicleMeta);

    vehicleInfo.appendChild(vehicleHeader);

    // Stats grid
    const statsGrid = document.createElement("div");
    statsGrid.classList.add("stats-grid");

    // Fuel stat
    const fuelStat = createStatItem("Fuel", vehicle.fuel, 100, "fuel-icon", icons.fuel);
    statsGrid.appendChild(fuelStat);

    // Engine stat
    const engineStat = createStatItem("Engine", vehicle.engine, 1000, "engine-icon", icons.engine);
    statsGrid.appendChild(engineStat);

    // Body stat
    const bodyStat = createStatItem("Body", vehicle.body, 1000, "body-icon", icons.body);
    statsGrid.appendChild(bodyStat);

    vehicleInfo.appendChild(statsGrid);

    // Vehicle actions
    const vehicleActions = document.createElement("div");
    vehicleActions.classList.add("vehicle-actions");

    // Finance badge
    const financeBadge = document.createElement("div");
    financeBadge.classList.add("finance-badge");
    if (vehicle.balance && vehicle.balance > 0) {
        financeBadge.classList.add("has-balance");
        financeBadge.innerHTML = `${icons.dollar} <span class="finance-text">Balance: $${vehicle.balance.toFixed(0)}</span>`;
    } else {
        financeBadge.innerHTML = `${icons.dollar} <span class="finance-text">Paid Off</span>`;
    }

    vehicleActions.appendChild(financeBadge);

    // Action button
    const actionBtn = createActionButton(vehicle);
    vehicleActions.appendChild(actionBtn);

    vehicleInfo.appendChild(vehicleActions);
    card.appendChild(vehicleInfo);

    return card;
}

// Create stat item
function createStatItem(label, value, maxValue, iconClass, iconSvg) {
    const statItem = document.createElement("div");
    statItem.classList.add("stat-item");

    const statIcon = document.createElement("div");
    statIcon.classList.add("stat-icon", iconClass);
    statIcon.innerHTML = iconSvg;

    const statContent = document.createElement("div");
    statContent.classList.add("stat-content");

    const statLabel = document.createElement("span");
    statLabel.classList.add("stat-label");
    statLabel.textContent = label;

    const statProgress = document.createElement("div");
    statProgress.classList.add("stat-progress");

    const progressTrack = document.createElement("div");
    progressTrack.classList.add("progress-track");

    const percentage = Math.min(100, Math.max(0, (value / maxValue) * 100));

    const progressFill = document.createElement("div");
    progressFill.classList.add("progress-fill");

    // Determine progress bar color based on percentage
    if (percentage >= 75) {
        progressFill.classList.add("high");
    } else if (percentage >= 50) {
        progressFill.classList.add("medium");
    } else {
        progressFill.classList.add("low");
    }

    progressFill.style.width = percentage + "%";

    const statValue = document.createElement("span");
    statValue.classList.add("stat-value");
    statValue.textContent = Math.round(percentage) + "%";

    progressTrack.appendChild(progressFill);
    statProgress.appendChild(progressTrack);
    statProgress.appendChild(statValue);

    statContent.appendChild(statLabel);
    statContent.appendChild(statProgress);

    statItem.appendChild(statIcon);
    statItem.appendChild(statContent);

    return statItem;
}

// Create action button
function createActionButton(vehicle) {
    const btn = document.createElement("button");
    btn.classList.add("action-btn");

    let status;
    let isDepotPrice = false;

    if (vehicle.state === 0) {
        if (vehicle.depotPrice && vehicle.depotPrice > 0) {
            isDepotPrice = true;

            if (vehicle.type === "public") {
                status = "Depot";
            } else if (vehicle.type === "depot") {
                status = "$" + vehicle.depotPrice.toFixed(0);
            } else {
                status = "Track";
            }
        } else {
            status = "Track";
        }
    } else if (vehicle.state === 1) {
        if (vehicle.depotPrice && vehicle.depotPrice > 0) {
            isDepotPrice = true;

            if (vehicle.type === "depot") {
                status = "$" + vehicle.depotPrice.toFixed(0);
            } else if (vehicle.type === "public") {
                status = "Depot";
            } else {
                status = "Drive";
            }
        } else {
            status = "Drive";
        }
    } else if (vehicle.state === 2) {
        status = "Impound";
    }

    // Set button style and icon based on status
    if (status === "Depot" || status === "Impound") {
        btn.disabled = true;
        btn.innerHTML = `<span class="btn-icon">${icons.close}</span><span class="btn-text">${status}</span>`;
    } else if (status === "Track") {
        btn.classList.add("track");
        btn.innerHTML = `<span class="btn-icon">${icons.map}</span><span class="btn-text">${status}</span>`;
    } else if (isDepotPrice) {
        btn.classList.add("depot");
        btn.innerHTML = `<span class="btn-icon">${icons.dollar}</span><span class="btn-text">${status}</span>`;
    } else {
        btn.innerHTML = `<span class="btn-icon">${icons.key}</span><span class="btn-text">${status}</span>`;
    }

    // Button click handler
    btn.onclick = function () {
        if (btn.disabled) return;

        const vehicleStats = {
            fuel: vehicle.fuel,
            engine: vehicle.engine,
            body: vehicle.body,
        };

        const vehicleData = {
            vehicle: vehicle.vehicle,
            garage: vehicle.garage,
            index: vehicle.index,
            plate: vehicle.plate,
            type: vehicle.type,
            depotPrice: vehicle.depotPrice,
            stats: vehicleStats,
        };

        if (status === "Track") {
            fetch("https://qb-garages/trackVehicle", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify(vehicle.plate),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data === "ok") {
                        closeGarageMenu();
                    } else {
                        return;
                    }
                });
        } else if (isDepotPrice) {
            fetch("https://qb-garages/takeOutDepo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify(vehicleData),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data === "ok") {
                        closeGarageMenu();
                    } else {
                        console.error("Failed to pay depot price.");
                    }
                });
        } else {
            fetch("https://qb-garages/takeOutVehicle", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify(vehicleData),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data === "ok") {
                        closeGarageMenu();
                    } else {
                        console.error("Failed to close Garage UI.");
                    }
                });
        }
    };

    return btn;
}
