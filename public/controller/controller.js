const LOCAL_STORAGE_KEY = 'CITY'

function Controller() {
    let self = {};
    self.cityNames = [];
    self.cities = [];
    self.cityTabPanes = [];

    self.setup = function () {
        if (localStorage.getItem(LOCAL_STORAGE_KEY) === null) {
            console.log('ls is null');
            self.getUserGeoLocation();
            //self.getUserGeoLocation();
            // Display cute thing to get user to add a city
        } else if (JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)).length === 0) {
            toastr.info('Add your first city.');
            self.getUserGeoLocation();
        } else {
            let cities = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
            self.cityNames = cities;
            cities.forEach(nameOfCity => {
                let city = City(nameOfCity);
                self.cities.push(city);
            });
            self.renderStartView();
        }
    }

    self.getUserGeoLocation = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, errorHandler);
        } else {
            console.log('GeoLocation not supported by browser');
        }

        function showPosition(position) {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            console.log(lat, lon);
            let city = City('Your Location');
            self.cities.push(city);

            let navItem = CityNavItem(city).li;
            NAV_TABS_UL.appendChild(navItem);

            let tabPane = CityTabPane(city);
            self.cityTabPanes.push(tabPane);
            TAB_PANE_CONTAINER.appendChild(tabPane.tabPane);

            getUserLocationContent(city, lat, lon, tabPane.tabPane);

        }

        function errorHandler(error) {
            console.log('errorHandler');
            console.log(error);
        }
    }

    self.renderStartView = function () {
        self.cities.forEach(city => {
                let navItem = CityNavItem(city).li;
                NAV_TABS_UL.appendChild(navItem);

                let tabPane = CityTabPane(city);
                self.cityTabPanes.push(tabPane);
                TAB_PANE_CONTAINER.appendChild(tabPane.tabPane);
            }
        )
        self.renderStartCity();
    }

    self.renderStartCity = function () {
        let startCity = self.cities[0];
        let tabPaneStartCity = self.cityTabPanes[0].tabPane;
        fillTabPaneWithContent(startCity, tabPaneStartCity);
    }

    self.saveNewState = function () {
        let names = [];
        let tabPanes = [];
        for (let i = 0; i < self.cities.length; i++) {
            names.push(self.cities[i].name);
            for (let j = 0; j < self.cityTabPanes; j++) {
                if (self.cities[i].id === self.cityTabPanes[j].id) {
                    tabPanes.push(self.cityTabPanes[j])
                }
            }
        }
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(names));
        self.cityNames = names;
        self.cityTabPanes = tabPanes;
    }

    self.addEventListenerToCloseButtons = function () {
        let closeBtns = Array.from(document.getElementsByClassName('close'));
        closeBtns.forEach(btn => {
            btn.addEventListener('click', (event) => {
                let cityId = event.target.id.replace('-span', '');
                for (let i = 0; i < self.cities.length; i++) {
                    if (self.cities.id === cityId) {
                        self.cities = self.cities.splice(i, 1);
                        console.log(self.cities);
                    }
                }
                //stop propagation of calling events, so nav-item event listener is not invoked
                event.stopPropagation();

                let liOfCity = document.getElementById(cityId + '-tab');
                if (liOfCity) {
                    //find the nav-item (<li>) whose closeBtn was clicked
                    let navItemOfCity = liOfCity.parentElement;
                    //delete found nav-item from nav-tabs(<ul>)
                    NAV_TABS_UL.removeChild(navItemOfCity);
                }


                //find tab-pane(<div>) belonging to city that is being deleted
                let tabPaneOfCity = document.getElementById(cityId);
                if (tabPaneOfCity) {
                    TAB_PANE_CONTAINER.removeChild(tabPaneOfCity);
                }

                for (let i = 0; i < self.cities.length; i++) {
                    if (self.cities[i].id === cityId) {
                        self.cities.splice(i, 1);
                    }
                }
                if (self.cities.length > 0) {
                    showActiveCity(self.cities[0]);
                }
                self.saveNewState();
            })
        })
    }

    self.addEventListenerToAddCityBtn = function () {
        let addCityBtn = document.getElementById('addCityBtn');
        addCityBtn.addEventListener('click', () => {
            let newCityName = document.getElementById('newCityName').value;
            let newCityCountry = document.getElementById('countrySelect').value;
            self.cityNames.push(`${newCityName},${newCityCountry}`);
            let newCity = City(`${newCityName},${newCityCountry}`);
            self.cities.push(newCity);
            let navItem = CityNavItem(newCity).li;
            NAV_TABS_UL.appendChild(navItem);

            let tabPane = CityTabPane(newCity);
            self.cityTabPanes.push(tabPane);
            TAB_PANE_CONTAINER.appendChild(tabPane.tabPane);
            self.addEventListenerToCloseButtons();
            self.saveNewState();

            if (self.cities.length === 1) {
                fillTabPaneWithContent(newCity, tabPane.tabPane);
            }

        })
    }

    return self;
}

