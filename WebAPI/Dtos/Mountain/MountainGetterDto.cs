using System.ComponentModel.DataAnnotations;

namespace WebAPI.Dtos.Mountain
{
    public class MountainGetterDto : MountainBaseDto
    {
        [Required]
        public int Id { get; set; }
    }
}
