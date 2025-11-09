using Components;
using Newtonsoft.Json;

namespace Services
{
    public class ContentService(HttpClient httpClient)
    {
        public async Task<List<HomePageProjectDefinition>> GetHomePageProjects()
        {
            var json = await httpClient.GetStringAsync("data/projects.json");

            return JsonConvert.DeserializeObject<List<HomePageProjectDefinition>>(json) ?? [];
        }
    }
}