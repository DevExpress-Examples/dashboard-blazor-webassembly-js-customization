window.dashboardEvents = {
    onBeforeRender: (args) => {
        // Registers the Parameter item.
        var dashboardControl = args.component;
        dashboardControl.registerExtension(new ParameterItemExtension(dashboardControl));

        // Removes the "New..." menu item from the dashboard menu.
        var toolbox = dashboardControl.findExtension('toolbox');
        var createItem = toolbox.menuItems().filter(item => item.id === "create-dashboard")[0];
        toolbox.menuItems.remove(createItem);
    },
    // Adds a new custom toolbar item to the dashboard item caption.
    extensions: {
        viewerApi: {
            onItemCaptionToolbarUpdated: function (e) {
                if (e.itemName === "gridDashboardItem1") {
                    e.options.stateItems.push({
                        type: "menu",
                        icon: "baseCircle",
                        menu: {
                            type: "icons",
                            items: ["greenCircle", "yellowCircle", "redCircle"],
                            selectionMode: "none",
                            title: "Circles",
                            itemClick: function (itemData) {
                                alert(itemData.toString());
                            }
                        }
                    });
                }
            }
        }
    }    
}