/**
 * A Nav(<ul>), build as a bootstrap tab nav, contains a nav-item(<li>) for each city
 * this nav-item is represented by this class
 */
function CityNavItem(city) {
    let self = {};
    self.li = tabLiTemplate(city);
    self.a = tabAContent(city);
    self.li.innerHTML = self.a;

    return self;
}

function showActiveCity(city) {
    /**
     * if the tab nav-item(<li>) of a city is clicked
     * the nav-item belonging to it is made active by adding the css class active
     * the former active li is made inactive trough removing the css class active
     */
    let currentActiveNavItem = NAV_TABS_UL.getElementsByClassName('active');
    if (currentActiveNavItem[0]) {
        currentActiveNavItem[0].classList.remove('active');
    }
    let thisNavItem = document.getElementById(city.id + '-tab');
    thisNavItem.classList.add('active');
    /**
     * if the tab nav-item(<li>) of a city is clicked
     * the tab-pane(<div>) belonging to it is made visible trough adding the classes active and show
     * as well as setting style option display to block
     * the former active tap-pane is made invisible by removing the classes active and show
     * as well as setting the style option display to none
     */
    let currentActiveTab = document.getElementsByClassName('show')[0];
    if (currentActiveTab) {
        currentActiveTab.classList.remove('active');
        currentActiveTab.classList.remove('show');
        currentActiveTab.style.display = 'none';
        let nextActiveTabId = city.id;
        let nextActiveContent = document.getElementById(nextActiveTabId);
        if (nextActiveContent) {
            nextActiveContent.classList.add('show');
            nextActiveContent.classList.add('active');
            nextActiveContent.style.display = 'block';
        }
    } else {
        let nextActiveTabId = city.id;
        let nextActiveContent = document.getElementById(nextActiveTabId);
        console.log(nextActiveContent);
        if (nextActiveContent) {
            nextActiveContent.classList.add('show');
            nextActiveContent.classList.add('active');
            nextActiveContent.style.display = 'block';
            let nextActiveTabPane = document.getElementById(city.id);
            fillTabPaneWithContent(city, nextActiveTabPane);
        }

    }
}

function tabLiTemplate(city) {
    let li = document.createElement('li');
    li.classList.add('nav-item');
    li.setAttribute('role', 'presentation');

    li.addEventListener('click', function (event) {
        /**
         * is the tab-pane linked to this nav-item li is empty,
         * the city data is fetched and the tab-pane filled with content
         */
        let tabPane = document.getElementById(event.target.id.replace('-tab', ''));
        if(!tabPane.hasChildNodes()){
            fillTabPaneWithContent(city, tabPane);
        }

        showActiveCity(city);

    });
    return li;
}
function tabAContent(city){
    if (document.getElementsByClassName('nav-item').length === 0) {
        return `
                        <a class="nav-link active" id="${city.id}-tab"  role="tab">
                            ${city.name}
                            <button type="button" class="close" aria-label="Close">
                                <span aria-hidden="true" id="${city.id}-span">&times;</span>
                            </button>
                        </a>`
    } else {
        return `
                        <a class="nav-link" id="${city.id}-tab" role="tab" >
                            ${city.name}
                            <button type="button" class="close" aria-label="Close">
                                <span aria-hidden="true" id="${city.id}-span">&times;</span>
                            </button>
                        </a>`
    }
}
