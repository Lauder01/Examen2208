namespace WebAPI.Dtos.Mountain
{
    public class MountainQueryDto
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string? Name { get; set; }
        public string? Location { get; set; }
        public double? MinHeight { get; set; }
        public double? MaxHeight { get; set; }
    }
}
