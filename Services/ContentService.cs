using Helpers;
using Newtonsoft.Json;

namespace Services
{
    public enum ProjectGroup
    {
        Own,
        Far,
        Uni,
        BB
    }

    public class ContentService(HttpClient httpClient)
    {
        public async Task<List<HomePageProjectDefinition>> GetHomePageProjects()
        {
            var json = await httpClient.GetStringAsync("data/projects-overview.json");

            return JsonConvert.DeserializeObject<List<HomePageProjectDefinition>>(json) ?? [];
        }

        public async Task<List<MinimalProjectDefinition>> GetProjectsForGroup(ProjectGroup projectGroup)
        {
            var json = await httpClient.GetStringAsync("data/projects-" + (projectGroup switch
            {
                ProjectGroup.Far => "student-assistant",
                ProjectGroup.Uni => "university",
                ProjectGroup.BB => "brainboost",
                _ => "own",
            }) + ".json");

            return JsonConvert.DeserializeObject<List<MinimalProjectDefinition>>(json) ?? [];
        }
    }
}