namespace Helpers
{
    public class ProjectDescriptor
    {
        public string? Text { get; set; }
        public List<ProjectShowcaseElement>? ShowcaseElements { get; set; }
    }

    public class ProjectShowcaseElement
    {
        public bool IsVideo { get; set; } = false;
        public string? Source { get; set; }
        public string? Caption { get; set; }
    }

    public class DetailedProjectDefinition
    {
        public string? Name { get; set; }
        public string? NameLong { get; set; }

        // Project Grid Data
        public string? Summary { get; set; }
        public string? LocalUrl { get; set; }
        public string? Thumbnail { get; set; }
        public bool IsVideo { get; set; } = false;

        // Detailed description elements
        public List<ProjectDescriptor>? Description { get; set; }
    }
}
