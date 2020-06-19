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



function tabLiTemplate(city) {
    let li = document.createElement('li');
    li.classList.add('nav-item');
    li.setAttribute('role', 'presentation');

    li.addEventListener('click', function () {
        /**
         * if the tab nav-item(<li>) of a city is clicked
         * the nav-item belonging to it is made active by adding the css class active
         * the former active li is made inactive trough removing the css class active
         */
        let currentActiveNavItem = NAV_TABS_UL.getElementsByClassName('active');
        if (currentActiveNavItem){
            currentActiveNavItem[0].classList.remove('active');
        }
        let thisNavItem = document.getElementById(city.id+'-tab');
        thisNavItem.classList.add('active');

        /**
         * if the tab nav-item(<li>) of a city is clicked
         * the tab-pane(<div>) belonging to it is made visible trough adding the classes active nd show
         * the former active tap-pane is made invisible by removing the classes active and show
         */
        let currentActiveTab = document.getElementsByClassName('show')[0];
        console.log(currentActiveTab);
        if (currentActiveTab) {
            currentActiveTab.classList.remove('active');
            currentActiveTab.classList.remove('show');
            let nextActiveTabId = city.id;
            let nextActiveContent = document.getElementById(nextActiveTabId);
            if(nextActiveContent) {
                nextActiveContent.classList.add('show');
                nextActiveContent.classList.add('active');
            }
        }
    });
    return li;
}
function tabAContent(city){
    if (document.getElementsByClassName('nav-item').length === 0) {
        return `
                        <a class="nav-link active" id="${city.id}-tab" data-toggle="tab" role="tab" aria-controls="${city.id}" aria-selected="true">
                            ${city.name}
                            <button type="button" class="close" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </a>`
    } else {
        return `
                        <a class="nav-link" id="${city.id}-tab" data-toggle="tab" role="tab" aria-controls="${city.id}" aria-selected="true">
                            ${city.name}
                            <button type="button" class="close" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </a>`
    }
}
