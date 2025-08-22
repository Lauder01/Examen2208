namespace WebAPI.Dtos.Mountain
{
    public class MountainPagedResultDto
    {
        public IEnumerable<MountainGetterDto> Data { get; set; } = new List<MountainGetterDto>();
        public int Total { get; set; }
    }
}
