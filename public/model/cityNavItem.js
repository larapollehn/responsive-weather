/**
 * A Nav(<ul>), build as a bootstrap tab nav, contains a nav-item(<li>) for each city
 * this nav-item is represented by this class
 */
function CityNavItem(city) {
    console.log(city);
    let self = {};
    self.li = tabLiTemplate(city);
    self.a = tabAContent(city);
    console.log(self.a);
    self.li.innerHTML = self.a;
    console.log(self.li);

    /**
     * add css class managing visibility of tab-pane belonging to this nav-item
     * and remove from the former active nav-item
     */
    self.makeNavItemCurrent = function () {
        let currentActiveNavItem = NAV_TABS_UL.getElementsByClassName('active');
        if (currentActiveNavItem){
            currentActiveNavItem.classList.remove('active');
        }
        let thisNavItem = document.getElementById(city.id+'-tab');
        thisNavItem.classList.add('active');
    }
    return self.li;
}



function tabLiTemplate(city) {
    let li = document.createElement('li');
    li.classList.add('nav-item');
    li.setAttribute('role', 'presentation');

    li.addEventListener('click', function () {
        let currentActiveTab = document.getElementsByClassName('show')[0];

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
    console.log(city);
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
