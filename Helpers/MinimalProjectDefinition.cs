namespace Helpers
{
    public class MinimalProjectDefinition
    {
        public string Name { get; set; }
        public string Summary { get; set; }
        public string LocalUrl { get; set; }
        public string Thumbnail { get; set; }
        public bool IsVideo { get; set; } = false;

        public MinimalProjectDefinition(string name, string summary, string localUrl, string thumbnail, bool? isVideo)
        {
            Name = name;
            Summary = summary;
            LocalUrl = localUrl;
            Thumbnail = thumbnail;
            IsVideo = isVideo ?? false;
        }
    }
}
