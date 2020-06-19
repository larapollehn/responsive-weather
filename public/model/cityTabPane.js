/**
 * To the Nav(<ul>) that has a tab for each city, belongs a tab-content container(<div>)
 * with a tab-pane(<div>) for each city linked to a nav-item(<li>) by id and aria(controlled, labelledby)
 * in this tab-pane is the tab-content
 */
function CityTabPane(city) {
    let self = {};
    self.tabPane = tabPaneTemplate(city);
    self.cityTabPaneContent = CityTabPaneContent(city);
    self.tabPaneContent = self.cityTabPaneContent.getTabPaneContent();

    /**
     * remove all child nodes in the tabPane and append new content
     */
    self.fillTabPaneWithContent = function () {
        while(self.tabPane.hasChildNodes()){
            self.tabPane.removeChild(self.tabPane.firstChild);
        }
        self.tabPane.appendChild(self.tabPaneContent);
    }

    /**
     * add css classes managing visibility of tab panes to this tab pane
     * and remove from all other tab panes if they have those classes
     */
    self.showTabPane = function () {
        console.log('showTabPane', city);
        let activeTabPane = TAB_PANE_CONTAINER.getElementsByClassName('show')[0];
        if(activeTabPane){
            activeTabPane.classList.remove('show');
            activeTabPane.classList.remove('active');
        }
        self.tabPane.classList.add('show');
        self.tabPane.classList.add('active');
    }

    self.hideTabPane = function () {

    }
    return self;
}

function tabPaneTemplate(city) {
    let div = document.createElement('div');
    div.classList.add('city-pane');
    div.classList.add('fade');
    div.id = city.id;
    div.setAttribute('role', 'tabpanel');
    div.setAttribute('aria-labelledby', city.id + '-tab');
    return div;
}