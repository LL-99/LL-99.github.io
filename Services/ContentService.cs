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
        private static readonly string ContentVersion = DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString();

        public async Task<List<HomePageProjectDefinition>> GetHomePageProjects()
        {
            var json = await httpClient.GetStringAsync(VersionedContentUrl("data/projects-overview.json"));

            return JsonConvert.DeserializeObject<List<HomePageProjectDefinition>>(json) ?? [];
        }

        public async Task<List<DetailedProjectDefinition>> GetProjectsForGroup(ProjectGroup projectGroup)
        {
            var json = await httpClient.GetStringAsync(VersionedContentUrl("data/projects-" + (projectGroup switch
            {
                ProjectGroup.Far => "student-assistant",
                ProjectGroup.Uni => "university",
                ProjectGroup.BB => "brainboost",
                _ => "own",
            }) + ".json"));

            return JsonConvert.DeserializeObject<List<DetailedProjectDefinition>>(json) ?? [];
        }

        private static string VersionedContentUrl(string path) => $"{path}?v={ContentVersion}";
    }
}
