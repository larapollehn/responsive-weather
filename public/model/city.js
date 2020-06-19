const NAV_TABS_UL = document.getElementById('myTab');
const TAB_PANE_CONTAINER = document.getElementById('myTabContent');

function City(name) {
    let self = {};
    self.name = name;
    self.id = uuidv4();
    self.data = null;
    self.isValid = true;

    self.fetchData = function () {
        return axios({
            method: 'post',
            url: '/api',
            data: {
                cityName: name
            }
        });
    }

    return self;
}




/**
 *The tap-pane(<div>) belonging to a City has Content displaying the data belonging to a city
 *  fetched from the open weather api (City fetchData()) and divided upon three card elements(<div>)
 */
function CityTabPaneContent(city) {
    let self = {};
    self.tabPaneContent = tabPaneContentTemplate(city);

    self.getTabPaneContent = function () {
        console.log('getTabPaneContent', city);
        return self.tabPaneContent;
    }
    return self;
}

