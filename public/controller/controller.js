const DEBUG = true;
const LOCAL_STORAGE_KEY = 'CITY'

function Controller() {
    let self = {};
    self.cityNames = [];
    self.cities = [];
    self.cityNavItems = [];
    self.cityTabPanes = [];
    self.cityPaneContent = [];

    self.setup = function () {
        if (DEBUG) {
            if (self.cityNames.length === 0) {
                self.cityNames.push('London', 'Paris');
            }
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(self.cityNames));
        }
        let cities = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        cities.forEach(nameOfCity => {
            let city = City(nameOfCity);
            self.cities.push(city);
        })
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(self.cities));
    }

    self.renderStartView = function () {
        self.cities.forEach(city => {
                let navItem = CityNavItem(city).li;
                self.cityNavItems.push(navItem);
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
        let tabPaneStartCity = self.cityTabPanes[0];
        tabPaneStartCity.fillTabPaneWithContent(startCity);
    }




    return self;
}

