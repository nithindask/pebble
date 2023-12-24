document.addEventListener('DOMContentLoaded', displayDeviceSpecs);

        async function displayDeviceSpecs() {
            const specsDiv = document.getElementById('specs');

            const specs = {
                'Device Type': getDeviceType(),
                'Browser': getBrowser(),
                'OS': getOS(),
                'Screen Resolution': getScreenResolution(),
                'Viewport Width': window.innerWidth,
                'Viewport Height': window.innerHeight,
                'Device Pixel Ratio': window.devicePixelRatio,
                'CPU Cores': await getCPUCores(),
                'RAM': getRAM(),
                'Battery Level': await getBatteryLevel(),
                'Battery Temperature': await getBatteryTemperature(),
                'Language': getLanguage(),
                'Online Status': getOnlineStatus(),
                'Java Enabled': isJavaEnabled(),
                'Cookies Enabled': areCookiesEnabled(),
                'Do Not Track': getDoNotTrack(),
                'Geolocation Available': isGeolocationAvailable(),
                'Touchscreen': isTouchscreen(),
                'Local Storage Available': isLocalStorageAvailable(),
                'Session Storage Available': isSessionStorageAvailable(),
                'WebGL Supported': isWebGLSupported(),
                'Web Workers Supported': areWebWorkersSupported(),
                'WebSockets Supported': areWebSocketsSupported(),
                'IndexedDB Supported': isIndexedDBSupported(),
                'Notification API Supported': isNotificationAPISupported(),
                'Battery Charging': await isBatteryCharging(),
                'Battery Charging Time': await getBatteryChargingTime(),
                'Network Type': await getNetworkType(),
                'Connection Type': await getConnectionType(),
            };

            for (const [key, value] of Object.entries(specs)) {
                const specItem = createSpecItem(key, value);
                specsDiv.appendChild(specItem);
            }
        }

        function createSpecItem(key, value) {
            const specItem = document.createElement('div');
            specItem.classList.add('spec-item');
            specItem.textContent = `${key}: ${value}`;
            return specItem;
        }

        function getDeviceType() {
            return /Android/i.test(navigator.userAgent) ? 'Mobile (Android)' :
                   /iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'Mobile (iOS)' : 'Desktop';
        }

        function getBrowser() {
            const ua = navigator.userAgent;
            const isChrome = /Chrome/.test(ua) && /Google Inc/.test(navigator.vendor);
            const isFirefox = /Firefox/.test(ua);
            const isEdge = /Edg/.test(ua);

            if (isChrome) {
                return 'Google Chrome';
            } else if (isFirefox) {
                return 'Mozilla Firefox';
            } else if (isEdge) {
                return 'Microsoft Edge';
            } else {
                return 'Unknown Browser';
            }
        }

        function getOS() {
            const userAgent = navigator.userAgent;
            const platform = navigator.platform;

            const isWindows = /Win/.test(platform);
            const isMac = /Mac/.test(platform);
            const isLinux = /Linux/.test(platform);

            if (isWindows) {
                return 'Windows';
            } else if (isMac) {
                return 'MacOS';
            } else if (isLinux) {
                return 'Linux';
            } else if (/Android/i.test(userAgent)) {
                return 'Android';
            } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
                return 'iOS';
            } else {
                return 'Unknown OS';
            }
        }

        function getScreenResolution() {
            return `${window.screen.width} x ${window.screen.height} pixels`;
        }

        function getCPUCores() {
            return navigator.hardwareConcurrency || 'Not Available';
        }

        function getRAM() {
            const memory = navigator.deviceMemory;
            return memory ? `${memory} GB` : 'Not Available';
        }

        async function getBatteryLevel() {
            try {
                const battery = await navigator.getBattery();
                return battery ? `${(battery.level * 100).toFixed(2)}%` : 'Not Available';
            } catch (error) {
                console.error('Battery information not available:', error);
                return 'Not Available';
            }
        }

        function getLanguage() {
            return navigator.language || 'Not Available';
        }

        function getDoNotTrack() {
            return navigator.doNotTrack || 'Not Available';
        }

        function isTouchscreen() {
            return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
        }

        function isWebGLSupported() {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            return context !== null;
        }

        function getOnlineStatus() {
            return navigator.onLine ? 'Online' : 'Offline';
        }

        function isJavaEnabled() {
            return navigator.javaEnabled() ? 'Yes' : 'No';
        }

        function areCookiesEnabled() {
            return navigator.cookieEnabled ? 'Yes' : 'No';
        }

        function isGeolocationAvailable() {
            return 'geolocation' in navigator ? 'Yes' : 'No';
        }

        function isLocalStorageAvailable() {
            return typeof Storage !== 'undefined' ? 'Yes' : 'No';
        }

        function isSessionStorageAvailable() {
            return typeof sessionStorage !== 'undefined' ? 'Yes' : 'No';
        }

        function areWebWorkersSupported() {
            return 'Worker' in window ? 'Yes' : 'No';
        }

        function areWebSocketsSupported() {
            return 'WebSocket' in window ? 'Yes' : 'No';
        }

        function isIndexedDBSupported() {
            return 'indexedDB' in window ? 'Yes' : 'No';
        }

        function isNotificationAPISupported() {
            return 'Notification' in window ? 'Yes' : 'No';
        }

        async function isBatteryCharging() {
            try {
                const battery = await navigator.getBattery();
                return battery ? (battery.charging ? 'Yes' : 'No') : 'Not Available';
            } catch (error) {
                console.error('Battery information not available:', error);
                return 'Not Available';
            }
        }

        async function getBatteryChargingTime() {
            try {
                const battery = await navigator.getBattery();
                return battery ? (battery.chargingTime || 'Not Available') : 'Not Available';
            } catch (error) {
                console.error('Battery information not available:', error);
                return 'Not Available';
            }
        }

        async function getNetworkType() {
            try {
                const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
                return connection ? (connection.effectiveType || 'Not Available') : 'Not Available';
            } catch (error) {
                console.error('Network information not available:', error);
                return 'Not Available';
            }
        }

        async function getConnectionType() {
            try {
                const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
                return connection ? (connection.type || 'Not Available') : 'Not Available';
            } catch (error) {
                console.error('Network information not available:', error);
                return 'Not Available';
            }
        }

        async function getBatteryTemperature() {
            try {
                const battery = await navigator.getBattery();
                return battery ? (battery.temperature ? `${battery.temperature.toFixed(2)} °C` : 'Not Available') : 'Not Available';
            } catch (error) {
                console.error('Battery information not available:', error);
                return 'Not Available';
            }
        }
