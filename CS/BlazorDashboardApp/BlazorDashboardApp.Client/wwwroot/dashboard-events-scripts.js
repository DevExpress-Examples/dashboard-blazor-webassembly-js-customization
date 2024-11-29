window.dashboardEvents = {
    onBeforeRender: (args) => {
        // Registers the Parameter item and the Dashboard Panel.
        var dashboardControl = args.component;
        dashboardControl.registerExtension(new ParameterCustomItem(dashboardControl));
        dashboardControl.registerExtension(new DevExpress.Dashboard.DashboardPanelExtension(dashboardControl));
        // Register icons for a custom toolbar item.
        DevExpress.Dashboard.ResourceManager.registerIcon('<svg id="baseCircle" class="dx-dashboard-icon" style="fill: currentColor" viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="11" /></svg>');
        DevExpress.Dashboard.ResourceManager.registerIcon('<svg id="greenCircle" class="dx-dashboard-green-icon" viewBox="0 0 24 24" width="48" height="48"><circle cx="12" cy="12" r="11" /></svg>');
        DevExpress.Dashboard.ResourceManager.registerIcon('<svg id="yellowCircle" class="dx-dashboard-yellow-icon" viewBox="0 0 24 24" width="48" height="48"><circle cx="12" cy="12" r="11" /></svg>');
        DevExpress.Dashboard.ResourceManager.registerIcon('<svg id="redCircle" class="dx-dashboard-red-icon" viewBox="0 0 24 24" width="48" height="48"><circle cx="12" cy="12" r="11" /></svg>');

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