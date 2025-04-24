document.addEventListener("DOMContentLoaded", () => {
    // Dados das extensões fornecidos
    const extensions = [
      {
        "logo": "./assets/images/logo-devlens.svg",
        "name": "DevLens",
        "description": "Quickly inspect page layouts and visualize element boundaries.",
        "isActive": true
      },
      {
        "logo": "./assets/images/logo-style-spy.svg",
        "name": "StyleSpy",
        "description": "Instantly analyze and copy CSS from any webpage element.",
        "isActive": true
      },
      {
        "logo": "./assets/images/logo-speed-boost.svg",
        "name": "SpeedBoost",
        "description": "Optimizes browser resource usage to accelerate page loading.",
        "isActive": false
      },
      {
        "logo": "./assets/images/logo-json-wizard.svg",
        "name": "JSONWizard",
        "description": "Formats, validates, and prettifies JSON responses in-browser.",
        "isActive": true
      },
      {
        "logo": "./assets/images/logo-tab-master-pro.svg",
        "name": "TabMaster Pro",
        "description": "Organizes browser tabs into groups and sessions.",
        "isActive": true
      },
      {
        "logo": "./assets/images/logo-viewport-buddy.svg",
        "name": "ViewportBuddy",
        "description": "Simulates various screen resolutions directly within the browser.",
        "isActive": false
      },
      {
        "logo": "./assets/images/logo-markup-notes.svg",
        "name": "Markup Notes",
        "description": "Enables annotation and notes directly onto webpages for collaborative debugging.",
        "isActive": true
      },
      {
        "logo": "./assets/images/logo-grid-guides.svg",
        "name": "GridGuides",
        "description": "Overlay customizable grids and alignment guides on any webpage.",
        "isActive": false
      },
      {
        "logo": "./assets/images/logo-palette-picker.svg",
        "name": "Palette Picker",
        "description": "Instantly extracts color palettes from any webpage.",
        "isActive": true
      },
      {
        "logo": "./assets/images/logo-link-checker.svg",
        "name": "LinkChecker",
        "description": "Scans and highlights broken links on any page.",
        "isActive": true
      },
      {
        "logo": "./assets/images/logo-dom-snapshot.svg",
        "name": "DOM Snapshot",
        "description": "Capture and export DOM structures quickly.",
        "isActive": false
      },
      {
        "logo": "./assets/images/logo-console-plus.svg",
        "name": "ConsolePlus",
        "description": "Enhanced developer console with advanced filtering and logging.",
        "isActive": true
      }
    ];
  
    let filteredExtensions = [...extensions];
    let currentId = null;
  
    // Renderizar extensões
    renderExtensions(filteredExtensions);
  
    // Configurar alternância de tema claro e escuro
    const themeToggle = document.getElementById("theme-toggle");
    themeToggle.addEventListener("change", () => {
      if (themeToggle.checked) {
        document.body.classList.add("dark-theme");
        document.body.classList.remove("light-theme");
      } else {
        document.body.classList.add("light-theme");
        document.body.classList.remove("dark-theme");
      }
    });
  
    // Configurar eventos de filtros
    document.querySelectorAll(".filter-button").forEach(button => {
      button.addEventListener("click", () => {
        document.querySelectorAll(".filter-button").forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        const filter = button.getAttribute("data-filter");
        filterExtensions(filter, extensions);
      });
    });
  
    // Configurar evento de busca
    document.getElementById("search-bar").addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase();
      filteredExtensions = extensions.filter(extension =>
        extension.name.toLowerCase().includes(query) ||
        extension.description.toLowerCase().includes(query)
      );
      renderExtensions(filteredExtensions);
    });
  
    // Configurar evento para o modal
    const modal = document.getElementById("modal");
    const confirmBtn = document.getElementById("confirm-btn");
    const cancelBtn = document.getElementById("cancel-btn");
  
    cancelBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  
    confirmBtn.addEventListener("click", () => {
      if (currentId !== null) {
        removeExtension(currentId, extensions);
      }
      modal.classList.add("hidden");
    });
  });
  
  function filterExtensions(filter, extensions) {
    if (filter === "all") {
      renderExtensions(extensions);
    } else {
      const isActive = filter === "active";
      renderExtensions(extensions.filter(ext => ext.isActive === isActive));
    }
  }
  
  function renderExtensions(extensions) {
    const extensionsList = document.querySelector(".extensions-list");
    extensionsList.innerHTML = "";
  
    extensions.forEach((extension, index) => {
      const extensionElement = document.createElement("div");
      extensionElement.className = "extension";
      extensionElement.innerHTML = `
        <img src="${extension.logo}" alt="${extension.name}" class="extension-logo">
        <h3>${extension.name}</h3>
        <p>${extension.description}</p>
        <div class="extension-controls">
          <label class="switch">
            <input type="checkbox" class="toggle-switch" data-id="${index}" ${extension.isActive ? "checked" : ""}>
            <span class="slider"></span>
          </label>
          <button class="remove-extension" data-id="${index}">Remove</button>
        </div>
      `;
      extensionsList.appendChild(extensionElement);
    });
  
    addEventListeners(extensions);
  }
  
  function addEventListeners(extensions) {
    document.querySelectorAll(".toggle-switch").forEach((toggle, index) => {
      toggle.addEventListener("change", () => {
        extensions[index].isActive = !extensions[index].isActive;
        saveExtensionsToLocalStorage(extensions);
      });
    });
  
    document.querySelectorAll(".remove-extension").forEach((button, index) => {
      button.addEventListener("click", () => {
        showModal(index);
      });
    });
  }
  
  function showModal(id) {
    currentId = id;
    const modal = document.getElementById("modal");
    modal.classList.remove("hidden");
  }
  
  function removeExtension(id, extensions) {
    extensions.splice(id, 1);
    saveExtensionsToLocalStorage(extensions);
    renderExtensions(extensions);
    showFeedback("Extensão removida com sucesso!");
  }
  
  function saveExtensionsToLocalStorage(extensions) {
    localStorage.setItem("extensions", JSON.stringify(extensions));
  }
  
  function showFeedback(message, isError = false) {
    const feedback = document.getElementById("feedback");
    feedback.textContent = message;
    feedback.className = `feedback ${isError ? "error" : ""}`;
    feedback.classList.remove("hidden");
  
    setTimeout(() => {
      feedback.classList.add("hidden");
    }, 3000);
  }