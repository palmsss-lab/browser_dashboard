// dashboard.js - Browser Environment Dashboard JavaScript

(function() {
    // ************ PART A: Populate browser information ************
    function fillBrowserInfo() {
        const nav = navigator;
        const screen = window.screen;

        // Browser name & version parsing
        const ua = nav.userAgent;
        let browserName = "Unknown";
        let browserVersion = "";
        
        if (ua.indexOf("Firefox") > -1) {
            browserName = "Mozilla Firefox";
            browserVersion = ua.match(/Firefox\/([\d.]+)/)?.[1] || "";
        } else if (ua.indexOf("Edg") > -1) {
            browserName = "Microsoft Edge";
            browserVersion = ua.match(/Edg\/([\d.]+)/)?.[1] || "";
        } else if (ua.indexOf("Chrome") > -1) {
            browserName = "Google Chrome";
            browserVersion = ua.match(/Chrome\/([\d.]+)/)?.[1] || "";
        } else if (ua.indexOf("Safari") > -1) {
            browserName = "Apple Safari";
            browserVersion = ua.match(/Version\/([\d.]+)/)?.[1] || "";
        } else {
            browserName = nav.appName;
            browserVersion = nav.appVersion;
        }

        // Platform, Java, screen details
        const platform = nav.platform || "unknown";
        const javaEnabled = nav.javaEnabled ? nav.javaEnabled() : false;
        const width = screen.width;
        const height = screen.height;
        const availWidth = screen.availWidth;
        const availHeight = screen.availHeight;
        const colorDepth = screen.colorDepth;

        const panel = document.getElementById('browserInfoPanel');
        if (panel) {
            panel.innerHTML = `
                <div class="bg-slate-50 rounded-2xl p-5 border border-slate-200 hover:shadow-md transition-shadow">
                    <div class="text-xs uppercase tracking-wider text-slate-500 mb-2"><i class="fas fa-globe-americas mr-1"></i> Browser</div>
                    <div class="text-lg font-semibold text-slate-800">${browserName} ${browserVersion}</div>
                </div>
                <div class="bg-slate-50 rounded-2xl p-5 border border-slate-200 hover:shadow-md transition-shadow">
                    <div class="text-xs uppercase tracking-wider text-slate-500 mb-2"><i class="fas fa-laptop mr-1"></i> Platform</div>
                    <div class="text-lg font-semibold text-slate-800">${platform}</div>
                </div>
                <div class="bg-slate-50 rounded-2xl p-5 border border-slate-200 hover:shadow-md transition-shadow">
                    <div class="text-xs uppercase tracking-wider text-slate-500 mb-2"><i class="fab fa-java mr-1"></i> Java Enabled</div>
                    <div class="text-lg font-semibold text-slate-800">${javaEnabled ? 'Yes' : 'No'}</div>
                </div>
                <div class="bg-slate-50 rounded-2xl p-5 border border-slate-200 hover:shadow-md transition-shadow">
                    <div class="text-xs uppercase tracking-wider text-slate-500 mb-2"><i class="fas fa-tv mr-1"></i> Resolution</div>
                    <div class="text-lg font-semibold text-slate-800">${width} x ${height}</div>
                </div>
                <div class="bg-slate-50 rounded-2xl p-5 border border-slate-200 hover:shadow-md transition-shadow">
                    <div class="text-xs uppercase tracking-wider text-slate-500 mb-2"><i class="fas fa-expand mr-1"></i> Available Screen</div>
                    <div class="text-lg font-semibold text-slate-800">${availWidth} x ${availHeight}</div>
                </div>
                <div class="bg-slate-50 rounded-2xl p-5 border border-slate-200 hover:shadow-md transition-shadow">
                    <div class="text-xs uppercase tracking-wider text-slate-500 mb-2"><i class="fas fa-palette mr-1"></i> Color Depth</div>
                    <div class="text-lg font-semibold text-slate-800">${colorDepth} bits</div>
                </div>
            `;
        }
    }

    // ************ PART B: Display current page info ************
    function refreshPageInfo() {
        const urlEl = document.getElementById('currentUrl');
        const hostEl = document.getElementById('hostnameDisplay');
        const titleEl = document.getElementById('currentPageTitleDisplay');
        
        if (urlEl) urlEl.innerText = window.location.href;
        if (hostEl) hostEl.innerText = window.location.hostname;
        if (titleEl) titleEl.innerText = document.title;
    }

    // ************ PART B: Title updater ************
    function setupTitleUpdater() {
        const btn = document.getElementById('updateTitleBtn');
        const input = document.getElementById('newTitleInput');
        
        if (btn && input) {
            btn.addEventListener('click', function() {
                const newTitle = input.value.trim();
                if (newTitle !== '') {
                    document.title = newTitle;
                    refreshPageInfo();
                    input.value = '';
                    
                    // Show brief success indication
                    const originalHTML = btn.innerHTML;
                    btn.innerHTML = '<i class="fas fa-check"></i> Updated!';
                    setTimeout(() => {
                        btn.innerHTML = originalHTML;
                    }, 1000);
                } else {
                    alert('Please enter a title.');
                }
            });
            
            input.addEventListener('keypress', (e) => { 
                if(e.key === 'Enter') btn.click(); 
            });
        }
    }

    // ************ PART C: Navigation controls ************
    function setupNavControls() {
        const reloadBtn = document.getElementById('reloadPageBtn');
        const redirectBtn = document.getElementById('redirectExampleBtn');
        const backBtn = document.getElementById('goBackBtn');
        const forwardBtn = document.getElementById('goForwardBtn');
        
        if (reloadBtn) {
            reloadBtn.addEventListener('click', function() {
                window.location.reload();
            });
        }
        
        if (redirectBtn) {
            redirectBtn.addEventListener('click', function() {
                window.location.href = 'https://www.example.com';
            });
        }
        
        if (backBtn) {
            backBtn.addEventListener('click', function() {
                window.history.back();
            });
        }
        
        if (forwardBtn) {
            forwardBtn.addEventListener('click', function() {
                window.history.forward();
            });
        }
    }

    // ************ PART C: Update history length ************
    function updateHistoryLength() {
        const historyEl = document.getElementById('historyLength');
        if (historyEl) {
            historyEl.innerText = window.history.length;
        }
    }

    // ************ PART D: Dynamic background color ************
    function applyBackgroundByWidth() {
        const w = window.innerWidth;
        let bgColor = '';
        let bgClass = '';
        
        if (w < 600) {
            bgColor = '#3b82f6'; // Blue
            bgClass = 'bg-blue-500';
        } else if (w >= 600 && w <= 991) {
            bgColor = '#22c55e'; // Green
            bgClass = 'bg-green-500';
        } else {
            bgColor = '#f97316'; // Orange
            bgClass = 'bg-orange-500';
        }
        
        document.body.style.backgroundColor = bgColor;
        
        // Update indicator
        const indicator = document.getElementById('screenWidthIndicator');
        const swatch = document.getElementById('colorSwatch');
        
        if (indicator) {
            let range = (w < 600) ? 'mobile (<600px)' : (w <= 991 ? 'tablet (600-991px)' : 'desktop (≥992px)');
            indicator.innerHTML = `Current width: ${w}px — <span class="font-semibold">${range}</span> background`;
        }
        
        if (swatch) {
            swatch.style.backgroundColor = bgColor;
            swatch.className = `w-8 h-8 rounded-full border-2 border-slate-300 shadow-inner ${bgClass}`;
        }
    }

    // ************ EVENT LISTENERS ************
    window.addEventListener('load', function() {
        fillBrowserInfo();
        refreshPageInfo();
        setupTitleUpdater();
        setupNavControls();
        updateHistoryLength();
        applyBackgroundByWidth();
    });

    window.addEventListener('resize', function() {
        applyBackgroundByWidth();
        updateHistoryLength();
    });

    window.addEventListener('popstate', function() {
        updateHistoryLength();
        refreshPageInfo();
    });

    window.addEventListener('hashchange', refreshPageInfo);
    window.addEventListener('pageshow', updateHistoryLength);
})();