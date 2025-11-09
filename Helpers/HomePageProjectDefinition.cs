namespace Helpers
{
    public class HomePageProjectDefinition
    {
        public bool InvertOrder { get; set; } = false;
        public DynamicGridCell ImageCell { get; set; }
        public DynamicGridCell DescrCell { get; set; }

        public HomePageProjectDefinition(int height,
                                         List<string> images,
                                         int imageColWidth,
                                         string title,
                                         string description,
                                         string projectUrl,
                                         bool invertOrder = false)
        {
            InvertOrder = invertOrder;
            imageColWidth = Math.Clamp(imageColWidth, 0, 12);

            ImageCell = new()
            {
                SizeX = imageColWidth,
                SizeY = height,
                Images = images,
            };

            DescrCell = new()
            {
                SizeX = 12 - imageColWidth,
                SizeY = height,
                Images = null,

                Title = title,
                Descr = description,
                Link = projectUrl,
            };
        }
    }
}