/**
 * To the Nav(<ul>) that has a tab for each city, belongs a tab-content container(<div>)
 * with a tab-pane(<div>) for each city linked to a nav-item(<li>) by id and aria(controlled, labelledby)
 * in this tab-pane is the tab-content
 */
function CityTabPane(city) {
    let self = {};
    self.tabPane = tabPaneTemplate(city);

    /**
     * add css classes managing visibility of tab panes to this tab pane
     * and remove from all other tab panes if they have those classes
     */
    self.showTabPane = function () {
        let activeTabPane = TAB_PANE_CONTAINER.getElementsByClassName('show')[0];
        if(activeTabPane){
            activeTabPane.classList.remove('show');
            activeTabPane.classList.remove('active');
        }
        self.tabPane.classList.add('show');
        self.tabPane.classList.add('active');
    }
    return self;
}

/**
 * if the given tab-pane (tabPane) is empty the data for the given city is fetched
 * and the inner HTML of given tabPane is filled with tab content based on the template
 */
function fillTabPaneWithContent(city, tabPane) {
    if(!city.data && tabPane.childNodes.length === 0){
        city.fetchData().then((response) => {
            city.data = response.data;
            console.log(tabPane);
            tabPane.innerHTML = tabPaneContentTemplate(city);
        }).catch((error) => {
            console.log(error,city.id);
            toastr.error(`Sorry, We could not find data for ${city.name}.`);
           removeInvalidCity(city);
        })
    }
}

function removeInvalidCity(city) {
    console.log('remove city', city);
    let nav = document.getElementById(city.id+'-tab');
    NAV_TABS_UL.removeChild(nav.parentElement);
    let tabPane = document.getElementById(city.id);
    TAB_PANE_CONTAINER.removeChild(tabPane);
    let cities = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    console.log(cities);
    for (let i = 0; i < cities.length; i++) {
        console.log(cities[i], city.name);
        if (cities[i] === city.name) {
            cities.splice(i, 1);
        }
    }
    console.log(cities);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cities));
}


function getUserLocationContent(city, lat, lon, tabPane) {
    city.fetchUserLocationData(lat, lon).then((response) => {
        city.data = response.data;
        console.log(response.data);
        tabPane.innerHTML = tabPaneContentTemplate(city);
    }).catch((error) => {
        console.log(error);
    })
}

function tabPaneTemplate(city) {
    let div = document.createElement('div');
    div.classList.add('city-pane');
    div.classList.add('fade');
    if(document.getElementsByClassName('city-pane').length === 0){
        div.classList.add('active');
        div.classList.add('show');
    }
    div.id = city.id;
    div.setAttribute('role', 'tabpanel');
    //div.setAttribute('aria-labelledby', city.id + '-tab');
    return div;
}