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
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(self.cityNames));
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
        let tabPaneStartCity = self.cityTabPanes[0].tabPane;
        fillTabPaneWithContent(startCity, tabPaneStartCity);
    }

    self.saveStateToLocalStorage = function () {

    }

    self.addEventListenerToCloseButtons = function () {
        let closeBtns = Array.from(document.getElementsByClassName('close'));
        closeBtns.forEach(btn => {
            btn.addEventListener('click', (event) => {
                let cityId = event.target.id.replace('-span', '');
                //stop propagation of calling events, so nav-item event listener is not invoked
                event.stopPropagation();
                //find the nav-item (<li>) whose closeBtn was clicked
                let navItemOfCity = document.getElementById(cityId+'-tab').parentElement;
                //delete found nav-item from nav-tabs(<ul>)
                NAV_TABS_UL.removeChild(navItemOfCity);

                //find tab-pane(<div>) belonging to city that is being deleted
                let tabPaneOfCity = document.getElementById(cityId);
                TAB_PANE_CONTAINER.removeChild(tabPaneOfCity);

            })
        })
    }

    return self;
}

