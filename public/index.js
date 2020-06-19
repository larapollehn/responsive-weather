function main() {
    let controller = Controller();
    controller.setup();
    controller.renderStartView();
    controller.addEventListenerToCloseButtons();
    controller.addEventListenerToAddCityBtn();
}

main();
