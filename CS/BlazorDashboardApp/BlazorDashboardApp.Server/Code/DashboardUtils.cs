using DevExpress.DashboardAspNetCore;
using DevExpress.DashboardCommon;
using DevExpress.DashboardWeb;
using DevExpress.DataAccess.Json;
using Microsoft.Extensions.FileProviders;

namespace BlazorDashboardApp {
    public static class DashboardUtils {
        public static DashboardConfigurator CreateDashboardConfigurator(IConfiguration configuration, IFileProvider fileProvider) {
            DashboardConfigurator configurator = new DashboardConfigurator();

            // Register Dashboard Storage
            configurator.SetDashboardStorage(new DashboardFileStorage(fileProvider.GetFileInfo("Data/Dashboards").PhysicalPath));
            // Create a sample JSON data source
            DataSourceInMemoryStorage dataSourceStorage = new DataSourceInMemoryStorage();
            DashboardJsonDataSource jsonDataSourceUrl = new DashboardJsonDataSource("JSON Data Source (URL)");
            jsonDataSourceUrl.ConnectionName = "jsonCustomers";
            jsonDataSourceUrl.RootElement = "Customers";
            dataSourceStorage.RegisterDataSource("jsonDataSourceUrl", jsonDataSourceUrl.SaveToXml());
            configurator.SetDataSourceStorage(dataSourceStorage);

            configurator.ConfigureDataConnection += (s, e) => {
                if (e.ConnectionName == "jsonCustomers") {
                    JsonSourceConnectionParameters jsonParams = new JsonSourceConnectionParameters();
                    jsonParams.JsonSource = new UriJsonSource(
                    new Uri("https://raw.githubusercontent.com/DevExpress-Examples/DataSources/master/JSON/customers.json"));
                    e.ConnectionParameters = jsonParams;
                }
            };

            return configurator;
        }

    }
}