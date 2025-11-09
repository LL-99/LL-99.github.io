using MudBlazor;

namespace Components
{
    public class DynamicGridCell
    {
        public int SizeX { get; set; } = 1;
        public int SizeY { get; set; } = 1;

        public List<string>? Images { get; set; }

        public string? Title { get; set; }
        public string? Descr { get; set; }
        public string? Link { get; set; }


        public string CssClass => $"tile cs-{SizeX} rs-{SizeY}";
        public string CssStyle => $"grid-column: span {SizeX}; grid-row: span {SizeY};";
    }
}